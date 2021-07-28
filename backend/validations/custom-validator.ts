import { CustomValidator } from "express-validator";

export const customPasswordValidator: CustomValidator = (value: string) => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (regex.test(value)) {
    return true;
  } else {
    throw Error(
      "The password should be more than 8 characters with at least one number and special character."
    );
  }
};
