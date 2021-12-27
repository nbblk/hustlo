import { MouseEvent } from "react";

interface ColorChipProps {
  color: string;
  click: (event: MouseEvent<HTMLButtonElement>, index?: number) => void;
  isSelected?: boolean;
}

const ColorChip = (props: ColorChipProps) => (
  <button
    className={`h-8 w-full mx-1 my-1 w-8 h-8 md:w-6 md:h-6 rounded bg-${
      props.color
    } ${
      props.isSelected ? `border-dashed border-4 border-yellow-400` : ``
    }hover:opacity-50`}
    onClick={props.click}
    value={props.color}
  />
);
export default ColorChip;
