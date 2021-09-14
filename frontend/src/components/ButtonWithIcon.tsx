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
  iconProp: IconProp | null;
  isCircle: boolean;
  opacity?: string;
  bgColor?: string;
  click?: (event?: React.MouseEvent) => void;
};

const ButtonWithIcon = (props: buttonProps) => {
  const style = 
  `m-${props.margin} 
  p-${props.padding} 
  w-${props.width}
  h-${ props.height} 
  ${props.isCircle ? "rounded-full" : "rounded"} 
  ${props.bgColor ? props.bgColor : "bg-white"} 
  ${props.opacity ? props.opacity : "bg-opacity-25"} 
  ${props.textColor} 
  text-${props.fontSize} 
  text-center`;

  return (
    <button className={style} onClick={props.click}>
      {props.isIcon ? (
        <FontAwesomeIcon icon={props.iconProp!} color={props.textColor} className="mx-1"/>
      ) : null}
      {props.value ? props.value : null}
    </button>
  );
};

export default ButtonWithIcon;
