import { useAuth } from "../../hooks/use-auth";
import DefaultHeaderContent from "./DefaultHeaderContent";
import LoggedInHeaderContent from "./LoggedInHeaderContent";

interface HeaderProps {
  bgColor: string;
  isShadowed: boolean;
  textColor: string;
  fontSize: string;
  list?: [];
  createMenuActive?: boolean;
  createMenuClicked?: () => void;
  createMenuDismiss?: () => void;
  createBoardClicked?: () => void;
  createWorkspaceClicked?: () => void;
}

const Header = (props: HeaderProps) => {
  const style = `w-full m-0 p-2 sticky z-30 top-0 flex flex-col md:flex-row justify-center md:justify-between items-center bg-${
    props.bgColor
  } ${props.isShadowed ? "shadow boxShadow" : null} font-krona font-${
    props.fontSize
  } ${props.textColor}`;

  const auth = useAuth();

  return (
    <nav className={style}>
      {auth.loggedIn ? (
        <LoggedInHeaderContent
          createMenuActive={props.createMenuActive}
          createMenuClicked={props.createMenuClicked}
          createMenuDismiss={props.createMenuDismiss}
          createBoardClicked={props.createBoardClicked}
          createWorkspaceClicked={props.createWorkspaceClicked}
        />
      ) : (
        <DefaultHeaderContent />
      )}
    </nav>
  );
};

export default Header;
