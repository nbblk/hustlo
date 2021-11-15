import { MouseEvent } from "react";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LabelProps {
  index: number;
  label: LabelType;
  selectLabelColor: () => void;
  clickEditLabelTitleIcon: (event: MouseEvent<HTMLSpanElement>) => void;
}

export type LabelType = {
  color: string;
  title?: string;
  checked?: boolean;
};

const Label = (props: LabelProps) => (
  <div className="w-full h-full flex justify-center items-center">
    <div
      className={`w-full h-8 p-2 flex justify-between items-center bg-${props.label.color} rounded cursor-pointer hover:opacity-25`}
      onClick={props.selectLabelColor}
    >
      <span className="text-white">{props.label.title}</span>
      <span className={`${props.label.checked ? "block" : "hidden"}`}>
        <FontAwesomeIcon icon={faCheck} color="white" />
      </span>
    </div>
    <span data-index={props.index} onClick={props.clickEditLabelTitleIcon}>
      <FontAwesomeIcon icon={faPencilAlt} className="mx-2 cursor-pointer" />
    </span>
  </div>
);

export default Label;
