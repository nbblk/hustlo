import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import ContextPopupHeader from "./ContextPropHeader";

interface ChangeWOrkspaceProps {
  dismiss: () => void;
  workspaceId: string;
  boardId: string;
}

const ChangeWorkspaceMenu = (props: ChangeWOrkspaceProps) => {
  const [workspace, setWorkspace] = useState({
    lists: [],
    selected: { title: "", _id: "" },
    fetch: false,
    success: false,
  });

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    let title = event.target.value;
    let _id = event.target[event.target.selectedIndex].getAttribute("data-id");
    if (title && _id) {
      setWorkspace({ ...workspace, selected: { title: title, _id: _id } });
    }
  };

  const clickHandler = async () => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    try {
      await axios.request({
        method: "PATCH",
        url: `${process.env.REACT_APP_BASEURL}/board/workspace/change`,
        headers: {
          _id: user._id,
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          workspaceId: props.workspaceId,
          boardId: props.boardId,
          newWorkspaceId: workspace.selected._id,
        },
      });
      setWorkspace({
        ...workspace,
        fetch: true,
        success: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTitles = async () => {
      let user = JSON.parse(sessionStorage.getItem("user")!);
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/board/workspace/list`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
          },
        });
        const workspaces = result.data;
        if (workspaces) {
          setWorkspace({
            ...workspace,
            lists: workspaces,
            selected: { title: workspaces[0].name, _id: workspaces[0]._id },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTitles();

    if (workspace.fetch) {
      fetchTitles();
    }
  }, [workspace.fetch]);

  return (
    <div className="absolute z-50 left-2 w-60 h-40 p-3 bg-white rounded shadow">
      <ContextPopupHeader title="Change workspace" click={props.dismiss} />
      <div className="h-2/3 flex flex-col justify-around items-center">
        <select
          className="w-full h-6 border"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            changeHandler(event)
          }
        >
          {workspace.lists.map((workspace: any, index: number) => (
            <option key={index} data-id={workspace._id}>
              {workspace.name}
            </option>
          ))}
        </select>
        <Button
          height={"8"}
          width={"full"}
          bgColor={"blue"}
          textColor={"white"}
          hoverColor={"opacity-25"}
          value={"Change"}
          click={() => clickHandler()}
        />
        <small className="text-green">
          {workspace.success ? "Board moved successfully!" : null}
        </small>
      </div>
    </div>
  );
};

export default ChangeWorkspaceMenu;
