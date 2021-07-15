import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";

const Header = (props: any) => {
  const bgColor = props.color === "transparent" ? "transparent" : "white";
  const boxShadow = bgColor === "transparent" ? "boxShadow" : "";
  const style = `w-screen m-0 p-4 sticky z-50 top-0 flex justify-end bg-${bgColor} shadow ${boxShadow} font-krona`;

  return (
    <nav className={style}>
      <Logo />
      <Link to="/login">
        <Button
          click={props.logIn}
          width="32"
          height="8"
          color="transparent"
          textColor="blue"
          textSize="md"
          value="Log in"
        />
      </Link>
      <Link to="/signup">
        <Button
          click={props.signUp}
          width="32"
          height="8"
          color="blue"
          borderColor="transparent"
          textColor="white"
          textSize="md"
          value="Sign up"
        />
      </Link>
    </nav>
  );
};

export default Header;
