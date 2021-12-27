import { ChangeEvent, MouseEvent } from "react";
import Button from "../Button";
import Modal from "../Modal/Modal";

interface AttahcmentProps {
  selectedFile: File | null;
  dismiss: () => void;
  changeFile: (event: ChangeEvent<HTMLInputElement>) => void;
  clickUploadButton: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AttachmentModal = (props: AttahcmentProps) => {
  return (
    <Modal
      width={"full md:w-1/5"}
      height={"full md:h-1/2"}
      zIndex={"50"}
      title={"Upload files"}
      dismiss={props.dismiss}
    >
      <input type="file" onChange={props.changeFile} name="File" />
      <div>
        <p>filename: {props.selectedFile?.name}</p>
        <p>size: {props.selectedFile?.size}</p>
        <p>lastModified: {props.selectedFile?.lastModified.toLocaleString()}</p>
      </div>
      <Button
        height={"8"}
        width={"20"}
        bgColor={"blue"}
        textColor={"gray-dark"}
        hoverColor={"opacity-25"}
        value={"Upload"}
        click={props.clickUploadButton}
      />
    </Modal>
  );
};

export default AttachmentModal;
