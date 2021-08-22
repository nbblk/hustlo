import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./MsOauthLogin";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import OauthButton from "./OauthLoginButton";

const handleLogin = (instance: any) => {
  instance.loginPopup(loginRequest).catch((error: any) => {
    console.error(error);
  });
};

export const MsOauthLoginButton = (props: any) => {
  const { instance } = useMsal();

  return (
    <OauthButton
      value="Login with Microsoft"
      icon={faMicrosoft}
      click={() => handleLogin(instance)}
    />
  );
};
