import { faPaperclip, faTag } from "@fortawesome/free-solid-svg-icons";
import ButtonWithIcon from "../ButtonWithIcon";

const SideMenu = () => (
  <div className="w-1/4 h-full flex flex-col justify-start item-end">
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
    />
  </div>
);

export default SideMenu;
