import { ChangeEvent } from "react";
import InputBox from "../InputBox";

type ListTitleProps = {
  index: number;
  title: string;
  active: boolean;
  toggle: () => void;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ListTitle = (props: ListTitleProps) => (
  <div className="mb-2" onClick={props.toggle}>
    <InputBox
      type={"text"}
      height={"8"}
      width={"full"}
      border={false}
      placeholder={
        !props.title ? "Enter list title..." : ""
      }
      change={props.change}
      disabled={props.active ? false : true}
      value={props.title}
    />
  </div>
);

export default ListTitle;
