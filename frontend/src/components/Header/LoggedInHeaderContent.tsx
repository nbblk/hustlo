import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonWithIcon from "../ButtonWithIcon";
import ProfileMenu from "../ContextPopup/ProfileMenu";
import CreateMenu from "../ContextPopup/CreateMenu";
import axios from "axios";

const LoggedInHeaderContent = (props: any) => {
  const [header, setHeader] = useState({
    isSearch: false,
    keyword: "",
    loading: false,
    result: [] as any,
    isHamburgerPopupActive: false,
    isNotificationPopupActive: false,
    isProfilePopupActive: false,
  });

  const profileContextPopup = () => {
    setHeader({
      ...header,
      isHamburgerPopupActive: false,
      isNotificationPopupActive: false,
      isProfilePopupActive: !header.isProfilePopupActive,
    });
  };

  useEffect(() => {
    const getResult = async () => {
      let user = JSON.parse(sessionStorage.getItem("user")!);
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/workspace/board?q=${header.keyword}`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
          },
        });
        setHeader({
          ...header,
          isSearch: true,
          keyword: "",
          loading: false,
          result: result.data,
        });
      } catch (error) {
        console.error(error);
        setHeader({ ...header, isSearch: false, keyword: "", loading: false });
      }
    };

    if (header.keyword.length > 0 && header.loading) {
      getResult();
    }
  }, [header.loading]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <a href="/" className="text-white text-lg">
          Hustlo
        </a>
        <div className="flex flex-col md:flex-row md:absolute md:right-0">
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
            click={props.createMenuClicked}
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
            value={JSON.parse(sessionStorage.getItem("user")!).firstLetter}
            click={() => profileContextPopup()}
          />
        </div>
        <div
          className={`${
            props.createMenuActive ? "block" : "hidden"
          } absolute w-full -right-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 md:transform-none md:w-1/5 md:top-12 md:right-0 h-auto p-4 z-40 bg-white text-center rounded shadow`}
        >
          <CreateMenu
            click={props.createMenuDismiss}
            createBoardClicked={props.createBoardClicked}
            createWorkspaceClicked={props.createWorkspaceClicked}
          />
        </div>
        <div
          className={`${
            header.isProfilePopupActive || props.profileMenuActive
              ? "block"
              : "hidden"
          } absolute w-full -right-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 md:transform-none md:w-1/5 md:top-12 md:right-0 h-auto p-4 z-40 bg-white text-center rounded shadow`}
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
