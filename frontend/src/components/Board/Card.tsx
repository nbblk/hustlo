import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { LabelType } from "../Card/Label";

interface CardProps {
  _id: string;
  title: string;
  labels?: LabelType[];
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  click: () => void;
}

const Card = (props: CardProps) => {
  let grid = 8;
  const getCardStyle = (draggableStyle: any, isDragging: boolean) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "white",
    ...draggableStyle,
  });

  return (
    <div
      key={props._id}
      className="w-64 rounded m-4 bg-white shadow shadow-md flex flex-col justify-center items-start hover:opacity-50"
      ref={props.provided.innerRef}
      {...props.provided.dragHandleProps}
      {...props.provided.draggableProps}
      style={getCardStyle(
        props.provided.draggableProps.style,
        props.snapshot.isDragging
      )}
      onClick={props.click}
    >
      {props.title}
      <ul className="w-full flex justify-end itmes-center text-xs">
        {props.labels?.map((label: LabelType, index: number) => (
          <li
            key={index}
            className={`w-6 h-2
            } mx-1 bg-${label.color} rounded text-white flex justify-center items-center`}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
