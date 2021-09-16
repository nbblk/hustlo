import { MouseEvent } from "react";

type ColorChipProps = {
  color: string;
  click: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ColorChip = (props: ColorChipProps) => (
  <button
    className={`h-6 w-6 m-1 rounded bg-${props.color}`}
    onClick={props.click}
    value={props.color}
  />
);
export default ColorChip;
