import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Backdrop from "./Backdrop";

type ModalProps = {
  width: string;
  height: string;
  title: string;
};

const Modal: React.FC<ModalProps> = ({ width, height, title, children }) => {
  return (
    <>
      <Backdrop />
      <div
        className={`w-${width} h-${height} absolute top-1/2 left-1/2 p-4 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-white rounded shadow boxShadow`}
      >
        <div className="flex justify-between">
          <h1 className="text-lg my-4">{title}</h1>
          <span>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
