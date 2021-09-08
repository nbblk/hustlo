import { useState, useContext, createContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { verifyEmail } from "../apis/auth";
import { loginRequest } from "../components/Form/MsOauthLogin";
import useAxios from "../hooks/use-axios";

interface AuthProps {
  loggedIn: boolean;
  isEmailVerified: boolean;
  isPasswordUpdated: boolean;
  errorMsg: string;
  basicLogin: (event: DOMEvent<HTMLInputElement>, credential: any) => void;
  basicLogout: () => JSX.Element;
  requestEmailVerification: (
    event: DOMEvent<HTMLInputElement>,
    email: string
  ) => {};
  setupPassword: (event: DOMEvent<HTMLInputElement>, credential: any) => {};
  googleLoginSuccess: (response: any) => void;
  googleLoginFailure: (error: any) => void;
  msLoginHandler: (response: any) => void;
  //  appleLoginHandler: (response: any) => void;
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
  isEmailVerified: false,
  isPasswordUpdated: false,
  errorMsg: "",
  basicLogin: (event: DOMEvent<HTMLInputElement>, credential: credential) =>
    Promise,
  basicLogout: () => <Redirect to="/" />,
  requestEmailVerification: (
    event: DOMEvent<HTMLInputElement>,
    email: string
  ) => Promise,
  setupPassword: (event: DOMEvent<HTMLInputElement>, credential: credential) =>
    Promise,
  googleLoginSuccess: (response: any) => Promise,
  googleLoginFailure: (error: any) => Promise,
  msLoginHandler: (response: any) => Promise,
  //  appleLoginHandler: (response: any) => Promise,
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
  const axios = useAxios();

  useEffect(() => {
    if (!auth.loggedIn) {
      if (sessionStorage.getItem("user")) {
        setAuth({ ...auth, loggedIn: true });
      }
    }
  }, [auth.loggedIn]);

  const basicLogin = (
    event: DOMEvent<HTMLInputElement>,
    credential: credential
  ) => {
    event.preventDefault();
    axios.fetch({
      method: "POST",
      url: `${BASEURL}/login`,
      data: credential,
    });

    if (!axios.error && axios.response) {
      sessionStorage.setItem("user", JSON.stringify(axios.response));
      setAuth({ ...auth, loggedIn: true });
      history.push("/main");
    }

    if (axios.error) {
      console.log(axios.error.toString());
      setAuth({ ...auth, errorMsg: axios.error.toString() });
    }
  };

  const basicLogout = () => {
    sessionStorage.removeItem("user");
    setAuth({ ...auth, loggedIn: false });
    return <Redirect to="/" />;
  };

  const requestEmailVerification = async (
    event: DOMEvent<HTMLInputElement>,
    email: string
  ) => {
    event.preventDefault();
    const isVerified = await verifyEmail(email);
    if (isVerified) {
      await sendConfirmEmail(email).then(() => {
        setAuth({
          ...auth,
          isEmailVerified: true,
        });
      });
    }
  };

  const sendConfirmEmail = async (email: string) => {
    axios.fetch({
      method: "POST",
      url: `${BASEURL}/confirm-email`,
      data: { email: email },
    });
  };

  const setupPassword = async (
    event: DOMEvent<HTMLInputElement>,
    credential: credential
  ) => {
    event.preventDefault();
    axios.fetch({
      method: "POST",
      url: `${BASEURL}/complete-signup`,
      data: { email: credential.email, password: credential.password },
    });

    if (axios.response) {
      setAuth({
        ...auth,
        isPasswordUpdated: true,
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setAuth({ ...auth, loggedIn: false });
  };

  const googleLoginSuccess = (response: any) => {
    console.log(response);
    axios.fetch({
      method: "POST",
      url: `${BASEURL}/oauth`,
      data: {
        type: "google",
        id_token: response.tokenId,
      },
    });

    if (!axios.error && axios.response) {
      sessionStorage.setItem("user", JSON.stringify(axios.response));
      setAuth({ ...auth, loggedIn: true });
      history.push("/main");
    }

    if (axios.error) {
      // from api server
      console.error(axios.error);
      setAuth({ ...auth, errorMsg: axios.error.toString() });
    }
  };

  const googleLoginFailure = (error: any) => {
    console.error(error);
    setAuth({ ...auth, errorMsg: error.message });
  };

  const msLoginHandler = async (instance: any) => {
    let response;
    try {
      response = await instance.loginPopup(loginRequest);
    } catch (error: any) {
      console.error(error);
      setAuth({ ...auth, errorMsg: error.message });
    }

    if (response) {
      axios.fetch({
        method: "POST",
        url: `${BASEURL}/oauth`,
        data: {
          type: "ms",
          id_token: response.idToken,
          email: response.account.username,
        },
      });

      if (!axios.error && axios.response) {
        sessionStorage.setItem("user", JSON.stringify(axios.response));
        setAuth({ ...auth, loggedIn: true });
        history.push("/main");
      }

      if (axios.error) {
        console.error(axios.error);
        setAuth({ ...auth, errorMsg: axios.error.toString() });
      }
    }
  };

  // const appleLoginHandler = async (response: any) => {
  //   if (!response.authorization) {
  //     setAuth({
  //       ...auth,
  //       errorMsg: "Something went wrong. Try another account.",
  //     });
  //   }

  //   await axios.fetch({
  //     method: "POST",
  //     url: `${BASEURL}/oauth`,
  //     data: {
  //       type: "apple",
  //       id_token: response.authorization.id_token,
  //       email: response.user.email, // email is only provided just once
  //     },
  //   });

  //   if (!axios.error && axios.response) {
  //     sessionStorage.setItem("user", JSON.stringify(axios.response));
  //     setAuth({ ...auth, loggedIn: true });
  //     history.push("/main");
  //   }

  //   if (axios.error) {
  //     console.error(axios.error);
  //     setAuth({ ...auth, errorMsg: axios.error.toString() });
  //   }
  // };

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
    //    appleLoginHandler,
  };
}
