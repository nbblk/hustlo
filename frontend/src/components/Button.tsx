import React from "react";

export interface ButtonProps {
  height: string,
  width: string,
  marginX?: string,
  marginY?: string,
  disabled?: boolean,
  bordered?: boolean,
  borderColor?: string,
  bgColor: string,
  textColor: string,
  hoverColor: string,
  textSize?: string,
  click?: (event: React.MouseEvent<HTMLButtonElement>, data?: any) => void,
  value: string
}

const Button = (props: ButtonProps) => {
  const isBordered = props.bordered ? "border" : "";
  const style = 
  `h-${props.height} 
  w-${props.width} 
  mx-${props.marginX} 
  my-${props.marginY} 
  rounded 
  bg-${props.disabled ? "gray-lightest" : props.bgColor} 
  text-${props.disabled ? "gray-dark" : props.textColor} 
  hover:${props.disabled ? "gray-light" : `bg-${props.hoverColor}`} 
  ${isBordered} border-${props.borderColor} 
  text-${props.textSize ? props.textSize : "md"} cursor-${props.disabled ? "not-allowed" : "pointer"}
  `;
  return (
    <button
      className={style}
      onClick={props.click}
      disabled={props.disabled ? true : false}
    >
      {props.value}
    </button>
  );
};

export default Button;
