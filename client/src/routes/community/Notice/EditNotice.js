import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import NoticeFormBlock from "components/Block/NoticeFormBlock";
import Subtitle from "components/Subtitle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EditNotice = (props) => {
  const history = useHistory();
  const [info, setInfo] = useState({
    title: props.info.title,
    content: props.info.content,
    fileList: props.info.fileList,
    read: props.info.fileList,
  });
  const id = props.id;
  const pages = props.pages;
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const currentEmail = useSelector((state) => state.setting.currentEmail);

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

  useEffect(() => {
    setInfo(props.info);
  }, []);

  const editSave = () => {
    if (info.title === "") {
      alert("제목을 입력해주세요!");
      titleRef.current.focus();
    } else if (info.content === "") {
      alert("내용을 입력해주세요!");
    } else if (currentEmail === "master" || currentEmail === info.type) {
      axios
        .post(
          "/api/notice/update/" + id,
          {
            key: process.env.REACT_APP_API_KEY,
            title: info.title,
            content: info.content,
            fileList: info.fileList,
            read: info.read,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          alert("저장되었습니다.");
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
        isEdit={true}
      />

      <div class='flex justify-between items-center flex-col md:flex-row'>
        <Link
          class='mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
          to={"/community/notice/list"}
          onClick={() => window.scrollTo(0, 0)}>
          뒤로 가기
        </Link>
        <button
          onClick={editSave}
          class=' w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'>
          제출하기
        </button>
      </div>
    </div>
  );
};

export default EditNotice;
