import { faArchive, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardType } from "../../container/Board";
import InputBox from "../InputBox";
import Card from "./Card";
import ListButton from "./ListButton";
import ListTitle from "./ListTitle";

export type ListProps = {
  index: number;
  _id: string;
  curListId: string;
  title: string;
  active: boolean;
  clickAddCard: boolean;
  cardTitleActive: boolean;
  cards: CardType[];
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  blurListTitle: () => void;
  focusListTitle: () => void;
  clickArchiveListButton: () => void;
  addCard: () => void;
  changeCardTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  blurCardTitle: () => void;
  clickCard: (curCarId: string, curCardTitle: string, listId: string) => void;
};

const List = (props: ListProps) => {
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
  });

  return (
    <Droppable droppableId={props._id}>
      {(provided, snapshot) => (
        <div
          className="rounded m-4 flex flex-col shadow shadow-md"
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          <ListTitle
            index={props.index}
            title={props.title}
            active={props.active}
            change={props.change}
            focus={props.focusListTitle}
            blur={props.blurListTitle}
          />
          {props.cards[0] !== undefined
            ? props.cards.map((card: CardType, index: number) => {
                return (
                  <Draggable
                    key={card._id}
                    draggableId={card._id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <Card
                          _id={card._id}
                          title={card.title}
                          labels={card.labelsSelected}
                          provided={provided}
                          snapshot={snapshot}
                          click={() =>
                            props.clickCard(card._id, card.title, props._id)
                          }
                        />
                      );
                    }}
                  </Draggable>
                );
              })
            : null}
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
          {provided.placeholder}
          <ListButton
            icon={faPlus}
            value={"Add new card"}
            click={props.addCard}
          />
          <ListButton
            icon={faArchive}
            value={"Archive"}
            click={props.clickArchiveListButton}
          />
        </div>
      )}
    </Droppable>
  );
};

export default List;
