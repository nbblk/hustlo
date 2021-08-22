import { User, UserModel } from "../models/user";
import { generateHashcode } from "../utils/util";
import { send } from "./mail";
import { hash } from "bcryptjs";
import { generateJwtToken } from "./jwt";
import { verifyByPlatform } from "./oauth";

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

// Retrieve the email and password for authentication, then generate jwt token to grant access
export const authenticate = async (email: string, password: string) => {
  const encrypted = await hash(password, 12);
  const query = { email: email, password: encrypted };
  await UserModel.findOne(query).catch((error: any) => {
    throw Error("Email or password is incorrect. Please try again. " + error);
  });
  return generateJwtToken(email);
};

export const verifyToken = async (type: string, token: string) => {
  const email = await verifyByPlatform(type, token).catch((error) => {
    throw Error(error);
  });

  if (!email) {
    throw Error(
      `Failed to login with the ${type} account. Try another account.`
    );
  } else {
    const newUser = new UserModel({
      email: email,
      isVerified: true,
    });

    const found = await UserModel.findOne({ email: email });
    if (!found) {
      return await newUser.save().catch((error) => {
        throw Error("Failed to create a user: " + error);
      });
    }
    return generateJwtToken(email);
  }
};
