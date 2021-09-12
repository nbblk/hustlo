import { ChangeEvent } from "react";

type InputBoxProps = {
  type: string;
  height: string;
  width: string;
  marginX?: string;
  marginY?: string;
  placeholder: string;
  display?: string;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const InputBox = (props: InputBoxProps) => {
  const style = `${props.display!} border border-gray-lightest h-${
    props.height
  } w-${props.width} mx-${props.marginX} my-${
    props.marginY
  } p-2 rounded font-xs`;
  return (
    <input
      type={props.type}
      autoComplete={props.type === "password" ? "current-password" : ""}
      className={style}
      placeholder={props.placeholder}
      onChange={props.change}
      defaultValue={props.value}
    />
  );
};

export default InputBox;
