import { Link } from "react-router-dom";
import Button from "./Button";
import InputBox from "./InputBox";

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}
const AuthForm = (props: any) => {
  const login = (
    <form>
      <InputBox
        type="email"
        placeholder="Enter email"
        height="10"
        width="full md:1/5"
        marginY="2"
      />
      <InputBox
        type="password"
        placeholder="Enter password"
        height="10"
        width="full md:1/5"
        marginY="2"
      />
      <Button
        color="green"
        textColor="white"
        width="full md:1/5"
        marginY="2"
        height="10"
        value="Log in"
      />
    </form>
  );

  const signup = (
    <form>
      <InputBox
        type="email"
        placeholder="Enter email"
        width="full md:1/5"
        height="10"
        change={props.checkEmail}
      />
      <small className="block my-4">
        By signing up, you confirm that you've read and accepted your{" "}
        <a href="/terms-of-service" className="text-blue">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-blue">
          Privacy Policy
        </a>
        .
      </small>
      <Button
        color="green"
        textColor="white"
        width="full md:1/5"
        height="10"
        value="Continue"
        disabled={props.validEmail ? false : true}
        click={props.submitEmail}
      />
    </form>
  );
  return (
    <div className="w-full h-full md:w-1/3 p-4 md:h-2/3 flex flex-col justify-center items-center bg-white text-center shadow-2xl">
      <h3 className="my-12 font-bold text-gray">
        {props.type === "login"
          ? "Login to Hustlo"
          : "Sign up for your account"}
      </h3>
      {props.type === "login" ? login : signup}
      <small className="my-12">OR</small>
      <div className="w-2/3 m-4 border border-t-1 border-gray-lightest"></div>
      <div className="text-blue text-sm">
        <Link to="/login">
          <button className="m-2 hover:underline cursor-pointer">
            {props.type === "login"
              ? "Can't log in?"
              : "Already have an account? Log in"}
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
