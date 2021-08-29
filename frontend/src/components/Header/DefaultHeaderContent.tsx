import { Link } from "react-router-dom";
import Button from "../Button";
import Logo from "../Logo";

const DefaultHeaderContent = () => {
  return (
    <>
      <Logo textSize="md" withImage />
      <div>
        <Link to="/login">
          <Button
            width="32"
            height="8"
            color="transparent"
            textColor="blue"
            textSize="md"
            value="Log in"
          />
        </Link>
        <Link to="/signup">
          <Button
            width="32"
            height="8"
            color="blue"
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
