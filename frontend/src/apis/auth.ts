import { VerifaliaRestClient } from "verifalia";

export const verifyEmail = async (email: string) => {
  const VERIFALIA_USERNAME = process.env.REACT_APP_VERIFALIA_USERNAME!;
  const VERIFALIA_PASSWORD = process.env.REACT_APP_VERIFALIA_PASSWORD!;

  const verifalia = new VerifaliaRestClient({
    username: VERIFALIA_USERNAME,
    password: VERIFALIA_PASSWORD,
  });

  const isVerified = await verifalia.emailValidations
    .submit(email, true)
    .catch((reason) => {
      console.error(reason.message, reason.repsonse);
    });
  const result = isVerified?.entries[0];

  return result?.status === "Success" && result.classification === "Deliverable"
    ? true
    : false;
};
