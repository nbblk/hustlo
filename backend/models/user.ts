import { Schema, model } from "mongoose";
import { hash } from "bcryptjs";

// 1. Create an interface representing a document in MongoDB.
export interface User {
  email: string;
  isVerified: boolean;
  hash: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  oauth: { type: String, required: false },
  email: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  hash: { type: String, required: false },
  password: { type: String, required: false },
});

// 3. Create a Model.
export const UserModel = model<User>("User", schema);
