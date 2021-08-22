import { useAuth } from "../hooks/use-auth";

function Board() {
  const auth = useAuth();

  return (
    <div>
      Board!!! <button onClick={auth.logout}>logout</button>
    </div>
  );
}
export default Board;
