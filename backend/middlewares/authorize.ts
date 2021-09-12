import express from "express";
import { verifyJwt } from "../services/jwt";

export function checkAuthToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new Error("Authorization failed: invalid token");
  }
  try {
    const decoded = verifyJwt(token);
    console.log('decoded', decoded);
    console.log(req.body.name, req.body.description);
    next();
  } catch (error: any) {
    console.error(error.message)
    return res.sendStatus(401);
  }
}
