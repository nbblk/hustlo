import { ChangeEvent, MouseEvent, useState } from "react";
import Button from "../Button";
import { LabelType } from "../Card/Label";
import Labels from "../Card/Labels";
import Modal from "./Modal";

interface LabelModalProps {
  isMain: boolean;
  isEdit: boolean;
  isAdd: boolean;
  labels?: LabelType[];
  clickLabelColor: (index: number, color: string) => void;
  clickEditLabelTitleIcon: (event: MouseEvent<HTMLSpanElement>) => void;
  changeOldLabelTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  clickEditLabelTitleButton: (index: number, title: string) => void;
  clickAddNewLabelButton: () => void;
  submitAddNewLabelButton: (index: number, title: string) => void;
  dismiss: () => void;
  goBack: () => void;
}

const LabelModal = (props: LabelModalProps) => {
  const [label, setLabel] = useState({
    index: 0,
    title: "",
    color: "",
  });

  const changeNewLabelTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setLabel({ ...label, title: event.target.value });
  };

  const clickNewLabelColor = (color: string, index: number | undefined) => {
    if (index === undefined) return;

    setLabel({ ...label, index: index, color: color });
  };

  const buttonHandler = () => {
    let button;
    if (props.isEdit) {
      button = (
        <Button
          height={"9"}
          width={"full"}
          bgColor={"gray-lightest"}
          textColor={"gray-dark"}
          hoverColor={"opacity-25"}
          value={"Save"}
          click={() =>
            props.clickEditLabelTitleButton(label.index, label.title)
          }
        />
      );
    } 
    if (props.isAdd) {
      button = (
        <Button
          height={"9"}
          width={"full"}
          bgColor={"gray-lightest"}
          textColor={"gray-dark"}
          hoverColor={"opacity-25"}
          value={"Create new label"}
          click={() => props.submitAddNewLabelButton(label.index, label.title)}
        />
      );
    } 
    if (props.isMain) {
      button = (
        <Button
          height={"9"}
          width={"full"}
          bgColor={"gray-lightest"}
          textColor={"gray-dark"}
          hoverColor={"opacity-25"}
          value={"Create new label"}
          click={props.clickAddNewLabelButton}
        />
      );
    }
    return button;
  };

  return (
    <Modal
      styles={
        "absolute p-4 top-28 right-1/3 transform translate-x-1/2 translate-y-1/2"
      }
      width={"1/5"}
      height={"1/2"}
      zIndex={"50"}
      title={""}
      dismiss={props.dismiss}
      goBack={props.goBack}
      goBackEnabled={props.isEdit || props.isAdd ? true : false}
    >
      <h6 className="text-xs">LABELS</h6>
      <Labels
        isEdit={props.isEdit}
        isAdd={props.isAdd}
        isMain={props.isMain}
        labels={props.labels ? props.labels : []}
        clickLabelColor={(index: number, color: string) =>
          props.clickLabelColor(index, color)
        }
        clickEditLabelTitleIcon={props.clickEditLabelTitleIcon}
        clickNewLabelColor={(color: string, index: number) =>
          clickNewLabelColor(color, index)
        }
        changeOldLabelTitle={props.changeOldLabelTitle}
        changeNewLabelTitle={(event: ChangeEvent<HTMLInputElement>) =>
          changeNewLabelTitle(event)
        }
      />
      {buttonHandler()}
    </Modal>
  );
};

export default LabelModal;
