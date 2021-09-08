import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import ContextPopupHeader from "./ContextPropHeader";
import UserProfile from "./UserProfile";

type ProfileMenuProps = {
  click: () => void;
};

const ProfileMenu = (props: ProfileMenuProps) => {
  const auth = useAuth();

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
        <li className="m-2 cursor-pointer" onClick={auth.basicLogout}>
          Logout
        </li>
      </ul>
    </>
  );
};

export default ProfileMenu;
