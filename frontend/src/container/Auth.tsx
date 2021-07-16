import React, { useState } from "react";
import Form from "../components/AuthForm";
import Footer from "../components/Landing/Footer";
import Logo from "../components/Logo";

const Auth = (props: any) => {
  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest flex justify-center items-center">
      <div className="absolute top-20 transform -translate-x-32">
        <Logo textSize="5xl" />
      </div>
      <Form type={props.type} />
      <div className="absolute bottom-4">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
