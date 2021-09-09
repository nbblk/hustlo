import { Link } from "react-router-dom";
import Button from "../Button";
import Logo from "../Logo";

const DefaultHeaderContent = () => {
  return (
    <>
      <Logo textSize="2xl" withImage/>
      <div className="w-full md:w-auto flex flex-col md:flex-row">
        <Link to="/login">
          <Button
            width="full md:w-32"
            height="8"
            bgColor="transparent"
            textColor="blue"
            textSize="md"
            value="Log in"
          />
        </Link>
        <Link to="/signup">
          <Button
            width="full md:w-32"
            height="8"
            bgColor="blue"
            borderColor="transparent"
            textColor="white"
            textSize="md"
            value="Sign up"
          />
        </Link>
      </div>
    </>
  );
};

export default DefaultHeaderContent;
