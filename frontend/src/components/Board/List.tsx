import { ChangeEvent } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardType } from "../../container/Board";
import InputBox from "../InputBox";
import AddNewCard from "./AddNewCard";
import Card from "./Card";
import ListTitle from "./ListTitle";

export type ListProps = {
  index: number;
  _id: string;
  curListId: string;
  title: string;
  active: boolean;
  clickAddCard: boolean;
  cardTitleActive: boolean;
  cards?: CardType[];
  toggle: () => void;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  archive: () => void;
  addCard: () => void;
  changeCardTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  blurCardTitle: () => void;
  clickCard: (curCarId: string) => void;
};

const List = (props: ListProps) => {
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250,
  });

  return (
    <Droppable droppableId={props._id}>
      {(provided, snapshot) => (
        <div
          className="w-full h-full rounded m-4 flex flex-col shadow shadow-md overflow-y-auto"
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          <ListTitle
            index={props.index}
            title={props.title}
            active={props.active}
            toggle={props.toggle}
            change={props.change}
          />
          {props.cards?.map((card: CardType, index: number) => (
            <Draggable key={card._id} draggableId={card._id} index={index}>
              {(provided, snapshot) => (
                <Card
                  _id={card._id}
                  title={card.title}
                  provided={provided}
                  snapshot={snapshot}
                  click={() => props.clickCard(card._id)}
                />
              )}
            </Draggable>
          ))}
          {props._id === props.curListId &&
          props.clickAddCard &&
          props.cardTitleActive ? (
            <div onBlur={props.blurCardTitle}>
              <InputBox
                type={"text"}
                height={"10"}
                width={"full"}
                placeholder={"Add a title"}
                change={props.changeCardTitle}
                disabled={!props.cardTitleActive}
              />
            </div>
          ) : null}
          <AddNewCard click={props.addCard} />
          <button
            className="w-full h-10 bg-gray-regular rounded text-center hover:opacity-25"
            onClick={props.archive}
          >
            Archive
          </button>
        </div>
      )}
    </Droppable>
  );
};

export default List;
