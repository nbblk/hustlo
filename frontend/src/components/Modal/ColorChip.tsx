import { MouseEvent } from "react";

interface ColorChipProps {
  color: string;
  click: (event: MouseEvent<HTMLButtonElement>, index?: number) => void;
}

const ColorChip = (props: ColorChipProps) => (
  <button
    className={`h-8 w-full my-1 md:w-8 md:h-8 md:my-1 rounded bg-${props.color} hover:opacity-50`}
    onClick={props.click}
    value={props.color}
  />
);
export default ColorChip;
