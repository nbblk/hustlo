import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

type buttonProps = {
  width: string;
  height: string;
  margin: string;
  padding: string;
  value: string;
  textColor: string;
  fontSize: string;
  isIcon: boolean;
  iconProp?: IconProp | null;
  iconColor?: string;
  isCircle?: boolean;
  opacity?: string;
  bgColor?: string;
  border?: boolean;
  borderColor?: string;
  click?: (event?: React.MouseEvent) => void;
};

const ButtonWithIcon = (props: buttonProps) => {
  const style = `m-${props.margin} 
  p-${props.padding} 
  w-${props.width}
  h-${props.height} 
  ${props.isCircle ? "rounded-full" : "rounded"} 
  bg-${props.bgColor ? props.bgColor : "white"} 
  ${props.border ? "border" : ""}
  ${props.borderColor ? ` border-${props.borderColor}` : ""}
  bg-${props.opacity ? props.opacity : "opacity-25"}
  ${props.textColor} 
  text-${props.fontSize} 
  text-center`;

  return (
    <button className={style} onClick={props.click}>
      {props.isIcon ? (
        <FontAwesomeIcon
          icon={props.iconProp!}
          color={props.textColor}
          className="mx-1"
        />
      ) : null}
      {props.value ? props.value : null}
    </button>
  );
};

export default ButtonWithIcon;
