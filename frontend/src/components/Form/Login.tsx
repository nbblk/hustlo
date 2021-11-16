import { ChangeEvent, FormEvent } from "react";
import Button from "../Button";
import InputBox from "../InputBox";

interface LoginProps {
  type: string;
  emailValue: string;
  isEmailValid: boolean;
  passwordValue: string;
  isPwdValid: boolean;
  checkEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  checkPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  setupPassword: (event: FormEvent<HTMLButtonElement>) => void;
  login: (event: FormEvent<HTMLButtonElement>) => void;
}

const Login = (props: LoginProps) => (
  <form className="w-2/3">
    <InputBox
      type="email"
      placeholder="Enter email"
      height="10"
      width="full"
      marginY="2"
      border={true}
      borderColor={"border-gray-lightest"}
      change={props.checkEmail}
    />
    <p className="text-red text-center text-sm font-nunito">
      {props.emailValue.length > 0 && !props.isEmailValid
        ? "Please enter a valid email"
        : null}
    </p>
    <InputBox
      type="password"
      placeholder={
        props.type === "password" ? "Create a new password" : "Enter password"
      }
      height="10"
      width="full"
      marginY="2"
      border={true}
      borderColor={"border-gray-lightest"}
      change={props.checkPassword}
    />
    <p className="text-red text-center text-sm font-nunito">
      {props.passwordValue.length > 0 && !props.isPwdValid
        ? "The password should be more than 8 characters with at least one number and special character"
        : null}
    </p>
    <Button
      bgColor="green"
      textColor="white"
      hoverColor="green hover:opacity-25"
      textSize="md"
      width="full"
      marginY="2"
      height="10"
      value={props.type === "password" ? "Save password" : "Log in"}
      click={props.type === "password" ? props.setupPassword : props.login}
      disabled={props.isEmailValid && props.isPwdValid ? false : true}
    />
  </form>
);

export default Login;
