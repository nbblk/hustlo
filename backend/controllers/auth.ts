import {
  sendConfirmationEmail,
  verifyUser,
  addPassword as updatePassword,
  authenticate,
} from "../services/auth";
import { validationResult } from "express-validator";

const clientBaseUrl = process.env.CLIENT_BASE_URL;

const signup = async (req: any, res: any, next: any) => {
  await sendConfirmationEmail(req.body.email)
    .then(() => {
      res.status(201).send("Created");
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

const redirect = async (req: any, res: any, next: any) => {
  const hash = req.query.h;
  await verifyUser(hash).catch((error) => {
    res.send(error).redirect(`${clientBaseUrl}/signup/error`);
  });
  res.redirect(`${clientBaseUrl}/password-setup?h=${hash}`);
};

const addPassword = async (req: any, res: any, next: any) => {
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

const login = async (req: any, res: any, next: any) => {
  await authenticate(req.body.email, req.body.password)
    .then((token) => {
      res.status(200).send(token);
    })
    .catch((error) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
      } else {
        res.status(401).send(error);
      }
    });
};

export { signup, redirect, addPassword, login };
