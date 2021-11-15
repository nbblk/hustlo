import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const Archived = (props: any) => {
  const { workspaceId, boardId } = props.location.state;

  const [archived, setArchived] = useState({
    lists: [],
    loading: false,
    fetch: false,
  });

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user")!);
    const fetch = async () => {
      let result;

      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/board/${boardId}/archived`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
            workspaceId: workspaceId,
          },
        });
        const curBoard = result.data[0];
        console.log(curBoard);
        setArchived({
          ...archived,
          lists: curBoard.lists,
        });
      } catch (error) {
        console.error(error);
        setArchived({ ...archived, loading: false, fetch: false });
      }
    };
    fetch();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-lightest">
      <ul>
        {archived.lists.map((list: any) => (
          <li>{list.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(Archived);
