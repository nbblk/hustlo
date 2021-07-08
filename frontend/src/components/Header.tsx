import React from "react";
import Logo from "./Logo";
import Button from "./Button";

const Header = (props: any) => {
  const bgColor = props.color === "transparent" ? "transparent" : "white"; 
  const boxShadow = bgColor === "transparent" ? "boxShadow" : "";
  const style = `m-0 p-4 sticky flex justify-end bg-${bgColor} shadow ${boxShadow} font-krona`;
  
  return (<div className={style}>
    <Logo />
    <Button click={props.logIn} value="Log in" color="transparent" />
    <Button click={props.signUp} value="Sign up" color="blue" />
  </div>);
};

export default Header;
