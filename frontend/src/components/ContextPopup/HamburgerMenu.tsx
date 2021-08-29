import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import InputBox from "../InputBox";
import ContextPopupHeader from "./ContextPropHeader";

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

type HamburgerProps = {
  click: () => void;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
};

const HamburgerMenu = (props: HamburgerProps) => {
  return (
    <>
      <ContextPopupHeader title="" click={props.click} />
      <InputBox
        type="text"
        placeholder="Find boards by name..."
        width="full"
        height="12"
        change={props.change}
      />
      <ul className="my-4 text-left font-nunito">
        <li className="w-full h-14 my-2 rounded opacity-50 bg-white">
          workspace1
        </li>
        <li className="w-full h-14 my-2 rounded opacity-50 bg-white">
          workspace2
        </li>
        <li className="w-full h-14 my-2 rounded opacity-50 bg-white">
          workspace3
        </li>
        <Link to="/create-board">
          <li>Create new board...</li>
        </Link>
      </ul>
    </>
  );
};

export default HamburgerMenu;
