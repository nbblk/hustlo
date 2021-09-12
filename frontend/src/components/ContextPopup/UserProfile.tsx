const UserProfile = () => {
  const userProfile = JSON.parse(sessionStorage.getItem("user")!);

  return (
    <li className="m-2 flex justify-center items-center">
      <div className="w-12 h-12 m-4 flex justify-center items-center rounded-full bg-green">
        <span>{userProfile.firstLetter}</span>
      </div>
      <div className="flex flex-col justify-start">
        <h3>{userProfile.email}</h3>
      </div>
    </li>
  );
};

export default UserProfile;
