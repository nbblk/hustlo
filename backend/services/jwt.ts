import jwt from "jsonwebtoken";

export const generateJwt = (email: string) => {
  let secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ email: email }, secretKey!, { expiresIn: "18000s" });
};

export const verifyJwt = (token: string) => {
  let secretKey = process.env.JWT_SECRET_KEY;
  try {
    return jwt.verify(token, secretKey!);
  } catch (error) {
    throw Error("Failed to veirfy jwt" + error);
  }
};
