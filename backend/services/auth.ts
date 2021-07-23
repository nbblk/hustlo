import * as dotenv from "dotenv";
import { User, UserModel } from "../models/user";
import { generateHashcode } from "../utils/util";

dotenv.config({ path: "./sendgrid.env" });

const sgMail = require("@sendgrid/mail");

// store a user data to database
const createUser = async (email: string): Promise<User> => {
  const newUser = new UserModel({
    email: email,
    isVerified: false,
    hash: generateHashcode(),
    password: null,
  });

  const created = await newUser.save().catch((error) => {
    throw Error("failed to create a user: " + error);
  });
  return created;
};

// send email which includes the url for redirection
export const sendConfirmationEmail = async (email: string) => {
  const created = await createUser(email).catch((error) => {
    throw Error(error);
  });
  const hash = created.hash;

  const content = {
    to: email, // Change to your recipient
    from: process.env.hostEmail, // Change to your verified sender
    subject: "Welcome Hustlo",
    text: "Almost finished!😉",
    html: `<p>Please click this <a href="${process.env.baseurl}/confirm-email?h=${hash}"/>link</a> to finish the signup process</p>`,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(content).catch((error: any) => {
    throw Error("failed to send email: " + error);
  });
};

// if user clicks the url, updated the isVerified value to 'true' and delete hash
export const verifyUser = async (hash: string): Promise<void> => {
  const query = { hash: hash };
  await UserModel.findOneAndUpdate(query, {
    $set: { isVerified: true },
    $unset: { hash: 1 },
  }).catch((error) => {
    throw Error("failed to verify user" + error);
  });
};

// update the password to finish the signup
export const addPassword = async (password: string) => {
  const query = { password: password };
  await UserModel.findOneAndUpdate(query, {
    $set: { password: password },
  }).catch((error) => {
    throw Error("failed to add password to existed user" + error);
  });
};
