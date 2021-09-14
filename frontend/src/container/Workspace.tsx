import axios from "axios";
import { useEffect, useState } from "react";
import MainNavbar from "../components/Board/MainNavbar";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";
import { WorkspaceFormProps } from "../components/Modal/WorkspaceModal";
import WorkspaceModal from "../components/Modal/WorkspaceModal";
import Workspaces from "../components/Board/Workspaces";
import Modal from "../components/Modal";

function Workspace() {
  const [workspace, setWorkspace] = useState({
    create: false,
    update: false,
    loading: false,
    modal: false,
    errorMsg: "",
    list: [] as any,
    fetch: false,
    delete: false,
    current: { index: 0, name: "" },
  });

  const dismissModal = () => {
    setWorkspace({ ...workspace, modal: false });
  };

  const createWorkspaceClicked = () => {
    setWorkspace({ ...workspace, modal: true, create: true });
  };

  const editWorkspaceClicked = (index: number) => {
    setWorkspace({
      ...workspace,
      current: { index: index, name: workspace.list[index].name },
      modal: true,
      update: true,
    });
  };
  
  const askDelete = (index: number) => {
    setWorkspace({
      ...workspace,
      current: { name: workspace.list[index].name, index: index },
      modal: true,
      delete: true,
    });
  };

  const updateWorkspace = async (
    event: React.FormEvent<HTMLButtonElement>,
    props: WorkspaceFormProps
  ) => {
    event.preventDefault();
    let newArray = workspace.list.map((item: any, i: number) =>
      workspace.current.index === i ? { ...item, props} : item
    );
    setWorkspace({
      ...workspace,
      list: newArray,
      current: { index: 0, name: "" },
      modal: false,
      update: false,
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
      update: false,
      fetch: true,
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
      delete: false,
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
      delete: false,
      fetch: true,
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
        create: false,
        fetch: true,
      });
    } catch (error: any) {
      console.error(error);
      setWorkspace({
        ...workspace,
        loading: false,
        errorMsg: error.message,
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
        console.dir(list);
        setWorkspace({
          ...workspace,
          list: list.data,
          loading: false,
          fetch: false,
        });
      } catch (error: any) {
        setWorkspace({
          ...workspace,
          errorMsg: error.message,
          loading: false,
          fetch: false,
        });
      }
    }
    getList();
  }, [workspace.fetch]);

  return (
    <div>
      {workspace.loading ? <Loader loading /> : null}
      {workspace.modal && workspace.create ? (
        <WorkspaceModal
          type="Create"
          dismiss={() => dismissModal()}
          submit={(
            event: React.FormEvent<HTMLButtonElement>,
            props: WorkspaceFormProps
          ) => submitWorkspaceForm(event, props)}
        />
      ) : null}
      {workspace.modal && workspace.update ? (
        <WorkspaceModal
          type="Update"
          dismiss={() => dismissModal()}
          formValues={{ name: workspace.current.name, description: workspace.list[workspace.current.index].description }}
          submit={(
            event: React.FormEvent<HTMLButtonElement>,
            props: WorkspaceFormProps
          ) => updateWorkspace(event, props)}
        />
      ) : null}
      {workspace.modal && workspace.delete ? (
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
        createWorkspaceClicked={() => createWorkspaceClicked()}
      />
      <main className="w-screen md:w-full h-full flex justify-center">
        <MainNavbar
          create={() => createWorkspaceClicked()}
          list={workspace.list}
        />
        <Workspaces
          list={workspace.list}
          edit={(index: number) => editWorkspaceClicked(index)}
          ask={(index: number) => askDelete(index)}
        />
      </main>
    </div>
  );
}
export default Workspace;
