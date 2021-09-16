import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderProps = {
  title: string;
  click: () => void;
};

const ContextPopupHeader = (props: HeaderProps) => {
  return (
    <div className="flex justify-between">
      <h3>{props.title}</h3>
      <span className="cursor-pointer" onClick={props.click}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
};

export default ContextPopupHeader;
