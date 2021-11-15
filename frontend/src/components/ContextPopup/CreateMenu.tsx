import { faFlipboard } from "@fortawesome/free-brands-svg-icons";
import { faPeopleCarry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContextPopupHeader from "./ContextPropHeader";

const CreateMenu = (props: {
  click: () => void;
  createBoardClicked: () => void;
  createWorkspaceClicked: () => void;
}) => {
  return (
    <>
      <ContextPopupHeader title="Create" click={props.click} />
      <ul className="my-4 text-left">
        <li
          className="m-4 cursor-pointer hover:bg-gray-lightest"
          onClick={props.createBoardClicked}
        >
          <div className="text-sm">
            <span className="mr-4">
              <FontAwesomeIcon icon={faFlipboard} />
            </span>
            Create board
          </div>
          <small className="my-1 block font-nunito">
            A board is made up of cards ordered on lists. Use it to manage
            projects, track infromation, or organize anything.
          </small>
        </li>
        <li
          className="m-4 cursor-pointer hover:bg-gray-lightest"
          onClick={props.createWorkspaceClicked}
        >
          <div className="text-sm">
            <span className="mr-4">
              <FontAwesomeIcon icon={faPeopleCarry} />
            </span>
            Create Workspace
          </div>
          <small className="my-1 block font-nunito">
            A Workspace is a group of boards and people. Use it to organize your
            company, side hustle, family, or friends.
          </small>
        </li>
      </ul>
    </>
  );
};

export default CreateMenu;
