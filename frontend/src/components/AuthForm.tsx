import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import Forgot from "./Form/Forgot";
import { GoogleOauthLoginButton } from "./Form/GoogleOauthLoginButton";
import Login from "./Form/Login";
import { MsOauthLoginButton } from "./Form/MsOauthLoginButton";
import Signup from "./Form/Signup";

interface AuthFormProps {
  type: string;
  emailValue: string;
  passwordValue: string;
  isEmailValid: boolean;
  isPwdValid: boolean;
  errorMsg: string;
  checkEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  checkPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  setupPassword: (event: FormEvent<HTMLButtonElement>) => void;
  login: (event: FormEvent<HTMLButtonElement>) => void;
  submitEmail: (event: FormEvent<HTMLButtonElement>) => void;
  sendRecoveryEmail: (event: FormEvent<HTMLButtonElement>) => void;
  googleSuccess: (response: any) => void;
  googleFailure: (response: any) => void;
  msLoginHandler: (response: any) => void;
}

const AuthForm = (props: AuthFormProps) => {
  const getTitle = () => {
    let title;
    switch (props.type) {
      case "login":
        title = "Login to Hustlo";
        break;
      case "password":
        title = "Set up your password";
        break;
      case "signup":
        title = "Sign up for your account";
        break;
      case "forgot":
        title = "Can't log in?";
        break;
      default:
        break;
    }
    return title;
  };

  const getForm = () => {
    let form;
    switch (props.type) {
      case "login":
        form = (
          <Login
            type={props.type}
            emailValue={props.emailValue}
            passwordValue={props.passwordValue}
            isEmailValid={props.isEmailValid}
            isPwdValid={props.isPwdValid}
            checkEmail={props.checkEmail}
            checkPassword={props.checkPassword}
            setupPassword={props.setupPassword}
            login={props.login}
          />
        );
        break;
      case "password":
        form = (
          <Login
            type={props.type}
            emailValue={props.emailValue}
            passwordValue={props.passwordValue}
            isEmailValid={props.isEmailValid}
            isPwdValid={props.isPwdValid}
            checkEmail={props.checkEmail}
            checkPassword={props.checkPassword}
            setupPassword={props.setupPassword}
            login={props.login}
          />
        );
        break;
      case "signup":
        form = (
          <Signup
            type={props.type}
            emailValue={props.emailValue}
            isEmailValid={props.isEmailValid}
            checkEmail={props.checkEmail}
            validEmail={props.isEmailValid}
            submitEmail={props.submitEmail}
          />
        );
        break;
      case "forgot":
        form = (
          <Forgot
            type={props.type}
            emailValue={props.emailValue}
            isEmailValid={props.isEmailValid}
            checkEmail={props.checkEmail}
            validEmail={props.isEmailValid}
            sendRecoveryEmail={props.sendRecoveryEmail}
          />
        );
        break;
      default:
        break;
    }
    return form;
  };

  return (
    <div className="w-screen h-screen md:w-3/5 xl:w-1/3 p-4 flex flex-col justify-center items-center bg-white text-center shadow-2xl">
      <h3 className="my-12 font-bold text-gray">{getTitle()}</h3>
      {getForm()}
      <div className="font-nunito text-red m-4">{props.errorMsg}</div>
      <div className={`${props.type === "login" ? "block" : "hidden"}`}>
        <small>OR</small>
        <div>
          <GoogleOauthLoginButton
            googleSuccess={props.googleSuccess}
            googleFailure={props.googleFailure}
          />
          <MsOauthLoginButton msLoginHandler={props.msLoginHandler} />
        </div>
      </div>
      <div className="w-2/3 m-4 border border-t-1 border-gray-lightest"></div>
      <div className="h-1/3 text-blue text-sm">
        <Link to="/forgot">
          <button className="m-2 hover:underline cursor-pointer">
            {props.type === "login" ? "Can't Log in?" : ""}
          </button>
        </Link>
        <Link to="/login">
          <button className="m-2 hover:underline cursor-pointer">
            {props.type === "signup" || props.type === "forgot"
              ? "Back to Log in"
              : ""}
          </button>
        </Link>
        <Link to="/signup">
          <button className="m-2 hover:underline cursor-pointer">
            {props.type === "login" ? "Sign up for an account" : ""}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
