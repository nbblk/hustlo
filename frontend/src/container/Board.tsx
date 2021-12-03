import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import Header from "../components/Header/Header";
import BoardHeader from "../components/Board/BoardHeader";
import List, { ListProps } from "../components/Board/List";
import Loader from "../components/Loader";
import CardModal from "../components/Modal/CardModal";
import { LabelType } from "../components/Card/Label";

type BoardProps = {
  _id: string;
  title: string;
  workspaceId: string;
  color: string;
  boardTitleActive: boolean;
  lists?: ListProps[] | any;
  current: number;
  update: boolean;
  updateList: boolean;
  fetch: boolean;
  loading: boolean;
  clickAddCard: boolean;
  curListId: string;
  curListIndex: number | undefined;
  cardTitle: string;
  cardTitleActive: boolean;
  cardOpen: boolean;
  curCardId: string;
  curCardTitle: string;
  labels: LabelType[];
  curLabelIndex: number | undefined;
  curLabelTitle: string;
  isMainLabel: boolean;
  isEditLabel: boolean;
  isAddLabel: boolean;
  archivedItemsActive: boolean;
  fetchArchivedItems: boolean;
  archivedLists?: any;
  restoreList: boolean;
  archiveCard: boolean;
  archivedCards?: any;
  previousDroppableId: string;
  currentDraggableId: string;
  currentDroppableId: string;
  currentDroppableIndex: number;
  reorderList: boolean;
};

export type CardType = {
  _id: string;
  title: string;
  description?: string;
  archived: boolean;
  labelsSelected?: LabelType[];
};

function Board(props: any) {
  const { workspaceId } = props.location.state;
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardProps>({
    _id: "",
    workspaceId: "",
    title: "",
    color: "",
    boardTitleActive: false,
    lists: [],
    current: 0,
    fetch: false,
    update: false,
    updateList: false,
    loading: false,
    clickAddCard: false,
    curListId: "",
    curListIndex: undefined,
    cardTitle: "",
    cardTitleActive: false,
    cardOpen: false,
    curCardId: "",
    curCardTitle: "",
    labels: [],
    curLabelIndex: undefined,
    curLabelTitle: "",
    isMainLabel: true,
    isEditLabel: false,
    isAddLabel: false,
    archivedItemsActive: false,
    fetchArchivedItems: false,
    archivedLists: [],
    restoreList: false,
    archiveCard: false,
    archivedCards: [],
    previousDroppableId: "",
    currentDraggableId: "",
    currentDroppableId: "",
    currentDroppableIndex: 0,
    reorderList: false,
  });

  // a little function to help us with reordering the result
  const reorderCard = (
    cards: CardType[],
    startIndex: number,
    endIndex: number
  ): CardType[] => {
    const result = Array.from(cards); // create a new array using cards
    const [removed] = result.splice(startIndex, 1); // create a new array using spliced(removed) elements.
    result.splice(endIndex, 0, removed); // fill the removed elements to the end?

    return result;
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    console.log(result);
    console.log(
      result.source.droppableId,
      result.destination.droppableId,
      result.draggableId,
      result.destination.index
    );
    let curList = board.lists
      ? board.lists.find((list: ListProps, index: number) => {
          if (list._id === result.source.droppableId) {
            setBoard({ ...board, current: index });
          }
          return list;
        })
      : null;

    const cardsOrdered: CardType[] = reorderCard(
      curList!.cards!,
      result.source.index,
      result.destination.index
    );

    curList!.cards = cardsOrdered;

    let newLists = [...board.lists!];
    newLists[board.current] = curList!;
    setBoard({
      ...board,
      lists: newLists,
      previousDroppableId: result.source.droppableId,
      currentDroppableId: result.destination.droppableId,
      currentDraggableId: result.draggableId,
      currentDroppableIndex: result.destination.index,
      reorderList: true,
    });
  };

  const updateLists = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);

    try {
      await axios.request({
        method: "PATCH",
        url: `${process.env.REACT_APP_BASEURL}/board/list/reorder`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          oldListId: board.previousDroppableId,
          newListId: board.currentDroppableId,
          newListIndex: board.currentDroppableIndex,
          cardId: board.currentDraggableId,
        },
      });
      setBoard({
        ...board,
        reorderList: false,
        previousDroppableId: "",
        currentDraggableId: "",
        currentDroppableId: "",
        currentDroppableIndex: 0,
      });
    } catch (error) {
      setBoard({
        ...board,
        reorderList: false,
        previousDroppableId: "",
        currentDraggableId: "",
        currentDroppableId: "",
        currentDroppableIndex: 0,
      });
      console.error(error);
    }
  };

  const changeBoardTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      return;
    }
    setBoard({ ...board, title: event.target.value });
  };

  const blurBoardTitle = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);

    try {
      await axios.request({
        method: "PUT",
        url: `${process.env.REACT_APP_BASEURL}/board/title`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          title: board.title,
        },
      });
      setBoard({ ...board, fetch: true, boardTitleActive: false });
    } catch (error) {
      console.error(error);
    }
  };

  const focusListTitle = (index: number) => {
    let newLists = [...board.lists!];
    newLists[index].active = true;
    setBoard({ ...board, lists: newLists });
  };

  const changeListTitle = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let listTitle = event.target.value;
    let newLists = [...board.lists];
    let newList = { ...board.lists[index], title: listTitle };
    newLists[index] = newList;
    setBoard({ ...board, lists: newLists, curListId: newList._id });
  };

  const blurListTitle = async (index: number) => {
    let newLists = [...board.lists];
    newLists[index].active = false;
    setBoard({ ...board, lists: newLists, curListIndex: index });
    let user = JSON.parse(sessionStorage.getItem("user")!);

    try {
      await axios.request({
        method: "PUT",
        url: `${process.env.REACT_APP_BASEURL}/list/title`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          listId: board.curListId,
          title: board.lists[index].title,
        },
      });
      setBoard({ ...board, fetch: true });
    } catch (error) {
      console.error(error);
    }
  };

  const addList = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);

    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/board/new`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
        },
      });
      setBoard({ ...board, fetch: true });
    } catch (error) {
      console.error(error);
    }
  };

  const archiveList = async (listId: string) => {
    let user = JSON.parse(sessionStorage.getItem("user")!);

    try {
      await axios.request({
        method: "PUT",
        url: `${process.env.REACT_APP_BASEURL}/board/archive`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          listId: listId,
        },
      });
      setBoard({ ...board, fetch: true });
    } catch (error) {
      console.error(error);
    }
  };

  const addCard = (listId: string) => {
    setBoard({
      ...board,
      clickAddCard: true,
      curListId: listId,
      cardTitleActive: true,
    });
  };

  const changeCardTitle = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.length < 0) return;

    setBoard({ ...board, cardTitle: value });
  };

  const blurCardTitle = async () => {
    setBoard({ ...board, cardTitleActive: !board.cardTitleActive });

    if (board.cardTitle.length > 0) {
      await createCard();
    }
  };

  const createCard = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/board/list/${board.curListId}`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          title: board.cardTitle,
        },
      });
      setBoard({
        ...board,
        curListId: "",
        cardTitle: "",
        cardTitleActive: false,
        fetch: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const clickCard = (
    curCardId: string,
    curCardTitle: string,
    listId: string
  ) => {
    setBoard({
      ...board,
      cardOpen: true,
      curCardId: curCardId,
      curCardTitle: curCardTitle,
      curListId: listId,
    });
  };

  const clickLabelColor = async (
    index: number | undefined,
    clickedColor: string
  ) => {
    if (index === undefined) return;

    let duplicated = board.labels.filter(
      (label: LabelType) => label.color === clickedColor && label.checked
    );

    let labels = [...board.labels];
    labels[index].checked = duplicated.length === 0 ? true : false;
    setBoard((board) => ({
      ...board,
      labels: labels,
      curLabelIndex: index,
    }));
    await updateLabel();
  };

  const changeOldLabelTitle = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let newLabels = [...board.labels];
    newLabels[board.curLabelIndex!].title = value;
    setBoard({ ...board, labels: newLabels });
  };

  const clickEditLabelTitleIcon = (event: MouseEvent<HTMLSpanElement>) => {
    let index = Number(event.currentTarget.getAttribute("data-index"));
    if (index === null || index === undefined) return;

    setBoard({
      ...board,
      isEditLabel: true,
      isAddLabel: false,
      isMainLabel: false,
      curLabelIndex: index,
      curLabelTitle: board.labels[index].title!,
    });
  };

  const clickEditLabelTitleButton = async () => await updateLabel();

  const submitAddNewLabelButton = async (index: number, title: string) => {
    let labels = [...board.labels];
    labels[index] = { ...labels[index], title: title, checked: true };
    setBoard((board) => ({
      ...board,
      labels: labels,
      update: true,
      curCardTitle: "",
    }));
  };

  const updateLabel = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/card/labels`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          boardId: board._id,
          listId: board.curListId,
          cardId: board.curCardId,
          labels: board.labels,
        },
      });
      setBoard({
        ...board,
        loading: false,
        update: false,
        fetch: true,
      });
    } catch (error) {
      console.error(error);
      setBoard({ ...board, loading: false, update: false, fetch: false });
    }
  };

  const clickRestoreListButton = async (index: number, listId: string) => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "PATCH",
        url: `${process.env.REACT_APP_BASEURL}/list/restore`,
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          listId: listId,
        },
      });
      setBoard({
        ...board,
        loading: false,
        fetch: true,
      });
    } catch (error) {
      console.error(error);
      setBoard({
        ...board,
        loading: false,
        fetch: false,
      });
    }
  };

  const clickRestoreCardButton = async (
    index: number,
    listId: string,
    cardId: string
  ) => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "PATCH",
        url: `${process.env.REACT_APP_BASEURL}/card/restore`,
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          listId: listId,
          cardId: cardId,
        },
      });
      setBoard({
        ...board,
        loading: false,
        fetch: true,
      });
    } catch (error) {
      console.error(error);
      setBoard({
        ...board,
        loading: false,
        fetch: false,
      });
    }
  };

  const archiveCard = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "PATCH",
        url: `${process.env.REACT_APP_BASEURL}/card/archive`,
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          workspaceId: workspaceId,
          boardId: boardId,
          listId: board.curListId,
          cardId: board.curCardId,
        },
      });
      setBoard({
        ...board,
        loading: false,
        fetch: true,
        archiveCard: false,
        cardOpen: false,
      });
    } catch (error) {
      console.error(error);
      setBoard({
        ...board,
        loading: false,
        fetch: false,
        archiveCard: false,
        cardOpen: false,
      });
    }
  };

  const clickBoardToMove = () => {
    setBoard({ ...board, _id: boardId, fetch: true });
  };

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    if (board.update) {
      updateLabel();
    }
    if (board.archiveCard) {
      archiveCard();
    }

    if (board.reorderList) {
      updateLists();
    }

    const fetch = async () => {
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/board/${boardId}`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
            workspaceId: workspaceId,
          },
        });
        const curBoard = result.data[0];
        console.log(curBoard);
        setBoard({
          ...board,
          title: curBoard.name,
          lists: curBoard.lists,
          color: curBoard.color,
          labels: curBoard.labels,
          loading: false,
          fetch: false,
        });
      } catch (error) {
        console.error(error);
        setBoard({ ...board, loading: false, fetch: false });
      }
    };

    fetch();
    if (board.fetch) {
      fetch();
    }
  }, [board.fetch, board.update, board.archiveCard, board.reorderList]);

  return (
    <div className="w-full h-full bg-gray-lightest overflow-x-scroll">
      {board.loading ? <Loader loading /> : null}
      {board.cardOpen ? (
        <CardModal
          id={board.curCardId}
          title={board.curCardTitle}
          workspaceId={workspaceId}
          boardId={boardId}
          listId={board.curListId}
          labels={board.labels}
          isMainLabel={board.isMainLabel}
          isEditLabel={board.isEditLabel}
          isAddLabel={board.isAddLabel}
          goBack={() =>
            setBoard({
              ...board,
              isMainLabel: true,
              isEditLabel: false,
              isAddLabel: false,
            })
          }
          dismiss={() => setBoard({ ...board, cardOpen: false, curCardId: "" })}
          clickLabelColor={(index: number, color: string) =>
            clickLabelColor(index, color)
          }
          clickEditLabelTitleIcon={(event: MouseEvent<HTMLSpanElement>) =>
            clickEditLabelTitleIcon(event)
          }
          changeOldLabelTitle={(event: ChangeEvent<HTMLInputElement>) =>
            changeOldLabelTitle(event)
          }
          clickEditLabelTitleButton={() => clickEditLabelTitleButton()}
          clickAddNewLabelButton={() =>
            setBoard({
              ...board,
              isMainLabel: false,
              isAddLabel: true,
              isEditLabel: false,
            })
          }
          submitAddNewLabelButton={(index: number, title: string) =>
            submitAddNewLabelButton(index, title)
          }
          clickArchiveCardButton={() =>
            setBoard({ ...board, archiveCard: true, cardOpen: false })
          }
        />
      ) : null}
      <Header
        bgColor={board.color ? board.color : "blue"}
        isShadowed={false}
        textColor={"white"}
        fontSize={"md"}
        createMenuActive={props.createMenuActive}
        createBoardClicked={props.createBoardClicked}
        createWorkspaceClicked={props.createWorkspaceClicked}
      />
      <BoardHeader
        boardId={boardId}
        workspaceId={workspaceId}
        title={board.title}
        titleActive={board.boardTitleActive}
        archivedItemsActive={board.archivedItemsActive}
        archivedLists={board.archivedLists}
        archivedCards={board.archivedCards}
        focusTitle={() => setBoard({ ...board, boardTitleActive: true })}
        changeTitle={(event: ChangeEvent<HTMLInputElement>) =>
          changeBoardTitle(event)
        }
        blurTitle={() => blurBoardTitle()}
        clickRestoreListButton={(index: number, listId: string) =>
          clickRestoreListButton(index, listId)
        }
        clickRestoreCardButton={(
          index: number,
          listId: string,
          cardId: string
        ) => clickRestoreCardButton(index, listId, cardId)}
        clickBoardToMove={() => clickBoardToMove()}
      />
      <div className="w-full flex flex-nowrap justify-start items-start overflow-x-scroll">
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
          {board.lists?.map((list: ListProps, index: number) => (
            <List
              key={list._id}
              index={index}
              _id={list._id}
              title={list.title}
              active={list.active}
              cards={list.cards}
              change={(event: ChangeEvent<HTMLInputElement>) =>
                changeListTitle(event, index)
              }
              focusListTitle={() => focusListTitle(index)}
              blurListTitle={() => blurListTitle(index)}
              clickArchiveListButton={() => archiveList(list._id)}
              curListId={board.curListId}
              addCard={() => addCard(list._id)}
              clickAddCard={board.clickAddCard}
              cardTitleActive={board.cardTitleActive}
              changeCardTitle={(event: ChangeEvent<HTMLInputElement>) =>
                changeCardTitle(event)
              }
              blurCardTitle={() => blurCardTitle()}
              clickCard={(cardId: string, cardTitle: string, listId: string) =>
                clickCard(cardId, cardTitle, listId)
              }
            />
          ))}
          <span className="">
            <button
              className="w-64 h-10 mt-4 bg-gray-regular rounded text-center hover:opacity-25"
              onClick={() => addList()}
            >
              Add a list
            </button>
          </span>
        </DragDropContext>
      </div>
    </div>
  );
}

export default withRouter(Board);
