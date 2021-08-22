import { useState, useContext, createContext } from "react";
import axios from "axios";
import { Redirect, Route, useHistory } from "react-router-dom";
import { verifyEmail } from "../apis/auth";
import { loginRequest } from "../components/Form/MsOauthLogin";

interface AuthProps {
  loggedIn: boolean;
  loggedOut: boolean;
  isEmailVerified: boolean;
  isPasswordUpdated: boolean;
  error: boolean;
  errorMsg: string;
  loading: boolean;
  basicLogin: (event: DOMEvent<HTMLInputElement>, credential: any) => void;
  logout: () => void;
  requestEmailVerification: (
    event: DOMEvent<HTMLInputElement>,
    email: string
  ) => {};
  setupPassword: (event: DOMEvent<HTMLInputElement>, credential: any) => {};
  googleLoginSuccess: (response: any) => void;
  googleLoginFailure: (error: any) => void;
  msLoginHandler: (response: any) => void;
  appleLoginHandler: (response: any) => void;
}

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

type credential = {
  email: string;
  password: string;
};

const BASEURL = process.env.REACT_APP_BASEURL;

const authContext = createContext<AuthProps>({
  loggedIn: false,
  loggedOut: false,
  isEmailVerified: false,
  isPasswordUpdated: false,
  error: false,
  errorMsg: "",
  loading: false,
  basicLogin: (event: DOMEvent<HTMLInputElement>, credential: credential) =>
    Promise,
  logout: () => {},
  requestEmailVerification: (
    event: DOMEvent<HTMLInputElement>,
    email: string
  ) => Promise,
  setupPassword: (event: DOMEvent<HTMLInputElement>, credential: credential) =>
    Promise,
  googleLoginSuccess: (response: any) => Promise,
  googleLoginFailure: (error: any) => Promise,
  msLoginHandler: (response: any) => Promise,
  appleLoginHandler: (response: any) => Promise,
});

export function AuthProvider({ children }: any) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth!}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState({
    loggedIn: false,
    loggedOut: false,
    isEmailVerified: false,
    isPasswordUpdated: false,
    error: false,
    errorMsg: "",
    loading: false,
  });

  const history = useHistory();

  const basicLogin = (
    event: DOMEvent<HTMLInputElement>,
    credential: credential
  ) => {
    event.preventDefault();
    setUser({ ...user, loading: true });
    axios
      .post(`${BASEURL}/login`, credential)
      .then(() => {
        setUser({ ...user, loggedIn: true });
        history.push("/main");
      })
      .catch((error: any) => {
        if (error.response.data) {
          setUser({
            ...user!,
            error: true,
            errorMsg: error.response.data,
          });
        } else {
          setUser({
            ...user!,
            error: true,
            errorMsg: error.statusText,
          });
        }
      });
  };

  const requestEmailVerification = async (
    event: DOMEvent<HTMLInputElement>,
    email: string
  ) => {
    event.preventDefault();
    setUser({
      ...user,
      loading: true,
    });
    const isVerified = await verifyEmail(email);
    if (isVerified) {
      await sendConfirmEmail(email)
        .then(() => {
          setUser({
            ...user,
            isEmailVerified: true,
            loading: false,
          });
        })
        .catch((error) => {
          setUser({
            ...user,
            loading: false,
            error: true,
            errorMsg: error.message,
          });
        });
    }
  };

  const sendConfirmEmail = async (email: string) => {
    await axios
      .post(`${BASEURL}/confirm-email`, { email: email })
      .catch((reason: any) => {
        throw Error(reason.response.data);
      });
  };

  const setupPassword = async (
    event: DOMEvent<HTMLInputElement>,
    credential: credential
  ) => {
    event.preventDefault();
    setUser({ ...user, loading: true });
    await axios
      .post(`${BASEURL}/complete-signup`, {
        email: credential.email,
        password: credential.password,
      })
      .then(() => {
        setUser({
          ...user,
          isPasswordUpdated: true,
        });
      })
      .catch((error: any) => {
        setUser({
          ...user,
          loading: false,
          error: true,
          errorMsg: error.response.data,
        });
      });
  };

  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/logout`)
      .then(() => setUser({ ...user, loggedIn: false, loggedOut: true }))
      .catch((error) => {
        console.error(error);
      });
  };

  const googleLoginSuccess = (response: any) => {
    console.log(response);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/oauth`, {
        type: "google",
        id_token: response.tokenId,
      })
      .then(() => {
        setUser({ ...user, loggedIn: true });
        history.push("/main", { loggedIn: true });
      })
      .catch((error) => {
        console.error(error);
        setUser({ ...user, error: true, errorMsg: error.message });
      });
  };

  const googleLoginFailure = (error: any) => {
    console.error(error);
    setUser({ ...user, error: true, errorMsg: error.message });
  };

  const msLoginHandler = (instance: any) => {
    instance
      .loginPopup(loginRequest)
      .then((response: any) => {
        axios.post(`${process.env.REACT_APP_BASEURL}/oauth`, {
          type: "ms",
          id_token: response.idToken,
          email: response.account.username,
        });
        setUser({ ...user, loggedIn: true });
        history.push("/main", { loggedIn: true });
      })
      .catch((error: any) => {
        console.error(error);
        setUser({ ...user, error: true, errorMsg: error.message });
      });
  };

  const appleLoginHandler = (response: any) => {
    console.log(response);
    try {
      axios.post(`${process.env.REACT_APP_BASEURL}/oauth`, {
        type: "apple",
        id_token: response.id_token,
      });
      setUser({ ...user, loggedIn: true });
      history.push("/main", { loggedIn: true });
    } catch (error) {
      console.error(error);
      setUser({ ...user, error: true, errorMsg: error.message });
    }
  };

  return {
    ...user,
    basicLogin,
    requestEmailVerification,
    setupPassword,
    logout,
    googleLoginSuccess,
    googleLoginFailure,
    msLoginHandler,
    appleLoginHandler,
  };
}

export function PrivateRoute({ children, ...rest }: any) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => (auth.loggedIn ? children : <Redirect to="/login" />)}
    />
  );
}
