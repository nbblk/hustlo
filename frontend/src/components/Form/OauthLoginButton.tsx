import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";

const OauthLoginButton = (props: any) => {
  return (
    <div className="p-4 my-2 w-full h-10 flex justify-between items-center border border-gray-lightest rounded text-sm text-gray shadow-md">
      {props.children}
      <FontAwesomeIcon icon={props.icon} className="mx-2" />
      <Button
        width="full"
        height="6"
        textColor="gray-light"
        bgColor="white"
        borderColor="gray-light"
        value={props.value}
        click={props.click}
      />
    </div>
  );
};

export default OauthLoginButton;
