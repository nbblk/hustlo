import { useAuth } from "../../hooks/use-auth";

const UserProfile = () => {
  const auth = useAuth(); // add username and email address to states

  return (
    <li className="m-2 flex justify-center items-center">
      <div className="w-12 h-12 m-4 flex justify-center items-center rounded-full bg-green">
        <span>BS</span>
      </div>
      <div className="flex flex-col justify-start">
        <h3>username</h3>
        <small>email address</small>
      </div>
    </li>
  );
};

export default UserProfile;
