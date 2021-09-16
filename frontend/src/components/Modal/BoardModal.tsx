import { MouseEvent, ChangeEvent, FormEvent, useState } from "react";
import { NewBoardProps } from "../../container/Workspace";
import Button from "../Button";
import InputBox from "../InputBox";
import Backdrop from "./Backdrop";
import ColorChip from "./ColorChip";
import Modal from "./Modal";

type BoardModalProps = {
  list: any[];
  dismiss: () => void;
  create: (event: FormEvent<HTMLButtonElement>, props: NewBoardProps) => void;
};

const BoardModal = (props: BoardModalProps) => {
  let colorSet = [
    "blue",
    "emerald",
    "pink",
    "emerald",
    "emerald",
    "blue",
    "green",
    "blue",
    "blue",
  ];

  const [board, setBoard] = useState<NewBoardProps>({
    name: "",
    color: "",
    workspaceId: 0,
  });

  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.value;
    if (!name || name.length < 0) return;
    setBoard({ ...board, name: name });
  };

  const colorHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let el = event.target as HTMLButtonElement;
    let color = el.value;
    color = !color ? "blue" : color;
    setBoard({ ...board, color: color });
  };

  const dropdownHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    let workspace = Number(event.target.value);
    setBoard({ ...board, workspaceId: workspace });
  };

  return (
    <>
      <Backdrop dismiss={props.dismiss} />
      <Modal
        width={"1/2 md:1/4"}
        height={"1/2 xl:1/3"}
        title={"Create board"}
        dismiss={props.dismiss}
      >
        <form className="w-full h-full flex flex-col">
          <div className="flex flex-col xl:flex-row xl:mb-8">
            <div className="w-full h-auto mx-2">
              <InputBox
                type={"text"}
                height={"auto"}
                width={"full"}
                placeholder={"Add board title"}
                change={(event: ChangeEvent<HTMLInputElement>) =>
                  nameHandler(event)
                }
              />
              <select
                defaultValue={props.list[0].name}
                className="w-full h-12 text-gray border border-gray-lightest rounded"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  dropdownHandler(event)
                }
              >
                {props.list
                  ? props.list.map((workspace: any, index: number) => (
                      <option key={index} value={index}>
                        {workspace.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="w-1/3 h-auto grid grid-cols-3 grid-wors-3">
              {colorSet.map((item, index) => (
                <ColorChip
                  key={index}
                  color={item}
                  click={(event: MouseEvent<HTMLButtonElement>) =>
                    colorHandler(event)
                  }
                />
              ))}
            </div>
          </div>
          <Button
            height={"12"}
            width={"full"}
            bgColor={"blue"}
            textColor={"white"}
            hoverColor={"opacity-50"}
            value={"Create board"}
            click={(event: FormEvent<HTMLButtonElement>) => {
              props.create(event, {
                name: board.name,
                color: board.color,
                workspaceId: board.workspaceId,
              });
            }}
          />
        </form>
      </Modal>
    </>
  );
};

export default BoardModal;
