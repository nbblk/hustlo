import { ChangeEvent, ChangeEventHandler, EventHandler, useState } from "react";
import {
  faBell,
  faHamburger,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonWithIcon from "../ButtonWithIcon";
import InputBox from "../InputBox";
import ProfileMenu from "../ContextPopup/ProfileMenu";
import CreateMenu from "../ContextPopup/CreateMenu";
import NotificationMenu from "../ContextPopup/NotificationMenu";
import HamburgerMenu from "../ContextPopup/HamburgerMenu";

const LoggedInHeaderContent = () => {
  const [header, setHeader] = useState({
    boardSearchKeyword: "",
    isHamburgerPopupActive: false,
    isCreatePopupActive: false,
    isNotificationPopupActive: false,
    isProfilePopupActive: false,
  });

  const boardSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setHeader({ ...header, boardSearchKeyword: event.target.value });
    // api call
  };

  const hambugerContextPopup = () => {
    setHeader({
      ...header,
      isHamburgerPopupActive: !header.isHamburgerPopupActive,
      isCreatePopupActive: false,
      isNotificationPopupActive: false,
      isProfilePopupActive: false,
    });
  };

  const createContextPopup = () => {
    setHeader({
      ...header,
      isHamburgerPopupActive: false,
      isCreatePopupActive: !header.isCreatePopupActive,
      isNotificationPopupActive: false,
      isProfilePopupActive: false,
    });
  };

  const notificationContextPopup = () => {
    setHeader({
      ...header,
      isHamburgerPopupActive: false,
      isCreatePopupActive: false,
      isNotificationPopupActive: !header.isNotificationPopupActive,
      isProfilePopupActive: false,
    });
  };

  const profileContextPopup = () => {
    setHeader({
      ...header,
      isHamburgerPopupActive: false,
      isCreatePopupActive: false,
      isNotificationPopupActive: false,
      isProfilePopupActive: !header.isProfilePopupActive,
    });
  };

  return (
    <>
      <div className="flex items-center">
        <ButtonWithIcon
          height="8"
          width="8"
          margin="2"
          padding="2"
          iconProp={faHamburger}
          isIcon
          isCircle={false}
          textColor="white"
          fontSize="xs"
          value=""
          click={() => hambugerContextPopup()}
        />
        <div
          className={`${
            header.isHamburgerPopupActive ? "block" : "hidden"
          } absolute left-0 top-14 w-80 h-auto p-4 z-50 bg-gray-lightest text-center`}
        >
          <HamburgerMenu
            change={(event: ChangeEvent<HTMLInputElement>) =>
              boardSearchHandler(event)
            }
            click={() =>
              setHeader({ ...header, isHamburgerPopupActive: false })
            }
          />
        </div>
        <Link to="/main">
          <ButtonWithIcon
            height="8"
            width="8"
            margin="2"
            padding="2"
            iconProp={faHome}
            isIcon
            isCircle={false}
            textColor="white"
            fontSize="xs"
            value=""
          />
        </Link>
        <InputBox
          type="text"
          width="50"
          height="8"
          marginX="2"
          marginY="2"
          placeholder="Jump to..."
          style="hidden md:block"
          change={() => {
            console.log("searchbox");
          }}
        />
      </div>
      <h1 className="text-white text-lg">Hustlo</h1>
      <div>
        <ButtonWithIcon
          height="8"
          width="8"
          margin="2"
          padding="2"
          iconProp={faPlus}
          isIcon
          isCircle={false}
          textColor="white"
          fontSize="xs"
          value=""
          click={() => createContextPopup()}
        />
        <ButtonWithIcon
          height="8"
          width="8"
          margin="2"
          padding="2"
          iconProp={faBell}
          isIcon
          isCircle={false}
          textColor="white"
          fontSize="xs"
          value=""
          click={() => notificationContextPopup()}
        />
        <ButtonWithIcon
          height="8"
          width="8"
          margin="2"
          padding="1"
          iconProp={null}
          isIcon={false}
          isCircle={true}
          textColor="white"
          fontSize="xs"
          value="BS"
          click={() => profileContextPopup()}
        />
        <div
          className={`${
            header.isCreatePopupActive ? "block" : "hidden"
          } absolute right-0 w-80 h-80 p-4 z-50 bg-gray-lightest text-center`}
        >
          <CreateMenu
            click={() => setHeader({ ...header, isCreatePopupActive: false })}
          />
        </div>
        <div
          className={`${
            header.isNotificationPopupActive ? "block" : "hidden"
          } absolute right-0 w-80 h-80 p-4 z-50 bg-gray-lightest text-center`}
        >
          <NotificationMenu
            click={() =>
              setHeader({ ...header, isNotificationPopupActive: false })
            }
          />
        </div>
        <div
          className={`${
            header.isProfilePopupActive ? "block" : "hidden"
          } absolute right-0 w-80 h-80 p-4 z-50 bg-gray-lightest text-center`}
        >
          <ProfileMenu
            click={() => setHeader({ ...header, isProfilePopupActive: false })}
          />
        </div>
      </div>
    </>
  );
};

export default LoggedInHeaderContent;
