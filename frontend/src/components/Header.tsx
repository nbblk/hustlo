import React from "react";
import Logo from "./Logo";
import Button from "./Button";

const Header = (props: any) => {
  const bgColor = props.color === "transparent" ? "transparent" : "white"; 
  const style = `m-0 p-4 sticky flex justify-end bg-${bgColor} font-krona`;
  
  return (<div className={style}>
    <Logo />
    <Button click={props.logIn} value="Log in" color="blue" />
    <Button click={props.signUp} value="Sign up" color="white" />
  </div>);
};

export default Header;
