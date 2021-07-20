import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { VerifaliaRestClient } from "verifalia";

import AuthForm from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Modal from "../components/Modal";

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

const Auth = (props: any) => {
  const [email, setEmail] = useState({
    address: "",
    valid: false,
    verified: false,
    loading: false,
    error: false,
  });

  const history = useHistory();

  const VERIFALIA_USERNAME = process.env.REACT_APP_VERIFALIA_USERNAME!;
  const VERIFALIA_PASSWORD = process.env.REACT_APP_VERIFALIA_PASSWORD!;

  const emailHandler = (event: DOMEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/\S+@\S+\.\S+/.test(inputValue)) {
      setEmail({ ...email, address: inputValue, valid: true });
    } else {
      setEmail({ ...email, address: "", valid: false });
    }
  };

  const requestEmailVerification = async (
    event: DOMEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setEmail({ ...email, loading: true });
    const verifalia = new VerifaliaRestClient({
      username: VERIFALIA_USERNAME,
      password: VERIFALIA_PASSWORD,
    });

    const isVerified = await verifalia.emailValidations.submit(
      email.address,
      true
    );
    const result = isVerified!.entries[0];
    if (
      result.status === "Success" &&
      result.classification === "Deliverable"
    ) {
      setEmail({ ...email, verified: true, loading: false });
      sendConfirmEmail();
    } else {
      setEmail({ ...email, address: "", loading: false, error: true });
    }
  };

  const sendConfirmEmail = () => {};

  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
      {email.loading ? <Loader /> : null}
      {email.verified ? (
        <Modal
          height="full md:h-1/4"
          width="full md:w-1/4"
          title="Almost finished!"
          content="We sent a confirmation email to you. Please check your inbox"
          buttonValue="Got it"
          buttonClick={() => history.goBack()}
        />
      ) : null}
      <div className="absolute top-20 transform -translate-x-32">
        <Logo textSize="5xl" />
      </div>
      <AuthForm
        type={props.type}
        checkEmail={(event: DOMEvent<HTMLInputElement>) => emailHandler(event)}
        validEmail={email.valid}
        submitEmail={(event: DOMEvent<HTMLInputElement>) =>
          requestEmailVerification(event)
        }
        error={email.error}
        errorMsg="Please enter a valid email address"
      />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
