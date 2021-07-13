import React from "react";
import Logo from "./Logo";
import Button from "./Button";

const Header = (props: any) => {
  const bgColor = props.color === "transparent" ? "transparent" : "white"; 
  const boxShadow = bgColor === "transparent" ? "boxShadow" : "";
  const style = `m-0 p-4 sticky flex justify-end bg-${bgColor} shadow ${boxShadow} font-krona`;
  
  return (<div className={style}>
    <Logo />
    <Button click={props.logIn} value="Log in" color="transparent" width="24" height="8" />
    <Button click={props.signUp} value="Sign up" color="blue" width="24" height="8" />
  </div>);
};

export default Header;
