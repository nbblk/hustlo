import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/use-auth";
import useAxios from "../hooks/use-axios";

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
  const location = useLocation<{ email?: string | undefined }>();
  const auth = useAuth();
  const axios = useAxios();

  const validateEmail = (email: string | undefined) => {
    let value = typeof email === undefined ? "" : email;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(value!)) {
      setAccount({ ...account, email: { value: value!, valid: true } });
    } else {
      setAccount({ ...account, email: { value: value!, valid: false } });
    }
  };

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    validateEmail(inputValue);
  };

  const passwordHandler = async (event: ChangeEvent<HTMLInputElement>) => {
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
  }, [auth, account]);

  useEffect(() => {
    const getEmailFromRoute = () => {
      let email;
      try {
        if (props.type === "signup" && location.state.email) {
          email = location.state.email;
        }          
      } catch (error: any) { // ReferenceError
        email = ""
      } finally {
        validateEmail(email);
      }
    };
    getEmailFromRoute();
  }, []);

  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
      {axios.loading ? <Loader loading /> : null}
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
      <AuthForm
        type={props.type}
        emailValue={account.email.value}
        passwordValue={account.password.value}
        checkEmail={(event: ChangeEvent<HTMLInputElement>) =>
          emailHandler(event)
        }
        checkPassword={(event: ChangeEvent<HTMLInputElement>) =>
          passwordHandler(event)
        }
        isPwdValid={account.password.valid}
        isEmailValid={account.email.valid}
        isAllValid={account.valid}
        //  submitEmail={(event: DOMEvent<HTMLInputElement>) =>   auth.requestEmailVerification(event, account.email.value)}
        // setupPassword={(event: DOMEvent<HTMLInputElement>) =>
        //   auth.setupPassword(event, {
        //     email: account.email.value,
        //     password: account.password.value,
        //   })
        // }
        login={(event: FormEvent<HTMLInputElement>) =>
          auth.basicLogin(event, {
            email: account.email.value,
            password: account.password.value,
          })
        }
        errorMsg={auth.errorMsg}
        googleSuccess={(response: any) => auth.googleLoginSuccess(response)}
        googleFail={(error: any) => auth.googleLoginFailure(error)}
        msLoginHandler={(response: any) => auth.msLoginHandler(response)}
        // appleLoginHandler={(response: any) => auth.appleLoginHandler(response)}
      />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
