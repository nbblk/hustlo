import { ChangeEvent, useEffect, useState } from "react";
import { faBars, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonWithIcon from "../ButtonWithIcon";
import InputBox from "../InputBox";
import ProfileMenu from "../ContextPopup/ProfileMenu";
import CreateMenu from "../ContextPopup/CreateMenu";
import NotificationMenu from "../ContextPopup/NotificationMenu";
import HamburgerMenu from "../ContextPopup/HamburgerMenu";
import axios from "axios";
import Loader from "../Loader";

const LoggedInHeaderContent = (props: any) => {
  const [header, setHeader] = useState({
    isSearch: false,
    keyword: "",
    loading: false,
    result: [] as any,
    isHamburgerPopupActive: false,
    isCreatePopupActive: false,
    isNotificationPopupActive: false,
    isProfilePopupActive: false,
  });

  const searchBoardHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setHeader({
        ...header,
        isSearch: true,
        keyword: event.target.value,
        loading: true,
        result: [],
      });
    }
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
      <div className="relative hidden md:block">
        <ButtonWithIcon
          height="8"
          width="8"
          margin="2"
          padding="2"
          iconProp={faBars}
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
            list={props.list}
            click={() =>
              setHeader({ ...header, isHamburgerPopupActive: false })
            }
            createBoardClicked={props.createBoardClicked}
          />
        </div>
        <InputBox
          type="text"
          width="50"
          height="8"
          marginX="2"
          placeholder="Jump to..."
          change={(event: ChangeEvent<HTMLInputElement>) =>
            searchBoardHandler(event)
          }
        />
        {header.isSearch ? (
          <ResultPane
            isSearch={header.isSearch}
            loading={header.loading}
            result={header.result}
            list={props.list}
          />
        ) : null}
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
          value={JSON.parse(sessionStorage.getItem("user")!).firstLetter}
          click={() => profileContextPopup()}
        />
        <div
          className={`${
            header.isCreatePopupActive ? "block" : "hidden"
          } absolute right-0 w-80 h-80 p-4 z-50 bg-gray-lightest text-center`}
        >
          <CreateMenu
            click={() => setHeader({ ...header, isCreatePopupActive: false })}
            createBoardClicked={props.createBoardClicked}
            createWorkspaceClicked={props.createWorkspaceClicked}
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

export const ResultPane = (props: any) => {
  return (
    <div className="absolute top-10 left-12 w-96 h-50 flex fexl-col justify-center items-center bg-gray-lightest rounded shadow">
      {props.loading ? <Loader loading={true} /> : null}
      <ul className={`w-full h-50 p-2 my-4 text-left font-nunito`}>
        {props.isSearch
          ? props.result.map((workspace: any) => {
              return (
                <li
                  key={workspace._id}
                  className="w-full h-12 my-2 rounded opacity-50 bg-white flex justify-center items-center cursor-pointer"
                >
                  {workspace.name}
                </li>
              );
            })
          : props.list.map((workspace: any) => {
              return (
                <li
                  key={workspace._id}
                  className="w-full h-12 my-2 rounded opacity-50 bg-white flex justify-center items-center cursor-pointer"
                >
                  {workspace.name}
                </li>
              );
            })}
      </ul>
    </div>
  );
};
