import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import VoiceListBlock from "components/Block/VoiceListBlock";
import PageLayout from "components/Layout/PageLayout";
import Paging from "components/Paging";
import Subtitle from "components/Subtitle";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory } from "react-router-dom";

const Voice = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [voiceList, setVoiceList] = useState([]);
  const modalMenuRef = useRef();

  useEffect(() => {
    axios
      .post(
        "/api/voice/page/" + page + "/" + match.params.type,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setVoiceList(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [page, match.params.type]);

  const [newMenu, setNewMenu] = useState("all");

  useEffect(() => {
    setNewMenu(match.params.type);
  }, [match.params.type]);

  useEffect(() => {
    axios
      .post(
        "/api/voice/type/" + match.params.type,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setTotalPage(Math.ceil(Response.data.length / 10));
        setLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [voiceList, match.params.type]);

  const [modalMenu, setModalMenu] = useState(false);
  const onToggleMenu = () => {
    setModalMenu(!modalMenu);
  };

  const onChangeMenu = (name) => {
    history.push("/manager/voice/" + name);
    onToggleMenu();
  };

  useEffect(() => {
    if (!modalMenu) return;
    function handleClick(e) {
      if (modalMenuRef.current === null) {
        return;
      } else if (!modalMenuRef.current.contains(e.target)) {
        setModalMenu(false);
      }
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [modalMenu]);

  return (
    <PageLayout>
      <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
        <div class='w-full flex flex-row justify-between items-center mb-4'>
          <div class='inline-flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-6'>
            <Subtitle subtitle={"고객의 소리"} />
            <div
              ref={modalMenuRef}
              class='relative cursor-pointer mt-4 md:mt-0 w-full md:w-48 h-12 border-2 border-hansupBrown'>
              <button
                onClick={onToggleMenu}
                class='w-full h-full flex justify-between items-center text-hansupBrown font-bold'>
                <div class=' w-12 h-full'></div>
                {newMenu === "all" && <p>전체보기</p>}
                {newMenu === "unread" && <p>안읽음</p>}
                {newMenu === "readcheck" && <p>읽음</p>}

                <div class=' w-12 h-full flex justify-center items-center'>
                  <IoIosArrowDown size={28} />
                  {/* <IoIosArrowUp size={28} /> */}
                </div>
              </button>
              <div
                class={
                  "z-30 absolute shadow-xl font-bold w-full h-36 left-0 top-12 border-l-2 border-r-2 border-t-2 border-hansupBrown grid-rows-3 " +
                  (modalMenu ? "grid" : "hidden")
                }>
                <button
                  onClick={() => onChangeMenu("all")}
                  class={
                    "flex justify-center items-center border-b-2 border-hansupBrown " +
                    (newMenu === "all"
                      ? "bg-hansupBrown text-white"
                      : "bg-white text-hansupBrown")
                  }>
                  전체보기
                </button>
                <button
                  onClick={() => onChangeMenu("unread")}
                  class={
                    "flex justify-center items-center border-b-2 border-hansupBrown " +
                    (newMenu === "unread"
                      ? "bg-hansupBrown text-white"
                      : "bg-white text-hansupBrown")
                  }>
                  {" "}
                  안읽음
                </button>
                <button
                  onClick={() => onChangeMenu("readcheck")}
                  class={
                    "flex justify-center items-center border-b-2 border-hansupBrown " +
                    (newMenu === "readcheck"
                      ? "bg-hansupBrown text-white"
                      : "bg-white text-hansupBrown")
                  }>
                  {" "}
                  읽음
                </button>
              </div>
            </div>
          </div>
          {/* <Link
						to="/community/voice/create"
						class="w-32 text-hansupBrown text-lg flex flex-row justify-end items-center"
					>
						<p class="mr-2">작성하기</p> <VscArrowRight size={24} />
					</Link> */}
        </div>
        {loading ? (
          voiceList.length === 0 ? (
            <div class='w-full h-24 flex justify-center items-center'>
              <p>고객의 소리가 없습니다.</p>
            </div>
          ) : (
            <VoiceListBlock voiceList={voiceList} type={match.params.type} />
          )
        ) : (
          <div class='w-full h-24 flex justify-center items-center'>
            <CircularProgress />
          </div>
        )}

        <div class='w-full mt-8'>
          <Paging setPage={setPage} page={page} total={totalPage} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Voice;
