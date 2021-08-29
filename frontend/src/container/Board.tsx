import BoardList from "../components/Board/BoardList";
import MainNavbar from "../components/Board/MainNavbar";
import Header from "../components/Header/Header";

function Board() {
  return (
    <div>
      <Header
        bgColor="blue"
        isShadowed={false}
        fontSize="md"
        textColor="white"
      />
      <main className="w-screen md:w-full h-full flex justify-center">
        <MainNavbar />
        <BoardList />
      </main>
    </div>
  );
}
export default Board;
