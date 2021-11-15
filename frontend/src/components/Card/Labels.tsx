import { ChangeEvent, MouseEvent } from "react";
import InputBox from "../InputBox";
import ColorChip from "../Modal/ColorChip";
import Label, { LabelType } from "./Label";

interface LabelsProps {
  labels: LabelType[];
  isEdit: boolean;
  isAdd: boolean;
  isMain: boolean;
  clickLabelColor: (index: number, color: string) => void;
  clickEditLabelTitleIcon: (event: MouseEvent<HTMLSpanElement>) => void;
  clickNewLabelColor: (color: string, index: number) => void;
  changeOldLabelTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  changeNewLabelTitle: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Labels = (props: LabelsProps) => {
  let element = null;
  if (props.isEdit) {
    element = (
      <div className="relative flex flex-col justify-center itmes-center">
        <InputBox
          type={"text"}
          height={"9"}
          width={"full"}
          marginY={"4"}
          placeholder={"Enter the title..."}
          change={props.changeOldLabelTitle}
        />
      </div>
    );
  }

  if (props.isAdd) {
    element = (
      <div className="relative flex flex-col justify-center itmes-center">
        <InputBox
          type={"text"}
          height={"9"}
          width={"full"}
          marginY={"4"}
          placeholder={"Enter the title..."}
          change={props.changeNewLabelTitle}
        />
        <ul className="w-full flex flex-wrap">
          {props.labels.map((label: LabelType, index: number) =>
            !label.checked ? (
              <ColorChip
                key={index}
                color={label.color}
                click={() => props.clickNewLabelColor(label.color, index)}
              />
            ) : null
          )}
        </ul>
      </div>
    );
  }

  if (props.isMain) {
    element = (
      <ul className="my-4">
        {props.labels.map((label: LabelType, index: number) => (
          <li
            key={index}
            className="flex flex-row justify-around items-center my-2"
          >
            <Label
              index={index}
              label={label}
              selectLabelColor={() => props.clickLabelColor(index, label.color)}
              clickEditLabelTitleIcon={(event: MouseEvent<HTMLSpanElement>) =>
                props.clickEditLabelTitleIcon(event)
              }
            />
          </li>
        ))}
      </ul>
    );
  }
  return element;
};

export default Labels;
