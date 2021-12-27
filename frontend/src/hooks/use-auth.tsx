import {
  useState,
  useContext,
  createContext,
  useEffect,
  FormEvent,
} from "react";
import { Redirect, useHistory } from "react-router-dom";
import { verifyEmail } from "../apis/auth";
import { loginRequest } from "../components/Form/MsOauthLogin";
import axios from "axios";

interface AuthProps {
  loggedIn: boolean;
  isVerifyEmailSent: boolean;
  isPasswordUpdated: boolean;
  isRecoveryEmailSent: boolean;
  errorMsg: string;
  loading: boolean;
  basicLogin: (
    event: FormEvent<HTMLButtonElement>,
    credential: credential
  ) => void;
  basicLogout: () => JSX.Element;
  requestEmailVerification: (
    event: FormEvent<HTMLButtonElement>,
    email: string
  ) => void;
  setupPassword: (
    event: FormEvent<HTMLButtonElement>,
    credential: credential
  ) => void;
  sendRecoveryEmail: (
    event: FormEvent<HTMLButtonElement>,
    email: string
  ) => void;
  googleLoginSuccess: (response: any) => void;
  googleLoginFailure: (error: any) => void;
  msLoginHandler: (response: any) => void;
}

type credential = {
  email: string;
  password: string;
};

const BASEURL = process.env.REACT_APP_BASEURL;

const authContext = createContext<AuthProps>({
  loggedIn: false,
  isVerifyEmailSent: false,
  isPasswordUpdated: false,
  isRecoveryEmailSent: false,
  errorMsg: "",
  loading: false,
  basicLogin: () => Promise,
  basicLogout: () => <Redirect to="/" />,
  requestEmailVerification: () => Promise,
  setupPassword: () => Promise,
  sendRecoveryEmail: () => Promise,
  googleLoginSuccess: () => Promise,
  googleLoginFailure: () => Promise,
  msLoginHandler: () => Promise,
});

export function AuthProvider({ children }: any) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth!}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [auth, setAuth] = useState({
    loggedIn: false,
    isVerifyEmailSent: false,
    isPasswordUpdated: false,
    isRecoveryEmailSent: false,
    loading: false,
    errorMsg: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (!auth.loggedIn) {
      if (sessionStorage.getItem("user")) {
        setAuth({ ...auth, loggedIn: true });
      }
    }

    if (auth.isPasswordUpdated) {
      setAuth({ ...auth, isPasswordUpdated: false });
    }
  }, [auth.loggedIn, auth.isPasswordUpdated]);

  const basicLogin = async (
    event: FormEvent<HTMLButtonElement>,
    credential: credential
  ) => {
    event.preventDefault();
    setAuth({ ...auth, loading: true, errorMsg: "" });
    try {
      let response = await axios.post(`${BASEURL}/login`, credential);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setAuth({
        ...auth,
        loggedIn: true,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
      });
      history.push("/main");
    } catch (error: any) {
      setAuth({ ...auth, errorMsg: error.response.data });
    }
  };

  const basicLogout = () => {
    sessionStorage.removeItem("user");
    setAuth({ ...auth, loggedIn: false });
    return <Redirect to="/" />;
  };

  const requestEmailVerification = async (
    event: FormEvent<HTMLButtonElement>,
    email: string
  ) => {
    event.preventDefault();
    setAuth({ ...auth, loading: true, errorMsg: "" });
    const isVerified = await verifyEmail(email);
    if (isVerified) {
      await sendConfirmEmail(email);
    } else {
      setAuth({
        ...auth,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
        errorMsg: "Please enter a valid email.",
        loading: false,
      });
    }
  };

  const sendConfirmEmail = async (email: string) => {
    try {
      await axios.request({
        method: "POST",
        url: `${BASEURL}/confirm-email`,
        data: { email: email },
      });
      setAuth({
        ...auth,
        isVerifyEmailSent: true,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
        loading: false,
      });
    } catch (error: any) {
      setAuth({
        ...auth,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
        errorMsg: error.response.data,
      });
    }
  };

  const setupPassword = async (
    event: FormEvent<HTMLButtonElement>,
    credential: credential
  ) => {
    event.preventDefault();
    setAuth({ ...auth, loading: true, errorMsg: "" });
    try {
      axios.request({
        method: "POST",
        url: `${BASEURL}/complete-signup`,
        data: { email: credential.email, password: credential.password },
      });
      setAuth({
        ...auth,
        isPasswordUpdated: true,
        isVerifyEmailSent: false,
        isRecoveryEmailSent: false,
      });
    } catch (error: any) {
      setAuth({
        ...auth,
        isPasswordUpdated: false,
        isVerifyEmailSent: false,
        isRecoveryEmailSent: false,
        errorMsg: error.response.data,
      });
    }
  };

  const sendRecoveryEmail = async (
    event: FormEvent<HTMLButtonElement>,
    email: string
  ) => {
    event.preventDefault();
    setAuth({ ...auth, loading: true, errorMsg: "" });
    try {
      await axios.request({
        method: "POST",
        url: `${BASEURL}/recovery-email`,
        data: { email: email },
      });
      setAuth({
        ...auth,
        isRecoveryEmailSent: true,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        loading: false,
      });
    } catch (error: any) {
      console.error(error);
      setAuth({
        ...auth,
        isRecoveryEmailSent: false,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        errorMsg: error.response.data,
        loading: false,
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setAuth({ ...auth, loggedIn: false });
  };

  const googleLoginSuccess = async (response: any) => {
    setAuth({ ...auth, loading: true, errorMsg: "" });
    try {
      let userInfo = await axios.request({
        method: "POST",
        url: `${BASEURL}/oauth`,
        data: {
          type: "google",
          id_token: response.tokenId,
        },
      });
      sessionStorage.setItem("user", JSON.stringify(userInfo.data));
      setAuth({
        ...auth,
        loggedIn: true,
        loading: false,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
      });
      history.push("/main");
    } catch (error: any) {
      setAuth({
        ...auth,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
        errorMsg: error.repsonse.data,
      });
    }
  };

  const googleLoginFailure = (error: any) => {
    setAuth({ ...auth, errorMsg: error.message });
  };

  const msLoginHandler = async (instance: any) => {
    setAuth({
      ...auth,
      loading: true,
      errorMsg: "",
      isVerifyEmailSent: false,
      isPasswordUpdated: false,
      isRecoveryEmailSent: false,
    });
    try {
      let response = await instance.loginPopup(loginRequest);
      let userInfo = await axios.request({
        method: "POST",
        url: `${BASEURL}/oauth`,
        data: {
          type: "ms",
          id_token: response.idToken,
          email: response.account.username,
        },
      });
      sessionStorage.setItem("user", JSON.stringify(userInfo.data));
      setAuth({
        ...auth,
        loggedIn: true,
        loading: false,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
      });
      history.push("/main");
    } catch (error: any) {
      console.error(error);
      setAuth({
        ...auth,
        isVerifyEmailSent: false,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
        errorMsg: error.response.data,
      });
    }
  };

  return {
    ...auth,
    basicLogin,
    basicLogout,
    requestEmailVerification,
    setupPassword,
    sendRecoveryEmail,
    logout,
    googleLoginSuccess,
    googleLoginFailure,
    msLoginHandler,
  };
}
