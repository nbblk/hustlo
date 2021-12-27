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
      <ul className="w-full flex flex-col justify-even items-center text-sm">
        <UserProfile />
        <Link
          key="1"
          to="/settings"
          className="w-full m-1 p-1 hover:bg-gray-lightest"
        >
          <li>Settings</li>
        </Link>
        <Link
          key="2"
          to="/activity"
          className="w-full m-1 p-1 hover:bg-gray-lightest"
        >
          <li>Activity</li>
        </Link>
        <li
          key="3"
          className="w-full m-1 p-1 cursor-pointer hover:bg-gray-lightest"
          onClick={auth.basicLogout}
        >
          Logout
        </li>
      </ul>
    </>
  );
};

export default ProfileMenu;
