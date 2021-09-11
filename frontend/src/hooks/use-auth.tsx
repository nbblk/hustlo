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
  isEmailVerified: boolean;
  isPasswordUpdated: boolean;
  errorMsg: string;
  loading: boolean;
  basicLogin: (event: FormEvent<HTMLButtonElement>, credential: any) => void;
  basicLogout: () => JSX.Element;
  requestEmailVerification: (
    event: FormEvent<HTMLButtonElement>,
    email: string
  ) => void;
  setupPassword: (event: FormEvent<HTMLButtonElement>, credential: any) => void;
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
  isEmailVerified: false,
  isPasswordUpdated: false,
  errorMsg: "",
  loading: false,
  basicLogin: (event: FormEvent<HTMLButtonElement>, credential: credential) =>
    Promise,
  basicLogout: () => <Redirect to="/" />,
  requestEmailVerification: (
    event: FormEvent<HTMLButtonElement>,
    email: string
  ) => Promise,
  setupPassword: (
    event: FormEvent<HTMLButtonElement>,
    credential: credential
  ) => Promise,
  googleLoginSuccess: (response: any) => Promise,
  googleLoginFailure: (error: any) => Promise,
  msLoginHandler: (response: any) => Promise,
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
    isEmailVerified: false,
    isPasswordUpdated: false,
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
  }, [auth.loggedIn]);

  const basicLogin = async (
    event: FormEvent<HTMLButtonElement>,
    credential: credential
  ) => {
    event.preventDefault();
    setAuth({ ...auth, loading: true, errorMsg: "" });
    try {
      let response = await axios.post(`${BASEURL}/login`, credential);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setAuth({ ...auth, loggedIn: true });
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
    const isVerified = await verifyEmail(email);
    if (isVerified) {
      await sendConfirmEmail(email);
    } else {
      setAuth({
        ...auth,
        isEmailVerified: false,
        errorMsg: "Please enter a valid email.",
      });
    }
  };

  const sendConfirmEmail = async (email: string) => {
    setAuth({ ...auth, loading: true, errorMsg: "" });
    try {
      await axios.request({
        method: "POST",
        url: `${BASEURL}/confirm-email`,
        data: { email: email },
      });
      setAuth({
        ...auth,
        isEmailVerified: true,
        loading: false,
      });
    } catch (error: any) {
      setAuth({
        ...auth,
        isEmailVerified: false,
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
      });
    } catch (error: any) {
      setAuth({
        ...auth,
        isPasswordUpdated: false,
        errorMsg: error.response.data,
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
      setAuth({ ...auth, loggedIn: true, loading: false });
      history.push("/main");
    } catch (error: any) {
      setAuth({ ...auth, errorMsg: error.repsonse.data });
    }
  };

  const googleLoginFailure = (error: any) => {
    setAuth({ ...auth, errorMsg: error.message });
  };

  const msLoginHandler = async (instance: any) => {
    setAuth({ ...auth, loading: true, errorMsg: "" });
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
      setAuth({ ...auth, loggedIn: true, loading: false });
      history.push("/main");
    } catch (error: any) {
      console.error(error);
      setAuth({ ...auth, errorMsg: error.response.data });
    }
  };

  return {
    ...auth,
    basicLogin,
    basicLogout,
    requestEmailVerification,
    setupPassword,
    logout,
    googleLoginSuccess,
    googleLoginFailure,
    msLoginHandler,
  };
}
