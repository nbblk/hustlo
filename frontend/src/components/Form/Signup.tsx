import Button from "../Button";
import InputBox from "../InputBox";

const Signup = (props: any) => (
  <form>
    <InputBox
      type="email"
      placeholder="Enter email"
      width="full"
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
      width="full"
      height="10"
      value="Continue"
      disabled={props.validEmail ? false : true}
      click={props.submitEmail}
    />
  </form>
);

export default Signup;