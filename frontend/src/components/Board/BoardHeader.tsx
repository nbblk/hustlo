import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Button from "../Button";
import ButtonWithIcon from "../ButtonWithIcon";
import InputBox from "../InputBox";
import ContextPopupHeader from "../ContextPopup/ContextPropHeader";

const BoardHeader = (props: any) => {
  const [disabled, setDisabled] = useState(true);
  const [star, setStared] = useState(false);
  const [modal, setModal] = useState({
    workspace: false,
    board: false,
  });

  return (
    <div className="w-screen h-14 p-4 bg-transparent flex justify-start items-center">
      <span
        className="cursor-pointer"
        onClick={() => setDisabled(false)}
        onBlur={() => setDisabled(true)}
      >
        <InputBox
          type={"text"}
          height={"10"}
          width={"40"}
          placeholder={""}
          value={"default title"}
          change={props.changeTitle}
          disabled={disabled}
        />
      </span>
      <ButtonWithIcon
        width={"10"}
        height={"10"}
        margin={"0"}
        padding={"0"}
        value={""}
        textColor={"gray"}
        bgColor={"bg-gray-regular"}
        fontSize={"md"}
        isIcon={true}
        iconProp={star ? filledStar : emptyStar}
        isCircle={false}
        click={() => setStared(!star)}
      />
      <div className="relative">
      <Button
        height={"10"}
        width={"44"}
        marginX={"2"}
        bgColor={"gray-regular"}
        textColor={"gray"}
        hoverColor={"opacity-50"}
        value={"my side projects"}
        click={() => setModal({ workspace: true, board: false })}
      />
            {modal.workspace ? (
        <MoveToMenu
          title={"Change workspace"}
          dismiss={() => setModal({ ...modal, workspace: false })}
//          click={() => moveHandler()}
        >
        </MoveToMenu>
      ) : null}

      </div>
      <Button
        height={"10"}
        width={"44"}
        marginX={"2"}
        bgColor={"gray-regular"}
        textColor={"gray"}
        hoverColor={"opacity-50"}
        value={"board name"}
        click={() => setModal({ workspace: false, board: true })}
      />
      {modal.board ? <div>board</div> : null}
    </div>
  );
};

export default BoardHeader;

export const MoveToMenu = (props: any, children: any) => (
  <div className="absolute top-12 left-2 w-60 h-40 p-2 bg-white rounded shadow">
    <ContextPopupHeader title={props.title} click={props.dismiss} />
    {/* {children} */}
    <div className="h-2/3 flex flex-col justify-around items-center">
      <select className="w-full h-6 border"><option>1</option><option>2</option></select>
      <Button height={"6"} width={"full"} bgColor={"blue"} textColor={"white"} hoverColor={"opacity-25"} value={"Change"} click={props.click}/>  
    </div>
  </div>
);
