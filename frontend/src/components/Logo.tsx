import React from "react";

const Logo = (props: any) => {
  return (
    <div className="absolute flex align-center left-0 m-2">
      <img className="" alt="logo"></img>
      <span className={`ml-2 text-${props.textSize} font-krona`}>Hustlo</span>
    </div>
  );
};

export default Logo;
