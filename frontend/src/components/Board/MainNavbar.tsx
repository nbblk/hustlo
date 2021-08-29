import { faFlipboard } from "@fortawesome/free-brands-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainNavbar = () => {
  return (
    <nav className="hidden md:block md:w-1/5 m-10 font-krona">
      <ul>
        <li className="m-1 p-1 bg-blue-light">
          <span className="mx-2">
            <FontAwesomeIcon icon={faFlipboard} color="gray" />
          </span>
          Boards
        </li>
      </ul>
      <div className="my-24 p-1 flex justify-between">
        <span>WORKSPACE</span>
        <span>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </nav>
  );
};

export default MainNavbar;
