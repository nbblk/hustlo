import axios from "axios";
import { useEffect, useState } from "react";
import BoardList from "../components/Board/BoardList";
import MainNavbar from "../components/Board/MainNavbar";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";
import { WorkspaceFormProps } from "../components/Modal/CreateWorkspace";
import CreateWorkspaceModal from "../components/Modal/CreateWorkspace";

function Board() {
  const [board, setBoard] = useState({
    isCreateNewWorkspace: false,
    loading: false,
    modal: false,
    errorMsg: "",
    boards: [],
  });

  const dismissModal = () => {
    setBoard({ ...board, modal: false });
  };

  const createWorkspaceClicked = () => {
    setBoard({ ...board, modal: true, isCreateNewWorkspace: true });
  };

  const submitWorkspaceForm = async (
    event: React.FormEvent<HTMLButtonElement>,
    form: WorkspaceFormProps
  ) => {
    event.preventDefault();
    let token = JSON.parse(sessionStorage.getItem("user")!).token; // !
    setBoard({ ...board, loading: true });

    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/workspace`,
        data: { name: form.name, description: form.description },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoard({
        ...board,
        loading: false,
        modal: false,
        isCreateNewWorkspace: false,
      });
    } catch (error: any) {
      console.error(error);
      setBoard({
        ...board,
        loading: false,
        errorMsg: error.message,
      });
    }
  };

  useEffect(() => {
    async function getBoards() {
      let token = JSON.parse(sessionStorage.getItem("user")!).token; // !
      setBoard({ ...board, loading: true })
      try {
        const boards = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/workspace`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoard({ ...board, boards: boards.data, loading: false })
      } catch (error: any) {
        setBoard({ ...board, errorMsg: error.message, loading: false })        
      }
    }
    getBoards();
  }, []);

  return (
    <div>
      {board.loading ? <Loader loading /> : null}
      {board.modal && board.isCreateNewWorkspace ? (
        <CreateWorkspaceModal
          dismiss={() => dismissModal()}
          submit={(
            event: React.FormEvent<HTMLButtonElement>,
            props: WorkspaceFormProps
          ) => submitWorkspaceForm(event, props)}
        />
      ) : null}
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
