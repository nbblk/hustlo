import { useAuth } from "../../hooks/use-auth";
import DefaultHeaderContent from "./DefaultHeaderContent";
import LoggedInHeaderContent from "./LoggedInHeaderContent";

type HeaderProps = {
  bgColor: string;
  isShadowed: boolean;
  textColor: string;
  fontSize: string;
};

const Header = (props: HeaderProps) => {
  const style = `w-full m-0 p-1.5 sticky z-50 top-0 flex justify-between items-center bg-${
    props.bgColor
  } ${props.isShadowed ? "shadow boxShadow" : null} font-krona font-${
    props.fontSize
  } ${props.textColor}`;

  const auth = useAuth();

  return (
    <nav className={style}>
      {auth.loggedIn ? <LoggedInHeaderContent /> : <DefaultHeaderContent />}
    </nav>
  );
};

export default Header;
