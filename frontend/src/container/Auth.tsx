import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { VerifaliaRestClient } from "verifalia";

import AuthForm from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Logo from "../components/Logo";

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

const Auth = (props: any) => {
  const [email, setEmail] = useState({
    address: "",
    valid: false,
    verified: false,
  });

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
      setEmail({ ...email, verified: true });
      alert("We will send you an email! Please check your inbox");
      sendConfirmEmail();
    } else {
      setEmail({ ...email, address: "" });
      alert("Please enter a valid email address:)");
    }
  };

  const sendConfirmEmail = () => {};

  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
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
      />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
