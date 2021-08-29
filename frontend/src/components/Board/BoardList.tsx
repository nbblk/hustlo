import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardList = () => {
  return (
    <div className="w-screen md:w-2/4 p-5">
      <section>
        <div className="m-4 font-krona">
          <span className="mx-2">
            <FontAwesomeIcon icon={faClock} color="gray" />
          </span>
          Recent viewed
        </div>
        <div className="w-80 h-40 m-5 p-4 flex rounded bg-gray-dark text-white font-nunito text-xl">
          <h3>Dev</h3>
        </div>
      </section>
      <section className="my-40">
        <div className="m-4 font-krona">YOUR WORKSPACES</div>
      </section>
    </div>
  );
};

export default BoardList;
