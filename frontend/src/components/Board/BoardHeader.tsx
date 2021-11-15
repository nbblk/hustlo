import {
  faArchive,
  faStar as filledStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import ButtonWithIcon from "../ButtonWithIcon";
import InputBox from "../InputBox";
import ArchivedModal from "../Modal/ArchivedModal";
import axios from "axios";
import ChangeWorkspaceMenu from "../ContextPopup/ChangeWorkspaceMenu";
import MoveBoardMenu from "../ContextPopup/MoveBoardMenu";

interface BoardHeaderProps {
  title: string;
  boardId: string;
  workspaceId: string;
  titleActive: boolean;
  archivedItemsActive: boolean;
  archivedLists?: [];
  archivedCards?: [];
  focusTitle: () => void;
  changeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  blurTitle: () => void;
  clickRestoreListButton: (index: number, listId: string) => void;
  clickRestoreCardButton: (
    index: number,
    listId: string,
    cardId: string
  ) => void;
  clickBoardToMove: () => void;
}

const BoardHeader = (props: BoardHeaderProps) => {
  const [star, setStared] = useState(false);
  const [modal, setModal] = useState({
    workspace: false,
    board: false,
    archived: false,
  });
  const [archived, setArchived] = useState({
    isCard: false,
    lists: [] as any,
    cards: [] as any,
    fetchLists: false,
    fetchCards: false,
  });

  const fetchArchivedLists = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    let result;
    try {
      result = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}/board/${props.boardId}/archived`,
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
          workspaceId: props.workspaceId,
        },
      });
      const curBoard = result.data[0];
      if (curBoard) {
        setArchived({ ...archived, lists: curBoard.lists, fetchLists: false });
      } else {
        setArchived({ ...archived, lists: [], fetchLists: false });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArchivedCards = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    let result;
    try {
      result = await axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}/card/archived/items`,
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
          workspaceId: props.workspaceId,
          boardId: props.boardId,
        },
      });
      const curBoard = result.data[0];
      if (curBoard) {
        setArchived({ ...archived, cards: curBoard.lists, fetchCards: false });
      } else {
        setArchived({ ...archived, cards: [], fetchCards: false });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (modal.archived && archived.isCard) {
      fetchArchivedCards();
    } else {
      fetchArchivedLists();
    }

    if (archived.fetchCards) {
      fetchArchivedCards();
    }
    if (archived.fetchLists) {
      fetchArchivedLists();
    }
  }, [
    modal.archived,
    archived.isCard,
    archived.fetchLists,
    archived.fetchCards,
  ]);

  return (
    <div className="w-screen h-14 p-4 bg-transparent flex justify-between items-center">
      <div className="flex relative">
        <span className="cursor-pointer" onClick={props.focusTitle}>
          <InputBox
            type={"text"}
            height={"10"}
            width={"40"}
            placeholder={props.title ? "" : "Enter board title"}
            value={props.title}
            change={props.changeTitle}
            blur={props.blurTitle}
            disabled={!props.titleActive}
          />
        </span>
        {/* <ButtonWithIcon
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
        /> */}
        <div className="relative">
          <Button
            height={"10"}
            width={"44"}
            marginX={"2"}
            bgColor={"gray-regular"}
            textColor={"gray"}
            hoverColor={"opacity-50"}
            value={"my side projects"}
            click={() =>
              setModal({ workspace: true, board: false, archived: false })
            }
          />
          {modal.workspace ? (
            <ChangeWorkspaceMenu
              dismiss={() => setModal({ ...modal, workspace: false })}
              workspaceId={props.workspaceId}
              boardId={props.boardId}
            />
          ) : null}
        </div>
        <div className="relative">
          <Button
            height={"10"}
            width={"44"}
            marginX={"2"}
            bgColor={"gray-regular"}
            textColor={"gray"}
            hoverColor={"opacity-50"}
            value={props.title}
            click={() =>
              setModal({ workspace: false, board: !modal.board, archived: false })
            }
          />
          {modal.board ? (
            <MoveBoardMenu workspaceId={props.workspaceId} clickBoardToMove={props.clickBoardToMove} />
          ) : null}
        </div>
      </div>
      <div className="relative">
        <ButtonWithIcon
          width={"44"}
          height={"10"}
          margin={"2"}
          padding={""}
          value={"Archived items"}
          textColor={"gray"}
          bgColor={"gray hover:opacity-25"}
          fontSize={""}
          isIcon={true}
          iconProp={faArchive}
          click={() => setModal({ ...modal, archived: !modal.archived })}
        />
        {modal.archived ? (
          <ArchivedModal
            isCard={archived.isCard}
            archivedLists={archived.lists}
            archivedCards={archived.cards}
            restoreList={(index: number, id: string) => {
              props.clickRestoreListButton(index, id);
              setArchived({ ...archived, fetchLists: true });
            }}
            switch={() =>
              setArchived({ ...archived, isCard: !archived.isCard })
            }
            dismiss={() => setModal({ ...modal, archived: false })}
            restoreCard={(index: number, listId: string, cardId: string) => {
              props.clickRestoreCardButton(index, listId, cardId);
              setArchived({ ...archived, fetchCards: true });
            }}
          />
        ) : null}
      </div>
      {/* {modal.board ? <div>board</div> : null} */}
    </div>
  );
};

export default BoardHeader;
