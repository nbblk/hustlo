import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonWithIcon from "../ButtonWithIcon";

const Workspaces = (props: any) => {
  return (
    <div className="w-full md:w-2/4 p-5">
      <section>
        <div className="m-4 font-krona uppercase md:text-left text-center">
          your workspaces
        </div>
        <ul className="w-full h-2/3 flex flex-col justify-start items-start text-sm">
          {props.list.length > 0
            ? props.list.map((workspace: any, index: number) => (
                <li key={workspace._id} className="w-full">
                  <div className="w-full flex flex-col md:justify-between md:text-left text-center">
                    <h3 className="m-4 font-krona uppercase">
                      {workspace.name}
                    </h3>
                    <div className="flex md:absolute right-10">
                      <ButtonWithIcon
                        width={"full md:w-20"}
                        height={"8"}
                        margin={"2"}
                        padding={"0"}
                        value={"Edit"}
                        textColor={"text-black"}
                        fontSize={"sm"}
                        border={true}
                        isIcon={true}
                        iconProp={faEdit}
                        isCircle={false}
                        bgColor={"bg-gray-light"}
                        click={() => props.edit(index)}
                      />
                      <ButtonWithIcon
                        width={"full md:w-20"}
                        height={"8"}
                        margin={"2"}
                        padding={"0"}
                        value={"Delete"}
                        textColor={"text-black"}
                        fontSize={"sm"}
                        border={true}
                        isIcon={true}
                        iconProp={faTimes}
                        isCircle={false}
                        bgColor={"bg-gray-light"}
                        click={() => props.ask(index)}
                      />
                    </div>
                  </div>
                  <ul className="w-full flex flex-wrap">
                    {workspace.boards
                      ? workspace.boards.map((board: any) => {
                          return (
                            <Link
                              key={board._id}
                              to={{
                                pathname: `/board/${board._id}`,
                                state: { workspaceId: workspace._id },
                              }}
                              className="w-full md:w-80 h-40 m-5 p-4 rounded bg-gray-dark text-white font-nunito text-md cursor-pointer hover:opacity-50"
                            >
                              <li className="">{board.name}</li>
                            </Link>
                          );
                        })
                      : null}
                    <li
                      key="last"
                      className="w-full md:w-80 h-40 m-5 p-4 flex justify-center items-center rounded bg-gray-lightest text-gray font-nunito text-md hover:bg-gray-regular cursor-pointer"
                      onClick={props.createBoard}
                    >
                      Create new board
                    </li>
                  </ul>
                </li>
              ))
            : null}
        </ul>
      </section>
    </div>
  );
};

export default Workspaces;
