import React, { useState } from "react";
import Form from "../components/AuthForm";
import Logo from "../components/Logo";

const Auth = (props: any) => {
  return (
    <div className="w-screen h-screen m-0 p-0 bg-gray-lightest">
      <Logo />
      <Form type={props.type} />
    </div>
  );
};

export default Auth;
