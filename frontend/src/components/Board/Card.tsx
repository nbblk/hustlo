import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

type CardProps = {
  _id: string;
  title: string;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  click: () => void
};

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
      className="rounded m-4 bg-white shadow shadow-md"
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
    </div>
  );
};

export default Card;
