import { ReactNode } from "react";
import Backdrop from "./Backdrop";
import ModalHeader from "./ModalHeader";

interface ModalProps {
  width: string;
  height: string;
  title: string;
  zIndex?: string;
  bgColor?: string;
  children: ReactNode;
  goBackEnabled?: boolean;
  backdropDisabled?: boolean;
  styles?: string;
  dismiss: () => void;
  goBack?: () => void;
}

const Modal = (props: ModalProps) => {
  let defaultStyle = "absolute h-auto top-1/2 left-1/2 p-4 z-40 transform -translate-x-1/2 -translate-y-1/2";
  return (
    <>
      {props.backdropDisabled ? null : <Backdrop dismiss={props.dismiss} />}
      <div
        className={`${props.styles ? props.styles : defaultStyle} w-${props.width} h-${
          props.height
        } z-${
          props.zIndex ? props.zIndex : "40"
        } bg-${
          props.bgColor ? props.bgColor : "white"
        } rounded shadow boxShadow`}
      >
        <ModalHeader
          title={props.title}
          goBackEnabled={props.goBackEnabled}
          dismiss={props.dismiss}
          goBack={props.goBack}
        />
        {props.children}
      </div>
    </>
  );
};

export default Modal;
