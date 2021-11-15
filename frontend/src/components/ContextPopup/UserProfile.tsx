const UserProfile = () => {
  const userProfile = JSON.parse(sessionStorage.getItem("user")!);

  return (
    <li className="m-1 flex justify-center items-center">
      <div className="w-10 h-10 m-3 flex justify-center items-center rounded-full bg-green">
        <span>{userProfile.firstLetter}</span>
      </div>
      <div className="flex flex-col justify-start text-sm">
        <h3>{userProfile.email}</h3>
      </div>
    </li>
  );
};

export default UserProfile;
