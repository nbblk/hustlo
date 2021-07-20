import Button from "../Button";
import InputBox from "../InputBox";

const Login = () => (
  <form>
    <InputBox
      type="email"
      placeholder="Enter email"
      height="10"
      width="full"
      marginY="2"
    />
    <InputBox
      type="password"
      placeholder="Enter password"
      height="10"
      width="full"
      marginY="2"
    />
    <Button
      color="green"
      textColor="white"
      width="full"
      marginY="2"
      height="10"
      value="Log in"
    />
  </form>
);

export default Login;
