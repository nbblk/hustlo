import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ListButtonProps {
  icon: IconProp;
  value: string;
  click: () => void;
}

const ListButton = (props: ListButtonProps) => (
  <div
    className="w-64 my-2 cursor-pointer hover:opacity-25"
    onClick={props.click}
  >
    <span>
      <FontAwesomeIcon icon={props.icon} className="mx-2" />
      {props.value}
    </span>
  </div>
);

export default ListButton;
