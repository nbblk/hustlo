import Button from "../Button";
import InputBox from "../InputBox";

const Forgot = (props: any) => {
  return (
    <form>
      <small className="font-nunito">We'll send a recovery link to</small>
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
      <Button
        bgColor="green"
        textColor="white"
        hoverColor="green hover:opacity-25"
        textSize="md"
        width="full"
        marginY="2"
        height="10"
        value="Send recovery link"
        click={props.sendRecoveryEmail}
        disabled={props.isEmailValid ? false : true}
      />
    </form>
  );
};

export default Forgot;
