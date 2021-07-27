import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const generateJwtToken = (email: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(email, secretKey!, { expiresIn: "1800s" });
};
