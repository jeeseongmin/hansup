import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ReviewFormBlock from "components/Block/ReviewFormBlock";
import Subtitle from "components/Subtitle";
import axios from "axios";

const CreateReview = () => {
  const history = useHistory();
  const contentRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [info, setInfo] = useState({
    content: "",
    email: "",
    password: "",
    response: "",
    imgList: [],
  });
  const changeInfo = (e, type) => {
    if (type === "imgList") {
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
    if (info.content === "") {
      alert("내용을 입력해주세요!");
      contentRef.current.focus();
    } else if (info.email === "") {
      alert("이메일을 입력해주세요!");
      emailRef.current.focus();
    } else if (info.password === "") {
      alert("패스워드를 입력해주세요!");
      passwordRef.current.focus();
    } else if (info.imgList.length === 0) {
      alert("1개 이상의 이미지를 업로드 해주세요.");
    } else {
      console.log("info", info);

      axios
        .post(
          "/api/review/create",
          {
            key: process.env.REACT_APP_API_KEY,
            content: info.content,
            email: info.email,
            password: info.password,
            response: info.response,
            imgList: info.imgList,
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
          history.push("/community/review/list");
          document.getElementById("scrollRef").scrollTo(0, 0);
        })
        .catch((response) => {
          console.log("Error!");
        });
    }
  };

  return (
    <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
      <div class='inline-flex w-full mb-6'>
        <Subtitle subtitle={"리뷰 작성하기"} />
      </div>
      <ReviewFormBlock
        contentRef={contentRef}
        emailRef={emailRef}
        passwordRef={passwordRef}
        changeInfo={changeInfo}
        info={info}
        isEdit={false}
      />

      <div class='flex justify-between items-center flex-col md:flex-row'>
        <Link
          class='mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
          to={"/community/review/list"}
          onClick={() => window.scrollTo(0, 0)}>
          뒤로 가기
        </Link>
        <button
          onClick={submit}
          class='outline-none w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'>
          제출하기
        </button>
      </div>
    </div>
  );
};

export default CreateReview;
