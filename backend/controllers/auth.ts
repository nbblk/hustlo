import {
  sendConfirmationEmail,
  verifyUser,
  addPassword as updatePassword,
  authenticate,
} from "../services/auth";

const clientBaseUrl = process.env.CLIENT_BASE_URL;

const signup = async (req: any, res: any, next: any) => {
  await sendConfirmationEmail(req.body.email)
    .then(() => {
      res.status(201).send("Created");
    })
    .catch((error) => {
      res.status(400).send(error.message);
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
  // validation
  await updatePassword(req.body.email, req.body.password)
    .then(() => {
      res.status(200).send("Updated");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const login = async (req: any, res: any, next: any) => {
  // validation
  await authenticate(req.body.email, req.body.password)
    .then((token) => {
      res.status(200).send(token);
    })
    .catch((error) => {
      res.status(401).send(error);
    });
};

export { signup, redirect, addPassword, login };
