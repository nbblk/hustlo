import { GoogleLogin } from "react-google-login";

export const GoogleOauthLoginButton = (props: any) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID!}
      buttonText="Continue with Google"
      onSuccess={props.googleSuccess}
      onFailure={props.googleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
