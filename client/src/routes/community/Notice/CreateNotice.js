import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import NoticeFormBlock from "components/Block/NoticeFormBlock";
import Subtitle from "components/Subtitle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "hooks/useTitle";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CreateNotice = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(
    () => updateTitle("한숲푸드 - 커뮤니티 - 공지사항 - 작성하기"),
    1000
  );

  const history = useHistory();
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const passwordRef = useRef(null);
  const [includeImg, setIncludeImg] = useState(false);
  const currentEmail = useSelector((state) => state.setting.currentEmail);

  const [info, setInfo] = useState({
    title: "",
    content: "",
    fileList: [],
  });
  const changeInfo = (e, type) => {
    if (type === "fileList" || type === "content") {
      const cp = { ...info };
      cp[type] = e;
      setInfo(cp);
    } else {
      const cp = { ...info };
      cp[type] = e.target.value;
      setInfo(cp);
    }
  };

  const submit = () => {
    if (info.title === "") {
      alert("제목을 입력해주세요!");
      titleRef.current.focus();
    } else if (info.content === "") {
      alert("내용을 입력해주세요!");
      contentRef.current.focus();
    } else if (currentEmail === "master") {
      axios
        .post(
          "/api/notice/create",
          {
            key: process.env.REACT_APP_API_KEY,
            title: info.title,
            content: info.content,
            fileList: info.fileList,
            read: 0,
          },
          {
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          alert("업로드 되었습니다.");
          history.push("/community/notice/list");
          document.getElementById("scrollRef").scrollTo(0, 0);
        })
        .catch((response) => {
          console.log("Error!");
        });
    }
  };

  return (
    <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
      <div id='main' class='inline-flex w-full justify-between mb-6'>
        <Subtitle subtitle={"공지사항 작성하기"} />
      </div>
      <NoticeFormBlock
        changeInfo={changeInfo}
        titleRef={titleRef}
        contentRef={contentRef}
        info={info}
        isEdit={false}
      />

      <div class='flex justify-between items-center flex-col md:flex-row'>
        <Link
          class='mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
          to={"/community/notice/list"}
          onClick={() => window.scrollTo(0, 0)}>
          뒤로 가기
        </Link>
        <button
          onClick={submit}
          class=' w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'>
          제출하기
        </button>
      </div>
    </div>
  );
};

export default CreateNotice;
