import express from "express";
import * as dotenv from "dotenv";
import {
  sendConfirmationEmail,
  verifyUser,
  addPassword as updatePassword,
  authenticate,
  authenticateUsingOAuth,
  sendEmailWithLink,
} from "../services/auth";
import { validationResult } from "express-validator";

dotenv.config({ path: "./.env" });

const clientOrigin = process.env.CLIENT_ORIGIN;

const signup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  await sendConfirmationEmail(req.body.email)
    .then(() => {
      res.status(201).send("Created");
    })
    .catch((error) => {
      const errors = validationResult(req);
      let status, message;
      if (!errors.isEmpty()) {
        status = 400;
        message = errors.array();
      } else {
        status = 401;
        message = error.message;
      }
      res.status(status).send(error.message);
    });
};

type redirectType = {
  url: string,
  type: string
}

const redirect = async (req: express.Request, res: express.Response, redirect: redirectType) => {
  const hash = req.query.h?.toString();
  if (!hash) {
    res.status(401).send("Invalid access");
  } else {
    try {
      await verifyUser(hash, redirect.type);
      res.redirect(redirect.url);
    } catch (error: any) {
      res.send(error).redirect(`${clientOrigin}/error`);
    }
  }
};

const addPassword = async (req: express.Request, res: express.Response) => {
  await updatePassword(req.body.email, req.body.password)
    .then(() => {
    res.status(200).send("Updated");
    })
    .catch((error) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
      } else {
        res.status(500).send(error);
      }
    });
};

const basicLogin = async (req: express.Request, res: express.Response) => {
  let userInfo;
  try {
    userInfo = await authenticate(req.body.email, req.body.password);
    res.send(userInfo);
  } catch (error: any) {
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 401;
      message = error.message;
    }
    res.status(status).send(error.message);
  }
};

const OAuthLogin = async (req: express.Request, res: express.Response) => {
  let userInfo;
  try {
    userInfo = await authenticateUsingOAuth({ ...req.body });
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};

const sendRecoveryLink = async (req: express.Request, res: express.Response) => {
  try {
    await sendEmailWithLink(req.body.email);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export { signup, redirect, addPassword, basicLogin, OAuthLogin, sendRecoveryLink };
