import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AuthForm from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Modal from "../components/Modal";
import { verifyEmail } from "../apis/auth";

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

const Auth = (props: any) => {
  const [account, setAccount] = useState({
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    valid: false,
    isEmailVerified: false,
    isPasswordUpdated: false,
    loading: false,
    error: false,
    errorMsg: "",
    modal: false,
  });

  const history = useHistory();

  const BASEURL = process.env.REACT_APP_BASEURL;

  const emailHandler = (event: DOMEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(inputValue)) {
      setAccount({ ...account, email: { value: inputValue, valid: true } });
    } else {
      setAccount({ ...account, email: { value: inputValue, valid: false } });
    }
  };

  const passwordHandler = async (event: DOMEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (inputValue.length > 8 && regex.test(inputValue)) {
      setAccount({ ...account, password: { value: inputValue, valid: true } });
    } else {
      setAccount({ ...account, password: { value: inputValue, valid: false } });
    }
  };

  const requestEmailVerification = async (
    event: DOMEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setAccount({
      ...account,
      email: { ...account.email },
      password: { ...account.password },
      loading: true,
    });
    const isVerified = await verifyEmail(account.email.value);
    if (isVerified) {
      await sendConfirmEmail()
        .then(() => {
          setAccount({
            ...account,
            email: { value: "", valid: false },
            password: { ...account.password },
            isEmailVerified: true,
            loading: false,
            modal: true,
          });
        })
        .catch((error) => {
          setAccount({
            ...account,
            email: { value: "", valid: false },
            password: { ...account.password },
            loading: false,
            error: true,
            errorMsg: error.message,
          });
        });
    }
  };

  const sendConfirmEmail = async () => {
    await axios
      .post(`${BASEURL}/confirm-email`, { email: account.email.value })
      .catch((reason: any) => {
        throw Error(reason.response.data);
      });
  };

  const setupPassword = async (event: DOMEvent<HTMLInputElement>) => {
    event.preventDefault();
    await axios
      .post(`${BASEURL}/complete-signup`, {
        email: account.email.value,
        password: account.password.value,
      })
      .then(() => {
        setAccount({
          ...account,
          email: { ...account.email },
          password: { ...account.password },
          isPasswordUpdated: true,
          modal: true,
        });
      })
      .catch((reason: any) => {
        console.error(JSON.stringify(reason));
      });
  };

  const login = (event: DOMEvent<HTMLInputElement>) => {
    event.preventDefault();
    axios
      .post(`${BASEURL}/login`, {
        email: account.email.value,
        password: account.password.value,
      })
      .then(() => {
        history.replace("/main");
      })
      .catch((reason: any) => {
        setAccount({
          ...account,
          email: { value: "", valid: false },
          password: { value: "", valid: false },
          error: true,
          errorMsg: reason.response.data,
        });
      });
  };

  const googleSuccess = async (response: any) => {
    await axios.post(`${BASEURL}/oauth`, {
      type: "google",
      id_token: response.id_token,
    });
    history.replace("/main");
  };

  const googleFail = (error: any) => {
    console.error(error);
    setAccount({
      ...account,
      modal: true,
      error: true,
      errorMsg: "Fail to connect Google acount",
    });
  };

  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
      {account.loading ? <Loader /> : null}
      {!account.error && account.isPasswordUpdated && account.modal ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"All things done!"}
          content={"Please login with your email and new password"}
          buttonValue="Got it"
          buttonClick={() => {
            setAccount({
              ...account,
              email: { ...account.email },
              password: { ...account.password },
              modal: false,
            });
            history.replace("/login");
          }}
        />
      ) : null}
      {!account.error && account.isEmailVerified && account.modal ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"Almost finished!"}
          content={
            "We sent a confirmation email to you. Please check your inbox"
          }
          buttonValue="Got it"
          buttonClick={() => {
            setAccount({
              ...account,
              email: { ...account.email },
              password: { ...account.password },
              modal: false,
            });
            history.goBack();
          }}
        />
      ) : null}
      <div className="absolute top-20 transform -translate-x-32">
        <Logo textSize="5xl" />
      </div>
      <AuthForm
        type={props.type}
        emailValue={account.email.value}
        passwordValue={account.password.value}
        checkEmail={(event: DOMEvent<HTMLInputElement>) => emailHandler(event)}
        checkPassword={(event: DOMEvent<HTMLInputElement>) =>
          passwordHandler(event)
        }
        isPwdValid={account.password.valid}
        isEmailValid={account.email.valid}
        isAllValid={account.valid}
        submitEmail={(event: DOMEvent<HTMLInputElement>) =>
          requestEmailVerification(event)
        }
        setupPassword={(event: DOMEvent<HTMLInputElement>) =>
          setupPassword(event)
        }
        login={(event: DOMEvent<HTMLInputElement>) => login(event)}
        error={account.error}
        errorMsg={account.errorMsg}
        googleSuccess={(response: any) => googleSuccess(response)}
        googleFail={(error: any) => googleFail(error)}
      />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
