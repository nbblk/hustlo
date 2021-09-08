import AppleLogin from "react-apple-login";
import OauthLoginButton from "./OauthLoginButton";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../hooks/use-auth";

export const AppleOauthLoginButton = (props: any) => {
  const auth = useAuth();

  return (
    <AppleLogin
      clientId={process.env.REACT_APP_APPLE_CLIENT_ID!}
      redirectURI={process.env.REACT_APP_APPLE_REDIRECT_URI!}
      responseType="id_token"
      responseMode="form_post"
      scope="email"
      usePopup={true}
      render={(props) => (
        <OauthLoginButton
          icon={faApple}
          value="Sign in with Apple"
          click={props.onClick}
        />
      )}
      callback={(response) => {
        if (!response.error) {
          //          auth.appleLoginHandler(response);
        }
      }}
    />
  );
};
