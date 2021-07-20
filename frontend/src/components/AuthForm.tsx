import { Link } from "react-router-dom";
import Login from "./Form/Login";
import Signup from "./Form/Signup";

const AuthForm = (props: any) => {
  return (
    <div className="w-full h-full md:w-2/5 xl:w-1/5 md:h-1/3 p-4 md:h-2/3 flex flex-col justify-center items-center bg-white text-center shadow-2xl">
      <h3 className="my-12 font-bold text-gray">
        {props.type === "login"
          ? "Login to Hustlo"
          : "Sign up for your account"}
      </h3>
      {props.type === "login" ? (
        <Login />
      ) : (
        <Signup
          checkEmail={props.checkEmail}
          validEmail={props.validEmail}
          submitEmail={props.submitEmail}
        />
      )}
      <div className="font-nunito text-red m-4">
        {props.error ? props.errorMsg : null}
      </div>
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
