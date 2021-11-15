import {
  faArchive,
  faPaperclip,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import ButtonWithIcon from "../ButtonWithIcon";

interface SideMenuProps {
  clickLabelButton: () => void;
  clickAttachmentButton: () => void;
  clickArchiveButton: () => void;
}

const SideMenu = (props: SideMenuProps) => (
  <div className="w-1/4 h-1/2 flex flex-col justify-start item-end">
    <ButtonWithIcon
      width={"full"}
      height={"8"}
      margin={"2"}
      padding={"0"}
      value={"Labels"}
      textColor={"gray-dark"}
      bgColor={"bg-gray"}
      fontSize={"sm"}
      iconProp={faTag}
      isIcon={true}
      click={props.clickLabelButton}
    />
    <ButtonWithIcon
      width={"full"}
      height={"8"}
      margin={"2"}
      padding={"0"}
      value={"Attachments"}
      textColor={"gray-dark"}
      bgColor={"bg-gray"}
      fontSize={"sm"}
      iconProp={faPaperclip}
      isIcon={true}
      click={props.clickAttachmentButton}
    />
    <ButtonWithIcon
      width={"full"}
      height={"8"}
      margin={"2"}
      padding={"0"}
      value={"Archive"}
      textColor={"gray-dark"}
      bgColor={"bg-gray"}
      fontSize={"sm"}
      iconProp={faArchive}
      isIcon={true}
      click={props.clickArchiveButton}
    />
  </div>
);

export default SideMenu;
