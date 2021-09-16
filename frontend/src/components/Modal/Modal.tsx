import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Backdrop from "./Backdrop";

interface ModalProps {
  width: string;
  height: string;
  title: string;
  dismiss: () => void;
  children: ReactNode
};

const Modal = (props: ModalProps) => {
  return (
    <>
      <Backdrop dismiss={props.dismiss}/>
      <div
        className={`w-${props.width} h-${props.height} absolute top-1/2 left-1/2 p-4 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-white rounded shadow boxShadow`}
      >
        <div className="flex justify-between">
          <h1 className="text-lg my-4">{props.title}</h1>
          <span className="cursor-pointer" onClick={props.dismiss}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
