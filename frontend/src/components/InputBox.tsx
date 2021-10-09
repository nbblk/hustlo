import { ChangeEvent } from "react";

type InputBoxProps = {
  type: string;
  height: string;
  width: string;
  marginX?: string;
  marginY?: string;
  border?: boolean;
  borderColor?: string;
  placeholder: string;
  display?: string;
  value?: string;
  disabled?: boolean;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputBox = (props: InputBoxProps) => {
  const style = `
  ${props.display!} 
  ${props.border ? props.border : "border"} 
  ${props.borderColor ? props.borderColor : "border-gray-lightest"} 
  h-${props.height} 
  w-${props.width} 
  mx-${props.marginX} 
  my-${props.marginY} 
  p-2 rounded font-xs`;
  
  return (
    <input
      type={props.type}
      autoComplete={props.type === "password" ? "current-password" : ""}
      className={style}
      placeholder={props.placeholder}
      defaultValue={props.value}
      disabled={props.disabled ? props.disabled: false}
      onChange={props.change}
    />
  );
};

export default InputBox;
