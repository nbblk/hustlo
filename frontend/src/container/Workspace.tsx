import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import MainNavbar from "../components/Board/MainNavbar";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";
import { WorkspaceFormProps } from "../components/Modal/WorkspaceModal";
import WorkspaceModal from "../components/Modal/WorkspaceModal";
import Workspaces from "../components/Board/Workspaces";
import Modal from "../components/Modal";
import BoardModal from "../components/Modal/BoardModal";

export type NewBoardProps = {
  workspaceId: number;
  name: string;
  color: string;
};

function Workspace() {
  const [workspace, setWorkspace] = useState({
    createMenuActive: false,
    createWorkspace: false,
    createBoard: false,
    updateWorkspace: false,
    fetchWorkspace: false,
    deleteWorkspace: false,
    current: { index: 0, name: "" },
    loading: false,
    modal: false,
    errorMsg: "",
    list: [] as any,
  });

  const dismissModal = () => {
    setWorkspace({ ...workspace, modal: false });
  };

  const createMenuClicked = () => {
    setWorkspace({
      ...workspace,
      modal: false,
      createMenuActive: true,
      createWorkspace: false,
      createBoard: false,
      updateWorkspace: false,
      fetchWorkspace: false,
      deleteWorkspace: false,
    })
  };

  const createMenuDismiss = () => {
    setWorkspace({
      ...workspace,
      modal: false,
      createMenuActive: false,
      createWorkspace: false,
      createBoard: false,
      updateWorkspace: false,
      fetchWorkspace: false,
      deleteWorkspace: false,
    })
  };

  const createBoardClicked = () => {
    setWorkspace({
      ...workspace,
      modal: true,
      createMenuActive: false,
      createWorkspace: false,
      createBoard: true,
      updateWorkspace: false,
      fetchWorkspace: false,
      deleteWorkspace: false,
    });
  };

  const createWorkspaceClicked = () => {
    setWorkspace({
      ...workspace,
      modal: true,
      createMenuActive: false,
      createWorkspace: true,
      createBoard: false,
      updateWorkspace: false,
      fetchWorkspace: false,
      deleteWorkspace: false,
    });
  };

  const editWorkspaceClicked = (index: number) => {
    setWorkspace({
      ...workspace,
      current: { index: index, name: workspace.list[index].name },
      modal: true,
      createMenuActive: false,
      updateWorkspace: true,
      createWorkspace: false,
      createBoard: false,
      fetchWorkspace: false,  
      deleteWorkspace: false,
    });
  };

  const askDelete = (index: number) => {
    setWorkspace({
      ...workspace,
      current: { name: workspace.list[index].name, index: index },
      modal: true,
      createMenuActive: false,
      deleteWorkspace: true,
      updateWorkspace: false,
      createWorkspace: false,
      createBoard: false,
      fetchWorkspace: false, 
    });
  };

  const updateWorkspace = async (
    event: React.FormEvent<HTMLButtonElement>,
    props: WorkspaceFormProps
  ) => {
    event.preventDefault();
    let newArray = workspace.list.map((item: any, i: number) =>
      workspace.current.index === i ? { ...item, props } : item
    );
    setWorkspace({
      ...workspace,
      list: newArray,
      current: { index: 0, name: "" },
      modal: false,
      updateWorkspace: false,
      loading: true,
    });

    let curWorkspace = workspace.list[workspace.current.index];
    let user = JSON.parse(sessionStorage.getItem("user")!);

    await axios.request({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASEURL}/workspace?mod=${curWorkspace._id}`,
      headers: {
        _id: user._id,
        Authorization: `Bearer ${user.token}`,
      },
      data: { name: props.name, description: props.description },
    });
    setWorkspace({
      ...workspace,
      loading: false,
      updateWorkspace: false,
      fetchWorkspace: true,
    });
  };

  const deleteWorkspace = async () => {
    let deletedArray = workspace.list.filter(
      (item: any, index: number) => index !== workspace.current.index
    );
    setWorkspace({
      ...workspace,
      list: deletedArray,
      current: { index: 0, name: "" },
      modal: false,
      deleteWorkspace: false,
      loading: true,
    });

    let workspaceId = workspace.list[workspace.current.index]._id;
    let user = JSON.parse(sessionStorage.getItem("user")!);

    await axios.request({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASEURL}/workspace?del=${workspaceId}`,
      headers: {
        _id: user._id,
        Authorization: `Bearer ${user.token}`,
      },
    });
    setWorkspace({
      ...workspace,
      loading: false,
      modal: false,
      deleteWorkspace: false,
      fetchWorkspace: true,
    });
  };

  const submitWorkspaceForm = async (
    event: React.FormEvent<HTMLButtonElement>,
    form: WorkspaceFormProps
  ) => {
    event.preventDefault();
    let user = JSON.parse(sessionStorage.getItem("user")!); // !
    setWorkspace({ ...workspace, loading: true });

    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/workspace`,
        data: { name: form.name, description: form.description },
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkspace({
        ...workspace,
        loading: false,
        modal: false,
        createWorkspace: false,
        fetchWorkspace: true,
      });
    } catch (error: any) {
      console.error(error);
      setWorkspace({
        ...workspace,
        loading: false,
        createWorkspace: false,
        errorMsg: error.message,
      });
    }
  };

  const createBoard = async (
    event: FormEvent<HTMLButtonElement>,
    props: NewBoardProps
  ) => {
    event.preventDefault();
    setWorkspace({ ...workspace, loading: true });
    let user = JSON.parse(sessionStorage.getItem("user")!); // !
    let workspaceId = workspace.list[props.workspaceId]._id;
    try {
      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/workspace/board`,
        headers: { _id: user._id, Authorization: `Bearer ${user.token}` },
        data: {
          workspaceId: workspaceId,
          name: props.name,
          color: props.color,
        },
      });
      setWorkspace({
        ...workspace,
        loading: false,
        modal: false,
        createBoard: false,
        fetchWorkspace: true,
      });
    } catch (error: any) {
      console.error(error);
      setWorkspace({
        ...workspace,
        loading: false,
        modal: false,
        createBoard: false,
        fetchWorkspace: true,
      });
    }
  };

  useEffect(() => {
    async function getList() {
      let user = JSON.parse(sessionStorage.getItem("user")!); // !
      setWorkspace({ ...workspace, loading: true });
      try {
        const list = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/workspace`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
          },
        });
        setWorkspace({
          ...workspace,
          list: list.data,
          loading: false,
          fetchWorkspace: false,
        });
      } catch (error: any) {
        setWorkspace({
          ...workspace,
          errorMsg: error.message,
          loading: false,
          fetchWorkspace: false,
        });
      }
    }
    getList();
  }, [workspace.fetchWorkspace]);

  return (
    <div>
      {workspace.loading ? <Loader loading /> : null}
      {workspace.modal && workspace.createWorkspace ? (
        <WorkspaceModal
          type="Create"
          dismiss={() => dismissModal()}
          submit={(
            event: React.FormEvent<HTMLButtonElement>,
            props: WorkspaceFormProps
          ) => submitWorkspaceForm(event, props)}
        />
      ) : null}
      {workspace.modal && workspace.createBoard ? (
        <BoardModal
          list={workspace.list}
          dismiss={() => dismissModal()}
          create={(event: FormEvent<HTMLButtonElement>, props: NewBoardProps) =>
            createBoard(event, props)
          }
        />
      ) : null}
      {workspace.modal && workspace.updateWorkspace ? (
        <WorkspaceModal
          type="Update"
          dismiss={() => dismissModal()}
          formValues={{
            name: workspace.current.name,
            description: workspace.list[workspace.current.index].description,
          }}
          submit={(
            event: React.FormEvent<HTMLButtonElement>,
            props: WorkspaceFormProps
          ) => updateWorkspace(event, props)}
        />
      ) : null}
      {workspace.modal && workspace.deleteWorkspace ? (
        <Modal
          width={"full md:w-1/4"}
          height={"full md:h-1/3"}
          title={"Delete workspace"}
          content={`Do you want to delete ${workspace.current.name}?`}
          buttonValue={"Delete"}
          dismiss={() => dismissModal()}
          buttonClick={() => deleteWorkspace()}
        />
      ) : null}
      <Header
        bgColor="blue"
        isShadowed={false}
        fontSize="md"
        textColor="white"
        list={workspace.list}
        createMenuActive={workspace.createMenuActive}
        createMenuClicked={() => createMenuClicked()}
        createMenuDismiss={() => createMenuDismiss()}
        createBoardClicked={() => createBoardClicked()}
        createWorkspaceClicked={() => createWorkspaceClicked()}
      />
      <main className="w-screen md:w-full h-full flex justify-center">
        <MainNavbar
          createWorkspace={() => createWorkspaceClicked()}
          edit={(index: number) => editWorkspaceClicked(index)}
          ask={(index: number) => askDelete(index)}
          list={workspace.list}
        />
        <Workspaces
          list={workspace.list}
          createBoard={() => createBoardClicked()}
          edit={(index: number) => editWorkspaceClicked(index)}
          ask={(index: number) => askDelete(index)}
        />
      </main>
    </div>
  );
}
export default Workspace;