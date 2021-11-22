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
        border={true}
        borderColor={"border-gray-lightest"}
        change={props.checkEmail}
      />
      <p className="text-red text-sm text-center font-nunito">
        {props.emailValue.length > 0 && !props.isEmailValid
          ? "Please enter a valid email"
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
        value="Send recovery link"
        click={props.sendRecoveryEmail}
        disabled={props.isEmailValid ? false : true}
      />
    </form>
  );
};

export default Forgot;
