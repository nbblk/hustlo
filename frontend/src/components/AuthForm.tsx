import Button from "./Button";
import InputBox from "./InputBox";

const AuthForm = (props: any) => {
  const login = (
    <div className="w-full h-full md:w-1/2 md:h-2/3 flex flex-col justify-center items-center bg-white boxShadow text-center">
      <h3>Log in to Hustlo</h3>
      <form>
        <InputBox type="email" placeholder="Enter email" />
        <InputBox type="password" placeholder="Enter password" />
        <Button color="green" textColor="white" />
      </form>
      <small>OR</small>
      <div className="border border-top-gray"></div>
      <a>Can't log in?</a>
      <a>Sign up for an account</a>
    </div>
  );

  const signup = (
    <div className="w-full h-full md:w-1/2 md:h-2/3 flex flex-col justify-center items-center bg-white boxShadow text-center">
      <h3>Sign up for your account</h3>
      <form>
        <InputBox type="email" placeholder="Enter email" />
        <small>
          By signing up, you confirm that you've read and accepted your{" "}
          <a>Terms of Service</a> and <a>Privacy Policy</a>.
        </small>
        <Button color="bg-gray-light" textColor="bg-gray-dark" disabled />
      </form>
      <small>OR</small>
      <div className="border border-top-gray"></div>
      <a>already have an account?</a>
      <a>Log In</a>
    </div>
  );
  return (
    <div className="w-full h-full md:w-1/2 md:h-2/3 flex flex-col justify-center items-center bg-white boxShadow text-center">
      <h3>
        {props.type === "login"
          ? "Login to Hustlo"
          : "Sign up for your account"}
      </h3>
      {props.type === "login" ? login : signup}
      <small>OR</small>
      <div className="border border-top-gray"></div>
      <a>Can't log in? / Already have an account?</a>
      <a>Sign up for an account / Log In</a>
    </div>
  );
};

export default AuthForm;
