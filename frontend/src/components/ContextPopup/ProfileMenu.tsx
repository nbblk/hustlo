import { Link } from "react-router-dom";
import ContextPopupHeader from "./ContextPropHeader";
import UserProfile from "./UserProfile";

type ProfileMenuProps = {
  click: () => void;
};

const ProfileMenu = (props: ProfileMenuProps) => {
  return (
    <>
      <ContextPopupHeader title="Account" click={props.click} />
      <ul className="flex flex-col justify-even items-start">
        <UserProfile />
        <div className="w-full h-0.2 bg-gray"></div>
        <Link to="/settings">
          <li className="m-2">Settings</li>
        </Link>
        <Link to="/activity">
          <li className="m-2">Activity</li>
        </Link>
        <Link to="/logout">
          <li className="m-2">Logout</li>
        </Link>
      </ul>
    </>
  );
};

export default ProfileMenu;
