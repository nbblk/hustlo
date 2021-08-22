import { GoogleLogin } from "react-google-login";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import OauthButton from "./OauthLoginButton";

export const GoogleOauthLoginButton = (props: any) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID!}
      icon={false}
      onSuccess={props.googleSuccess}
      onFailure={props.googleFailure}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <OauthButton
          click={renderProps.onClick}
          value="Continue with Google"
          icon={faGoogle}
        />
      )}
    />
  );
};
