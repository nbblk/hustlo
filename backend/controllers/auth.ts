import {
  sendConfirmationEmail,
  verifyUser,
  addPassword as updatePassword,
} from "../services/auth";

const signup = async (req: any, res: any, next: any) => {
  await sendConfirmationEmail(req.body.email);
  res.send("success");
};

const redirect = async (req: any, res: any, next: any) => {
  await verifyUser(req.params.hash);
  res.send("success");
};

const addPassword = async (req: any, res: any, next: any) => {
  await updatePassword(req.body.password);
  res.send("success");
};

export { signup, redirect, addPassword };
