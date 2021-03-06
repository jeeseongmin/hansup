import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setCurrentEmail,
  setCurrentPassword,
  setLoginToken,
  setProfile,
} from "reducers/setting";

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const changeInfo = (e, type) => {
    const cp = { ...info };
    cp[type] = e.target.value;
    setInfo(cp);
  };

  const loginCheck = () => {
    axios
      .post(
        "/api/login",
        {
          key: process.env.REACT_APP_API_KEY,
          email: info.email,
          password: info.password,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.loginToken) {
          dispatch(setLoginToken("login"));
          dispatch(setCurrentEmail(info.email));
          dispatch(setCurrentPassword(info.password));
          dispatch(setProfile("off"));
          sessionStorage.setItem("loginToken", true);
          alert("로그인되었습니다.");
          history.push("/");
        } else {
          alert("올바른 정보를 입력해주세요.");
          emailRef.current.focus();
        }
      })
      .catch((response) => {
        console.log("Error!");
      });
  };

  function enterkey() {
    if (window.event.keyCode === 13) {
      loginCheck();
    }
  }

  return (
    <div class='w-full flex-1 flex justify-center items-center'>
      <div class=''>
        <div class='w-96 my-16 h-auto flex flex-col px-4 py-2 justify-center items-center border border-hansupBrown bg-white shadow-xl'>
          <input
            ref={emailRef}
            type='text'
            class='w-full p-4 border-b-2 border-gray-300 focus:border-hansupBrown'
            onChange={(e) => changeInfo(e, "email")}
            placeholder='관리자 ID'
          />
          <input
            ref={passwordRef}
            onKeyUp={enterkey}
            type='text'
            class='w-full p-4 border-b-2 border-gray-300 focus:border-hansupBrown'
            onChange={(e) => changeInfo(e, "password")}
            placeholder='관리자 password'
          />
          <div class='w-full pt-6 pb-4 flex flex-col justify-betnween items-bet'>
            <button
              onClick={loginCheck}
              class='cursor-pointer border py-2 mb-4 text-center border-hansupBrown bg-hansupBrown rounded-sm text-white font-bold shadow-xl hover:opacity-70'>
              로그인
            </button>
            <button
              onClick={() => history.push("/")}
              class='cursor-pointer border py-2 text-center border-gray-600 bg-gray-500 rounded-sm text-white font-bold shadow-xl hover:opacity-70 hover:border-gray-400'>
              홈으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
