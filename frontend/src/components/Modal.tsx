import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

export interface ModalProps {
  width: string;
  height: string;
  title: string;
  content: string;
  buttonValue: string;
  dismiss: () => void;
  buttonClick: (event: React.MouseEvent<HTMLButtonElement> | void) => void;
}

const Modal = (props: any) => {
  return (
    <div
      className={`w-${props.width} h-${props.height} p-4 top-1/2 left-1/2 absolute flex flex-col justify-around md:justify-between items-center transform -translate-x-1/2 -translate-y-1/2 z-40 bg-white rounded border border-gray-lightest shadow drop-shadow-lg transition transition-all`}
    >
      <FontAwesomeIcon
        icon={faTimes}
        className="self-end cursor-pointer"
        onClick={props.dismiss}
      />
      <h1 className="font-krona text-2xl md:text-xl">{props.title}</h1>
      <p className="font-nunito text-lg md:text-sm">{props.content}</p>
      <Button
        bgColor="blue"
        textColor="white"
        hoverColor="blue hover:opacity-25"
        width="full md:w-2/5"
        height="10"
        disabled={false}
        value={props.buttonValue}
        click={props.buttonClick}
      />
    </div>
  );
};

export default Modal;
