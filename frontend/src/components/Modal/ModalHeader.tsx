import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalHeaderProps {
  title: string;
  goBackEnabled?: boolean;
  dismiss: () => void;
  goBack?: () => void;
}

const ModalHeader = (props: ModalHeaderProps) => (
  <div className="flex justify-between">
    {props.goBackEnabled ? (
      <span className="absolute left-4 cursor-pointer" onClick={props.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
    ) : null}
    <h1 className="text-lg my-4">{props.title}</h1>
    <span className="cursor-pointer" onClick={props.dismiss}>
      <FontAwesomeIcon icon={faTimes} />
    </span>
  </div>
);

export default ModalHeader;
