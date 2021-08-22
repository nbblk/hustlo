import { User, UserModel } from "../models/user";
import { generateHashcode } from "../utils/util";
import { send } from "./mail";
import { hash, compare } from "bcryptjs";
import { generateJwt, verifyJwt } from "./jwt";
import { verifyTokenByPlatform } from "./oauth";

// Store a user data to database
const createUser = async (email: string): Promise<User> => {
  const newUser = new UserModel({
    email: email,
    isVerified: false,
    hash: generateHashcode(),
    password: null,
  });

  // Check if the email already exists.
  const found = await UserModel.findOne({ email: email });
  if (!found) {
    return await newUser.save().catch((error) => {
      throw Error("Failed to create a user: " + error);
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
  await send(email, hash).catch((error) => {
    throw Error("Failed to send an email: " + error);
  });
};

// If a user clicks the url, update the isVerified to 'true' and delete the hash
export const verifyUser = async (hash: string): Promise<void> => {
  const query = { hash: hash };
  await UserModel.findOneAndUpdate(query, {
    $set: { isVerified: true },
    $unset: { hash: 1 },
  }).catch((error) => {
    throw Error("Failed to verify the user: " + error);
  });
};

// Update the password to finish the signup
export const addPassword = async (email: string, password: string) => {
  const encrypted = await hash(password, 12);
  const query = { email: email, isVerified: true };
  await UserModel.updateOne(query, {
    $set: { password: encrypted },
  }).catch((error: any) => {
    throw Error("Failed to add password to the existed user: " + error);
  });
};

// Retrieve the email and password, then generate jwt to grant access
export const authenticate = async (email: string, password: string) => {
  const query = { email: email };
  let jwt = null;
  try {
    const result = await UserModel.findOne(query).exec();
    if (result === null) {
      throw Error("Email or password is incorrect. Please try again. ");
    } else {
      const isMatched = await compare(password, result.password);
      jwt = isMatched ? generateJwt(email) : null;
    }
  } catch (error) {
    throw Error("Failed to retrieve user: " + error);
  }
  return jwt;
};

export const authenticateUsingOAuth = async (user: any) => {
  const email = await verifyTokenByPlatform(user).catch((error) => {
    throw Error(error);
  });

  if (!email) {
    throw Error(
      `Failed to login with the ${user.type} account. Try another account.`
    );
  } else {
    await createOauthUser(email);
    return generateJwt(email);
  }
};

// Create a new user if it doesn't exist, and return a new jwt
const createOauthUser = async (email: string) => {
  const found = await UserModel.findOne({ email: email });
  if (!found) {
    let newUser = new UserModel({
      email: email,
      isVerified: true,
    });

    await newUser.save().catch((error) => {
      throw Error("Failed to create a user: " + error);
    });
  }
};
