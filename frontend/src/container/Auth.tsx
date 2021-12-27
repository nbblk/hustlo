import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/use-auth";

const Auth = (props: any) => {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation<{ email?: string | undefined }>();

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
    errorMsg: "",
  });

  const [modal, setModal] = useState({
    isVerifyEmailSent: false,
    isPasswordUpdated: false,
    isRecoveryEmailSent: false,
    isSignupCompleted: false,
  });

  const validateEmail = (email: string | undefined) => {
    let value = typeof email === "undefined" ? "" : email;
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
      email: { value: "", valid: false },
      password: { value: "", valid: false },
    });
    setModal({
      ...modal,
      isVerifyEmailSent: false,
      isPasswordUpdated: false,
      isRecoveryEmailSent: false,
      isSignupCompleted: false,
    });
    history.replace("/login");
  };

  useEffect(() => {
    if (auth.isVerifyEmailSent) {
      setModal({
        ...modal,
        isVerifyEmailSent: true,
        isPasswordUpdated: false,
        isRecoveryEmailSent: false,
        isSignupCompleted: false,
      });
    }

    if (auth.isPasswordUpdated) {
      setModal({
        ...modal,
        isPasswordUpdated: true,
        isVerifyEmailSent: false,
        isRecoveryEmailSent: false,
        isSignupCompleted: true,
      });
    }

    if (auth.isRecoveryEmailSent) {
      setModal({
        ...modal,
        isRecoveryEmailSent: true,
        isPasswordUpdated: false,
        isVerifyEmailSent: false,
        isSignupCompleted: false,
      });
    }

    if (auth.errorMsg) {
      setAccount({ ...account, errorMsg: auth.errorMsg });
    }
  }, [auth]);

  useEffect(() => {
    setAccount({
      email: { value: "", valid: false },
      password: { value: "", valid: false },
      valid: false,
      errorMsg: "",
    });
  }, [props.type]);

  useEffect(() => {
    const getEmailFromRoute = () => {
      let email;
      try {
        if (props.type === "signup" && location.state.email) {
          email = location.state.email;
        }
      } catch (error: any) {
        email = "";
      } finally {
        validateEmail(email);
      }
    };
    getEmailFromRoute();
  }, []);

  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
      {auth.loading ? <Loader loading /> : null}
      {modal.isVerifyEmailSent ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"Almost finished!"}
          content={
            "We sent a confirmation email to you. Please check your inbox"
          }
          buttonValue="Got it"
          buttonClick={() => modalHandler()}
          dismiss={() =>
            setModal({
              ...modal,
              isPasswordUpdated: false,
              isRecoveryEmailSent: false,
              isVerifyEmailSent: false,
              isSignupCompleted: false,
            })
          }
        />
      ) : null}
      {modal.isPasswordUpdated ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"All things done!"}
          content={"Please login with your email and new password"}
          buttonValue="Got it"
          buttonClick={() => modalHandler()}
          dismiss={() =>
            setModal({
              ...modal,
              isPasswordUpdated: false,
              isRecoveryEmailSent: false,
              isVerifyEmailSent: false,
              isSignupCompleted: false,
            })
          }
        />
      ) : null}
      {modal.isRecoveryEmailSent ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title={"Recovery link sent"}
          content={"We sent a recovery link to you. Please check your inbox"}
          buttonValue="Got it"
          buttonClick={() => modalHandler()}
          dismiss={() =>
            setModal({
              ...modal,
              isPasswordUpdated: false,
              isRecoveryEmailSent: false,
              isVerifyEmailSent: false,
              isSignupCompleted: false,
            })
          }
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
        submitEmail={(event: FormEvent<HTMLButtonElement>) =>
          auth.requestEmailVerification(event, account.email.value)
        }
        sendRecoveryEmail={(event: FormEvent<HTMLButtonElement>) =>
          auth.sendRecoveryEmail(event, account.email.value)
        }
        setupPassword={(event: FormEvent<HTMLButtonElement>) =>
          auth.setupPassword(event, {
            email: account.email.value,
            password: account.password.value,
          })
        }
        login={(event: FormEvent<HTMLButtonElement>) =>
          auth.basicLogin(event, {
            email: account.email.value,
            password: account.password.value,
          })
        }
        errorMsg={account.errorMsg}
        googleSuccess={(response: any) => auth.googleLoginSuccess(response)}
        googleFailure={(error: any) => auth.googleLoginFailure(error)}
        msLoginHandler={(response: any) => auth.msLoginHandler(response)}
      />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
