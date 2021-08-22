import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/use-auth";

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
    modal: false,
  });

  const history = useHistory();
  const auth = useAuth();

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

  const modalHandler = () => {
    setAccount({
      ...account,
      modal: false,
      email: { value: "", valid: false },
      password: { value: "", valid: false },
    });
    history.replace("/login");
  };

  useEffect(() => {
    if (auth.isPasswordUpdated || auth.isEmailVerified) {
      setAccount({ ...account, modal: true });
    }
  }, [auth]);

  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
      {auth.loading ? <Loader loading /> : null}
      {account.modal && auth.isPasswordUpdated ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"All things done!"}
          content={"Please login with your email and new password"}
          buttonValue="Got it"
          buttonClick={() => modalHandler()}
        />
      ) : null}
      {account.modal && auth.isEmailVerified ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"Almost finished!"}
          content={
            "We sent a confirmation email to you. Please check your inbox"
          }
          buttonValue="Got it"
          buttonClick={() => modalHandler()}
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
          auth.requestEmailVerification(event, account.email.value)
        }
        setupPassword={(event: DOMEvent<HTMLInputElement>) =>
          auth.setupPassword(event, {
            email: account.email.value,
            password: account.password.value,
          })
        }
        login={(event: DOMEvent<HTMLInputElement>) =>
          auth.basicLogin(event, {
            email: account.email.value,
            password: account.password.value,
          })
        }
        error={auth.error}
        errorMsg={auth.errorMsg}
        googleSuccess={(response: any) => auth.googleLoginSuccess(response)}
        googleFail={(error: any) => auth.googleLoginFailure(error)}
        msLoginHandler={(response: any) => auth.msLoginHandler(response)}
        appleLoginHandler={(response: any) => auth.appleLoginHandler(response)}
      />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
