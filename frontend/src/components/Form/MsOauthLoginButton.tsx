import { useMsal } from "@azure/msal-react";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import OauthButton from "./OauthLoginButton";

export const MsOauthLoginButton = (props: any) => {
  const { instance } = useMsal();

  return (
    <OauthButton
      value="Login with Microsoft"
      icon={faMicrosoft}
      click={() => props.msLoginHandler(instance)}
    />
  );
};
