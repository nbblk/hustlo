import { useState } from "react";

const Backdrop = (props: { dismiss: () => void }) => {
  const [active] = useState(true);

  return (
    <div
      className={`${
        active ? "block" : "hidden"
      } w-screen h-full fixed bg-black opacity-50 z-40`}
      onClick={props.dismiss}
    ></div>
  );
};

export default Backdrop;
