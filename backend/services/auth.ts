import { User, UserModel } from "../models/user";
import { generateHashcode } from "../utils/util";
import { send } from "./mail";
import { hash, compare } from "bcryptjs";
import { generateJwt } from "./jwt";
import { verifyTokenByPlatform } from "./oauth";

// Store a user data to database
const createUser = async (email: string): Promise<User> => {
  const newUser = new UserModel({
    oauth: null,
    email: email,
    isVerified: false,
    hash: generateHashcode(),
    password: null,
  });

  // Check if the email already exists.
  const found = await UserModel.findOne({ oauth: null, email: email });
  if (!found) {
    return newUser.save().catch((error: Error) => {
      throw Error("Failed to create a user: " + error.message);
    });
  } else {
    throw Error("The email already exists. Please log in.");
  }
};

// Send email that includes the url for redirection
export const sendConfirmationEmail = async (email: string) => {
  const created = await createUser(email).catch((error) => {
    throw Error(error);
  });
  const hash = created.hash;
  send(email, {
    title: "Password reset",
    text: "We are resetting your password",
    html: `<h1>Almost done</h1><p>Please click the <a clicktracking="off" href="${process.env.SERVER_ORIGIN}/confirm-email?h=${hash}">link</a> to finish the process.</p>`,
  }).catch((error) => {
    throw Error("Failed to send an email: " + error);
  });
};

// If a user clicks the url, update the isVerified to 'true' and delete the hash
export const verifyUser = async (hash: string, type: string) => {
  const query = { [type]: hash };
  let set;
  
  if (type === "hash") {
    set = { isVerified: true };
  } 
  if (type === "resetHash") {
    set = { isReset: true };
  }

  try {
    await UserModel.findOneAndUpdate(query, {
      $set: set,
      $unset: { [type]: 1 },
    })    
  } catch (error: any) {
    throw Error("Failed to verify the user: " + error.message);    
  }
};

// Update the password to finish the signup
export const addPassword = async (email: string, password: string) => {
  const encrypted = await hash(password, 12);
  const query = { oauth: null, email: email, isVerified: true };
  UserModel.updateOne(query, {
    $set: { password: encrypted },
  }).catch((error: Error) => {
    throw new Error(
      "Failed to add password to the existed user: " + error.message
    );
  });
};

// Retrieve the email and password, then generate jwt to grant access
export const authenticate = async (email: string, password: string) => {
  const query = { email: email };
  let jwt = null;
  try {
    const result = await UserModel.findOne(query).exec();
    if (result === null) {
      throw new Error("Email or password is incorrect. Please try again. ");
    } else {
      const isMatched = await compare(password, result.password);

      if (!isMatched) {
        throw new Error("Password is incorrect. Please try again.");
      } else {
        jwt = generateJwt(email);
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
  return {
    firstLetter: email.charAt(0).toUpperCase(),
    email: email,
    token: jwt,
  };
};

export const authenticateUsingOAuth = async (user: {
  type: string;
  id_token: string;
}) => {
  let email;
  try {
    email = await verifyTokenByPlatform(user);
    if (!email) {
      throw new Error("Email doesn't exist");
    }
    await createOauthUser(user.type, email);

    return {
      email: email,
      token: generateJwt(email),
      firstLetter: email.charAt(0).toUpperCase(),
    };
  } catch (error: any) {
    throw new Error(
      `Failed to login with the ${user.type} account. Try another account. : ${error}`
    );
  }
};

// Create a new user if it doesn't exist, and return a new jwt
const createOauthUser = async (type: string, email: string) => {
  const found = await UserModel.findOne({ oauth: type, email: email });
  if (!found) {
    let newUser = new UserModel({
      oauth: type,
      email: email,
      isVerified: true,
    });

    newUser.save().catch((error: Error) => {
      throw new Error("Failed to create a user: " + error.message);
    });
  }
};

export const sendEmailWithLink = async (email: string) => {
  try {
    let resetHash = await hash(email, 12);
    await UserModel.findOneAndUpdate(
      { oauth: null, email: email },
      { $set: { isReset: false, resetHash: resetHash } }
    );
    await send(email, {
      title: "Password reset",
      text: "We are resetting your password",
      html: `<h1>Password reset</h1><p>Please click the <a clicktracking="off" href="${process.env.SERVER_ORIGIN}/reset-password?h=${resetHash}">link</a> to reset your password</p>`,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
