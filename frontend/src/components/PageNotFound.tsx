import { useHistory } from "react-router";

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center font-krona">
      <h1 className="text-2xl">Oops! Page not found</h1>
      <button
        className="block my-10 bg-transparent cursor-pointer text-lg text-blue"
        onClick={() => history.goBack()}
      >
        Go back
      </button>
    </div>
  );
};

export default PageNotFound;
