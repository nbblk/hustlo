import { ChangeEvent } from "react";
import InputBox from "../InputBox";

type ListTitleProps = {
  index: number;
  title: string;
  active: boolean;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  focus: () => void;
  blur: () => void;
};

const ListTitle = (props: ListTitleProps) => (
  <div className="mb-2" onClick={props.focus}>
    <InputBox
      type={"text"}
      height={"8"}
      width={"full"}
      border={false}
      placeholder={
        !props.title ? "Enter list title..." : ""
      }
      change={props.change}
      blur={props.blur}
      disabled={props.active ? false : true}
      value={props.title}
    />
  </div>
);

export default ListTitle;
