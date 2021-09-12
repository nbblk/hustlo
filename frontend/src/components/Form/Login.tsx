import Button from "../Button";
import InputBox from "../InputBox";

const Login = (props: any) => (
  <form>
    <InputBox
      type="email"
      placeholder="Enter email"
      height="10"
      width="full"
      marginY="2"
      change={props.checkEmail}
    />
    <small className="text-red text-left font-nunito">
      {props.emailValue.length > 0 && !props.isEmailValid
        ? "Please enter a valid email"
        : null}
    </small>
    <InputBox
      type="password"
      placeholder={
        props.type === "password" ? "Create a new password" : "Enter password"
      }
      height="10"
      width="full"
      marginY="2"
      change={props.checkPassword}
    />
    <small className="text-red text-left font-nunito">
      {props.passwordValue.length > 0 && !props.isPwdValid
        ? "The password should be more than 8 characters with at least one number and special character"
        : null}
    </small>
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
