import { useState } from "react";

const Backdrop = () => {
  const [active, setActive] = useState(true);

  return (
    <div
      className={`${
        active ? "block" : "hidden"
      } w-screen h-full fixed bg-black opacity-50 z-40`}
      onClick={() => setActive(!active)}
    ></div>
  );
};

export default Backdrop;
