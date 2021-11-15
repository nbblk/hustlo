import { useState } from "react";
import Modal from "../Modal/Modal";

interface ArchivedModalProps {
  isCard: boolean;
  archivedCards?: [];
  archivedLists?: [];
  children?: React.ReactNode;
  restoreCard: (index: number, listId: string, cardId: string) => void;
  restoreList: (index: number, listId: string) => void;
  switch: () => void;
  dismiss: () => void;
}

const ArchivedModal = (props: ArchivedModalProps) => {
  const getElements = () => {
    let elements;
    if (props.isCard && props.archivedCards) {
      elements = props.archivedCards!.map((list: any, index: number) => (
        <li
          key={index}
          className="w-full h-full m-1 p-2 flex justify-between bg-gray-lightest rounded"
        >
          <div className="w-full flex flex-col">
            <span className="text-xs">
              {list.title ? list.title : "(no title)"}
            </span>
            <ul>
              {list.cards.map((card: any, index: number) => (
                <li
                  key={card._id}
                  className="my-1 flex justify-between"
                >
                  {card.title}
                  <button
                    className="bg-transparent hover:underline hover:text-blue"
                    onClick={() => props.restoreCard(index, list._id, card._id)}
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ));
    } else if (!props.isCard && props.archivedLists!.length > 0) {
      elements = props.archivedLists!.map((list: any, index: number) => (
        <li
          key={index}
          className="w-full h-10 m-1 p-2 flex justify-between bg-gray-lightest rounded"
        >
          <span>{list.title ? list.title : "(no title)"}</span>
          <button
            className="bg-transparent hover:underline hover:text-blue"
            onClick={() => props.restoreList(index, list._id)}
          >
            Restore
          </button>
        </li>
      ));
    } else {
      elements = <li>Nothing in here.</li>;
    }
    return elements;
  };
  return (
    <Modal
      backdropDisabled={true}
      width={"80"}
      height={"auto"}
      title={"Archived items"}
      dismiss={props.dismiss}
      zIndex={"50"}
      styles={"absolute top-12 right-0 p-4"}
    >
      <ul className="flex flex-col justify-center items-center overflow-auto">
        {getElements()}
      </ul>
      <button
        className="text-gray bg-transparent underline text-xs"
        onClick={props.switch}
      >
        {`Swtich to ${props.isCard ? "list" : "card"}`}
      </button>
    </Modal>
  );
};

export default ArchivedModal;
