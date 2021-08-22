import jwt from "jsonwebtoken";

export const generateJwtToken = (email: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(email, secretKey!, { expiresIn: "1800s" });
};
