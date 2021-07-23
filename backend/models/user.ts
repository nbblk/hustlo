import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface User {
  email: string;
  isVerified: boolean;
  hash: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  email: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  hash: { type: String, required: false },
  password: { type: String, required: true },
});

// 3. Create a Model.
export const UserModel = model<User>("User", schema);
