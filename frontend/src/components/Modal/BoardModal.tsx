import { MouseEvent, ChangeEvent, FormEvent, useState } from "react";
import { NewBoardProps } from "../../container/Workspace";
import Button from "../Button";
import InputBox from "../InputBox";
import Backdrop from "./Backdrop";
import ColorChip from "./ColorChip";
import Modal from "./Modal";

type WorkspaceName = {
  _id: string;
  name: string;
};

type BoardModalProps = {
  workspaces: WorkspaceName[];
  dismiss: () => void;
  create: (event: FormEvent<HTMLButtonElement>, props: NewBoardProps) => void;
};

const BoardModal = (props: BoardModalProps) => {
  let colorSet = [
    "red",
    "yellow",
    "orange",
    "green",
    "emerald",
    "blue",
    "pink",
    "blue",
    "gray",
  ];

  const [board, setBoard] = useState<NewBoardProps>({
    name: "",
    color: "",
    workspaceId: props.workspaces[0]._id,
  });

  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.value;
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
    let workspaceId = event.target.value;
    setBoard({ ...board, workspaceId: workspaceId });
  };

  return (
    <>
      <Backdrop dismiss={props.dismiss} />
      <Modal
        width={"full md:w-auto"}
        height={"auto xl:h-auto"}
        title={"Create board"}
        dismiss={props.dismiss}
      >
        <form className="w-full h-full flex flex-col items-center">
          <div className="flex flex-col justify-center items-center xl:flex-row xl:mb-8">
            <div className="w-full h-auto mx-2">
              <InputBox
                type={"text"}
                height={"auto"}
                width={"full"}
                marginY={"2"}
                border={true}
                borderColor={"border-gray-lightest"}
                placeholder={"Add board title"}
                change={(event: ChangeEvent<HTMLInputElement>) =>
                  nameHandler(event)
                }
              />
              <select
                defaultValue={props.workspaces[0].name}
                className="w-full h-12 my-2 text-gray border border-gray-lightest rounded"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  dropdownHandler(event)
                }
              >
                {props.workspaces
                  ? props.workspaces.map(
                      (workspace: WorkspaceName, index: number) => (
                        <option key={index} value={workspace._id}>
                          {workspace.name}
                        </option>
                      )
                    )
                  : null}
              </select>
            </div>
            <div className="my-4 w-full md:w-1/3 grid grid-cols-2 md:grid-cols-3 md:grid-wors-3">
              {colorSet.map((item, index) => (
                <ColorChip
                  key={index}
                  color={item}
                  click={(event: MouseEvent<HTMLButtonElement>) =>
                    colorHandler(event)
                  }
                  isSelected={board.color === item ? true : false}
                />
              ))}
            </div>
          </div>
          <Button
            height={"12"}
            width={"full md:w-1/3"}
            bgColor={"blue"}
            textColor={"white"}
            hoverColor={"opacity-50"}
            value={"Create board"}
            disabled={board.name ? false : true}
            click={(event: FormEvent<HTMLButtonElement>) => {
              if (board.name.length > 0) {
                props.create(event, {
                  name: board.name,
                  color: board.color,
                  workspaceId: board.workspaceId,
                });
              }
            }}
          />
        </form>
      </Modal>
    </>
  );
};

export default BoardModal;
