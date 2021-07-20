import { useHistory } from "react-router-dom";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

const Modal = (props: any) => {
  const history = useHistory();

  return (
    <div
      className={`w-${props.width} h-${props.height} p-4 top-1/2 left-1/2 absolute flex flex-col justify-between items-center transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded border border-gray-lightest shadow drop-shadow-lg transition transition-all`}
    >
      <FontAwesomeIcon
        icon={faTimes}
        className="self-end cursor-pointer"
        onClick={() => history.goBack()}
      />
      <h1 className="font-krona text-xl">{props.title}</h1>
      <p className="font-nunito text-sm">{props.content}</p>
      <Button
        color="blue"
        textColor="white"
        width="full md:w-1/5"
        height="10"
        disabled={false}
        value={props.buttonValue}
        click={props.buttonClick}
      />
    </div>
  );
};

export default Modal;
