import { faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, MouseEvent } from "react";
import ContextMenu from "../ContextPopup/ContextMenu";

interface MainNavbarProps {
  list: [];
  createWorkspace: () => void;
  edit: (index: number) => void;
  ask: (index: number) => void;
}

const MainNavbar = (props: MainNavbarProps) => {
  let [contextMenu, setContextMenu] = useState({
    workspaceIndex: 0,
    isOpened: false,
  });

  const contextMenuHandler = (
    event: MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    event.preventDefault();
    setContextMenu({ workspaceIndex: index, isOpened: !contextMenu.isOpened });
  };

  return (
    <nav className="hidden md:block md:w-1/5 m-10 font-krona">
      <div className="">
        <div className="flex justify-between">
          <span className="">WORKSPACE</span>
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faPlus} onClick={props.createWorkspace} />
          </span>
        </div>
        <ul className="my-2 flex flex-col text-sm">
          {props.list.map((item: any, index: number) => (
            <li
              key={item._id}
              className="block relative my-4 flex justify-between items-center"
            >
              <span className="block flex justify-center itmes-center w-8 h-8 mx-2 bg-gray-light text-white font-3xl font-bold uppercase leading leading-loose">
                {item.name.charAt(0)}
              </span>
              {item.name}
              <span
                className="cursor-pointer relative"
                onClick={(event: MouseEvent<HTMLSpanElement>) =>
                  contextMenuHandler(event, index)
                }
              >
                <FontAwesomeIcon icon={faSortDown} />
              </span>
              {contextMenu.isOpened && contextMenu.workspaceIndex === index ? (
                <ContextMenu
                  edit={() => {
                    setContextMenu({ ...contextMenu, isOpened: false });
                    props.edit(contextMenu.workspaceIndex);
                  }}
                  delete={() => {
                    setContextMenu({ ...contextMenu, isOpened: false });
                    props.ask(contextMenu.workspaceIndex);
                  }}
                  active={contextMenu.isOpened ? true : false}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
