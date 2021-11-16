import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Button from "../Button";

interface OauthLoginButtonProps {
  children?: ReactNode;
  value: string;
  icon: IconProp
  click: () => void;
}

const OauthLoginButton = (props: OauthLoginButtonProps) => {
  return (
    <div className="p-4 my-2 w-full h-10 flex justify-between items-center border border-gray-lightest rounded text-sm text-gray shadow-md">
      {props.children}
      <FontAwesomeIcon icon={props.icon} className="mx-2" />
      <Button
        width="full"
        height="6"
        textColor="gray-light"
        bgColor="transparent"
        borderColor="gray-light"
        hoverColor="transparent"
        textSize="md"
        value={props.value}
        click={props.click}
      />
    </div>
  );
};

export default OauthLoginButton;
