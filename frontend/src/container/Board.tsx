import axios from "axios";
import { useState } from "react";
import BoardList from "../components/Board/BoardList";
import MainNavbar from "../components/Board/MainNavbar";
import Header from "../components/Header/Header";
import CreateWorkspace, {
  WorkspaceFormProps,
} from "../components/Modal/CreateWorkspace";
import Modal from "../components/Modal/Modal";
import Loader from "../components/Loader";

function Board() {
  const [board, setBoard] = useState({
    isCreateNewWorkspace: false,
    loader: false,
    error: false,
    errorMsg: "",
  });

  const createWorkspaceModal = (
    <Modal width="1/3" height="1/2" title="Create workspace">
      <CreateWorkspace
        submitWorkspaceForm={(
          event: React.FormEvent<HTMLFormElement>,
          form: WorkspaceFormProps
        ) => submitWorkspaceForm(event, form)}
      />
    </Modal>
  );

  const createWorkspaceClicked = () => {
    setBoard({ ...board, isCreateNewWorkspace: !board.isCreateNewWorkspace });
  };

  const submitWorkspaceForm = (
    event: React.FormEvent<HTMLFormElement>,
    form: WorkspaceFormProps
  ) => {
    event.preventDefault();
    setBoard({ ...board, loader: true });
    const uri = `${process.env.REACT_APP_BASEURL}/workspace`;
    axios
      .post(
        uri,
        { name: form.name, description: form.description },
        { withCredentials: true }
      )
      .then(() => {
        setBoard({ ...board, isCreateNewWorkspace: false, loader: false });
      })
      .catch((error: Error) => {
        setBoard({
          ...board,
          loader: false,
          error: false,
          errorMsg: error.message,
        });
        console.error(error);
      });
  };

  return (
    <div>
      {board.loader ? <Loader loading /> : null}
      {board.isCreateNewWorkspace ? createWorkspaceModal : null}
      <Header
        bgColor="blue"
        isShadowed={false}
        fontSize="md"
        textColor="white"
        createWorkspaceClicked={() => createWorkspaceClicked()}
      />
      <main className="w-screen md:w-full h-full flex justify-center">
        <MainNavbar />
        <BoardList />
      </main>
    </div>
  );
}
export default Board;
