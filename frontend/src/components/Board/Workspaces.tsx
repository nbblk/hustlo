import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import ButtonWithIcon from "../ButtonWithIcon";

const Workspaces = (props: any) => {
  return (
    <div className="w-full md:w-2/4 p-5">
      <section>
        <div className="m-4 font-krona uppercase">your workspaces</div>
        <ul className="w-full h-2/3 flex flex-col justify-start items-start">
          {props.list.length > 0
            ? props.list.map((workspace: any, index: number) => (
                <li key={workspace._id}>
                  <div className="flex justify-between">
                    <h3 className="m-4 font-krona uppercase">
                      {workspace.name}
                    </h3>
                    <ButtonWithIcon
                      width={"20"}
                      height={"auto"}
                      margin={"2"}
                      padding={"0"}
                      value={"Edit"}
                      textColor={"text-black"}
                      fontSize={"sm"}
                      isIcon={true}
                      iconProp={faEdit}
                      isCircle={false}
                      bgColor={"bg-gray-light"}
                      click={() => props.edit(index)}
                    />
                    <ButtonWithIcon
                      width={"24"}
                      height={"auto"}
                      margin={"2"}
                      padding={"0"}
                      value={"Delete"}
                      textColor={"text-black"}
                      fontSize={"sm"}
                      isIcon={true}
                      iconProp={faTimes}
                      isCircle={false}
                      bgColor={"bg-gray-light"}
                      click={() => props.ask(index)}
                    />
                  </div>
                  <ul className="w-full flex flex-wrap">
                    {workspace.boards
                      ? workspace.boards.map((board: any) => (
                          <li
                            key={board._id}
                            className="w-full md:w-80 h-40 m-5 p-4 rounded bg-gray-dark text-white font-nunito text-md cursor-pointer"
                          >
                            {board.name}
                          </li>
                        ))
                      : null}
                    <li
                      key="last"
                      className="w-full md:w-80 h-40 m-5 p-4 flex justify-center items-center rounded bg-gray-lightest text-gray font-nunito text-md cursor-pointer"
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
