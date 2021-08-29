import { ChangeEvent, ChangeEventHandler } from "react";

type InputBoxProps = {
  type: string;
  height: string;
  width: string;
  marginX?: string;
  marginY?: string;
  placeholder: string;
  style?: string;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputBox = (props: InputBoxProps) => {
  const style = `border border-gray-lightest h-${props.height} w-${props.width} mx-${props.marginX} my-${props.marginY} p-2 rounded font-xs ${props.style}`;
  return (
    <input
      type={props.type}
      className={style}
      placeholder={props.placeholder}
      onChange={props.change}
    />
  );
};

export default InputBox;
