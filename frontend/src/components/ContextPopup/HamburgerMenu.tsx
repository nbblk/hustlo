import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import InputBox from "../InputBox";
import Loader from "../Loader";
import ContextPopupHeader from "./ContextPropHeader";

const HamburgerMenu = (props: any) => {
  const [search, setSearch] = useState({
    isSearch: false,
    keyword: "",
    loading: false,
    result: [] as any,
  });

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setSearch({
        isSearch: true,
        keyword: event.target.value,
        loading: true,
        result: [],
      });
    }
  };

  useEffect(() => {
    const getResult = async () => {
      let user = JSON.parse(sessionStorage.getItem("user")!);
      let result;
      try {
        result = await axios.request({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/workspace/board?q=${search.keyword}`,
          headers: {
            _id: user._id,
            Authorization: `Bearer ${user.token}`,
          },
        });
        setSearch({
          isSearch: true,
          keyword: "",
          loading: false,
          result: result.data,
        });
      } catch (error) {
        console.error(error);
        setSearch({ ...search, isSearch: false, keyword: "", loading: false });
      }
    };

    if (search.keyword.length > 0 && search.loading) {
      getResult();
    }
  }, [search.loading]);

  return (
    <>
      <ContextPopupHeader title="" click={props.click} />
      <InputBox
        type="text"
        placeholder="Find boards by name..."
        width="full"
        height="10"
        change={(event: ChangeEvent<HTMLInputElement>) => searchHandler(event)}
      />
      {search.loading ? <Loader loading={true} /> : null}
      {/* <ul className={`${search.loading ? 'hidden' : 'block'} my-4 text-left font-nunito`}>
        {search.isSearch
          ? search.result.map((workspace: any) => {
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
        <li
          onClick={props.createBoardClicked}
          className="underline cursor-pointer text-sm"
        >
          Create new board...
        </li>
      </ul> */}
    </>
  );
};

export default HamburgerMenu;
