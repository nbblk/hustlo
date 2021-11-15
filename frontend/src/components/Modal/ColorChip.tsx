import { MouseEvent } from "react";

interface ColorChipProps {
  color: string;
  click: (event: MouseEvent<HTMLButtonElement>, index?: number) => void;
}

const ColorChip = (props: ColorChipProps) => (
  <button
    className={`h-6 w-12 m-1 rounded bg-${props.color}`}
    onClick={props.click}
    value={props.color}
  />
);
export default ColorChip;
