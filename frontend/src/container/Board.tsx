import { withRouter, useParams } from "react-router";
import Header from "../components/Header/Header";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BoardHeader from "../components/Board/BoardHeader";
import List, { ListProps } from "../components/Board/List";
import axios from "axios";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import CardModal from "../components/Modal/CardModal";

type BoardProps = {
  _id: string;
  name: string;
  lists?: ListProps[] | any;
  current: number;
  fetch: boolean;
  loading: boolean;
  clickAddCard: boolean;
  curListId: string;
  cardTitle: string;
  cardTitleActive: boolean;
  cardOpen: boolean;
  curCardId: string;
};

export type CardType = {
  _id: string;
  title: string;
  description?: string;
  archived: boolean;
};

function Board(props: any) {
  const { curBoard, workspaceId, workspaces } = props.location.state;
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardProps>({
    _id: boardId,
    name: "",
    lists: curBoard.lists,
    current: 0,
    fetch: false,
    loading: false,
    clickAddCard: false,
    curListId: "",
    cardTitle: "",
    cardTitleActive: false,
    cardOpen: false,
    curCardId: ""
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

  const onDragEnd = (result: DropResult) => {
    console.dir(result);
    if (!result.destination) {
      return;
    }
    let curList = curBoard.lists
      ? curBoard.lists.find((list: ListProps, index: number) => {
          if (list._id === result.source.droppableId) {
            setBoard({ ...board, current: index });
          }
          return list;
        })
      : null;
    console.log(curList);

    const cardsOrdered: CardType[] = reorderCard(
      curList!.cards!,
      result.source.index,
      result.destination.index
    );

    curList!.cards = cardsOrdered;

    let newLists = [...board.lists!];
    newLists[board.current] = curList!;
    console.log(newLists);
    setBoard({ ...board, lists: newLists });
  };

  const changeBoardTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      return;
    }
    setBoard({ ...board, name: event.target.value });
  };

  const changeListTitle = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let inputValue = event.target.value;
    if (event.target.value.length > 0) {
      return;
    }
    let newLists = [...board.lists!];
    newLists[index].title = inputValue;

    setBoard({ ...board, lists: newLists });
  };

  const toggleListTitle = (index: number) => {
    let newLists = [...board.lists!];
    newLists[index].active = !board.lists![index].active;
    setBoard({ ...board, lists: newLists });
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
        method: "POST",
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

  const clickCard = (curCardId: string) => {
    setBoard({ ...board, cardOpen: true, curCardId: curCardId });
  };

  const closeCard = () => {
    setBoard({ ...board, cardOpen: false, curCardId: "" });
  };

  const saveCardDescription = () => {};

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user")!);

    const fetch = async () => {
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/board/${board._id}`,
          headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        });
        console.log(result.data[0].boards[0].lists);
        setBoard({
          ...board,
          lists: result.data[0].boards[0].lists,
          loading: false,
          fetch: false,
        });
      } catch (error) {
        console.error(error);
        setBoard({ ...board, loading: false, fetch: false });
      }
    };

    fetch();
  }, [board.fetch]);

  return (
    <div className="w-full h-screen bg-gray-lightest">
      {board.loading ? <Loader loading /> : null}
      {board.cardOpen ? (
        <CardModal
          id={board.curCardId}
          dismiss={() => closeCard()}
          create={() => saveCardDescription()}
        />
      ) : null}
      <Header
        bgColor={curBoard.color ? curBoard.color : "blue"}
        isShadowed={false}
        textColor={"white"}
        fontSize={"md"}
        list={workspaces}
        // createBoardClicked={workspace.createBoardClicked}
        // createWorkspaceClicked={workspace.createWorkspaceClicked}
      />
      <BoardHeader
        changeTitle={(event: ChangeEvent<HTMLInputElement>) =>
          changeBoardTitle(event)
        }
      />
      <div className="flex justify-start items-start overflow-auto">
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
          {board.lists?.map((list: ListProps, index: number) => (
            <List
              key={list._id}
              index={index}
              _id={list._id}
              title={list.title}
              active={list.active}
              cards={list.cards}
              toggle={() => toggleListTitle(index)}
              change={(event: ChangeEvent<HTMLInputElement>) =>
                changeListTitle(event, index)
              }
              archive={() => archiveList(list._id)}
              curListId={board.curListId}
              addCard={() => addCard(list._id)}
              clickAddCard={board.clickAddCard}
              cardTitleActive={board.cardTitleActive}
              changeCardTitle={(event: ChangeEvent<HTMLInputElement>) =>
                changeCardTitle(event)
              }
              blurCardTitle={() => blurCardTitle()}
              clickCard={(cardId) => clickCard(cardId)}
            />
          ))}
          <button
            className="w-60 h-10 mt-4 bg-gray-regular rounded text-center hover:opacity-25"
            onClick={() => addList()}
          >
            Add a list
          </button>
        </DragDropContext>
      </div>
    </div>
  );
}

export default withRouter(Board);
