import AppleLogin from "react-apple-login";
import OauthLoginButton from "./OauthLoginButton";
import { faApple } from "@fortawesome/free-brands-svg-icons";

export const AppleOauthLoginButton = (props: any) => {
  return (
    <AppleLogin
      clientId={process.env.REACT_APP_APPLE_CLIENT_ID!}
      redirectURI={process.env.REACT_APP_APPLE_REDIRECT_URI!}
      responseMode="query"
      usePopup={true}
      render={(props) => (
        <OauthLoginButton
          icon={faApple}
          value="Sign in with Apple"
          click={props.onClick}
        />
      )}
      callback={(response) => {
        props.appleLoginHandler(response);
      }}
    />
  );
};
