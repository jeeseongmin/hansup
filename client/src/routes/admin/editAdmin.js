import React, { useEffect, useState, useRef } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginToken,
  setCurrentEmail,
  setCurrentPassword,
} from "../../reducers/setting";
import Layout from "../../components/Layout";

const EditAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const currentEmail = useSelector((state) => state.setting.currentEmail);
  const currentPassword = useSelector((state) => state.setting.currentPassword);

  const [info, setInfo] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (currentEmail === "" || currentPassword === "") {
      alert("로그인 후 이용가능합니다.");
      history.push("/admin");
    } else {
      const cp = {
        email: currentEmail,
        password: "",
        newPassword: "",
      };
      setInfo(cp);
    }
  }, []);

  const changeInfo = (e, type) => {
    const cp = { ...info };
    cp[type] = e.target.value;
    setInfo(cp);
  };

  async function onEdit() {
    if (info.password === "") {
      alert("현재 비밀번호를 입력해주세요.");
      passwordRef.current.focus();
    } else if (info.newPassword === "") {
      alert("새 비밀번호를 입력해주세요.");
      newPasswordRef.current.focus();
    }
    // 현재 비밀번호가 맞는지
    else if (info.password !== currentPassword) {
      alert("현재 비밀번호를 정확히 입력해주세요.");
    } else {
      let id;
      await axios
        .post(
          "/api/user/findbyemail",
          {
            key: process.env.REACT_APP_API_KEY,
            email: info.email,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((Response) => {
          id = Response.data[0]._id;
        })
        .catch((Error) => {
          console.log(Error);
        });

      await axios
        .post(
          "/api/user/update/" + id,
          {
            key: process.env.REACT_APP_API_KEY,
            email: info.email,
            password: info.newPassword,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          alert("비밀번호가 변경되었습니다!");
          dispatch(setCurrentPassword(info.newPassword));
          history.push("/");
        })
        .catch((response) => {
          console.log("Error!");
        });
    }
  }

  return (
    <Layout>
      <div class='w-full h-full flex flex-col'>
        <div>
          <div class='h-44 bg-purple-100 flex justify-center items-center '>
            <h1 class='text-4xl'>관리자 정보 변경</h1>
          </div>
        </div>
        <div class='flex-1 flex justify-center items-center py-8'>
          <div class='w-auto flex flex-col'>
            <div class='flex flex-row items-center mb-4'>
              <p class='w-32 mr-8 text-lg font-bold'>관리자 ID </p>
              <input
                ref={emailRef}
                type='text'
                class=' w-36 md:w-72 px-4 py-2 border- bg-gray-200 border-gray-300 focus:border-purple-700 '
                onChange={(e) => changeInfo(e, "email")}
                placeholder='관리자 ID'
                value={info.email}
                disabled={true}
              />
            </div>
            <div class='flex flex-row items-center mb-4'>
              <p class='w-32 mr-8 text-lg font-bold'>현재 password </p>
              <input
                ref={passwordRef}
                type='text'
                class='w-36 md:w-72 px-4 py-2 border-2 border-gray-300 focus:border-purple-700'
                onChange={(e) => changeInfo(e, "password")}
                placeholder='현재 password'
              />
            </div>
            <div class='flex flex-row items-center mb-4'>
              <p class='w-32 mr-8 text-lg font-bold'>변경 password</p>
              <input
                ref={newPasswordRef}
                type='text'
                class='w-36 md:w-72 px-4 py-2 border-2 border-gray-300 focus:border-purple-700'
                onChange={(e) => changeInfo(e, "newPassword")}
                placeholder='변경 password'
              />
            </div>
            <div class='flex flex-row items-center mb-4'>
              <Link
                to='/'
                class='cursor-pointer w-full py-2 border border-purple-400 text-purple-400 flex justify-center hover:bg-purple-400 hover:text-white'>
                홈으로
              </Link>
              <button
                onClick={onEdit}
                class='cursor-pointer w-full py-2 border border-purple-400 text-purple-400 flex justify-center hover:bg-purple-400 hover:text-white'>
                변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditAdmin;
