import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface MoveBoardMenuProps {
  workspaceId: string;
  clickBoardToMove: () => void;
}

const MoveBoardMenu = (props: MoveBoardMenuProps) => {
  const [board, setBoard] = useState({
    list: [],
    fetch: false,
  });

  useEffect(() => {
    const fetchTitles = async () => {
      let user = JSON.parse(sessionStorage.getItem("user")!);
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/board/list/titles`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
            workspaceId: props.workspaceId,
          },
        });
        const boards = result.data[0].boards;

        if (boards) {
          setBoard({ ...board, list: boards, fetch: false });
        }
      } catch (error) {
        setBoard({ ...board, fetch: false });
        console.error(error);
      }
    };
    fetchTitles();

    if (board.fetch) {
      fetchTitles();
    }
  }, []);
  return (
    <div className="absolute p-1 w-60 h-auto flex flex-col justify-center items-center bg-white rounded shadow`">
      <ul className="w-full">
        {board.list.map((board: any, index: number) => (
          <Link
            key={index}
            to={{
              pathname: `/board/${board._id}`,
              state: {
                workspaceId: props.workspaceId,
              },
            }}
          >
            <li
              data-id={board._id}
              className="w-full p-1 hover:bg-gray-regular cursor-pointer rounded text-center"
              onClick={props.clickBoardToMove}
            >
              {board.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MoveBoardMenu;
