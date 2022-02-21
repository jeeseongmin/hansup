import Close from "image/close.png";
import Logo from "image/logo.png";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSidebar } from "reducers/setting";

const Sidebar = ({ isLogin }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.setting.sidebar);
  const loginToken = useSelector((state) => state.setting.loginToken);
  const currentEmail = useSelector((state) => state.setting.currentEmail);
  const currentPassword = useSelector((state) => state.setting.currentPassword);

  const selectMenu = async (url) => {
    history.push(url);
    dispatch(setSidebar("off"));
    window.scrollTo(0, 0);
    document.getElementById("scrollRef").scrollTo(0, 0);
  };

  return (
    <div
      class={
        "z-50 w-full h-full absolute left-0 top-0 flex flex-row transition delay-50 duration-150 " +
        (sidebar === "on" ? "opacity-100 z-50" : "opacity-0 z-0 hidden")
      }>
      <button
        onClick={() => dispatch(setSidebar("off"))}
        class='flex-1 h-screen bg-black opacity-50'></button>
      <div class=' w-36 sm:w-60 bg-hansupBrown h-screen top-0 left-0 flex flex-col justify-between px-8 py-8 text-white'>
        <button
          onClick={() => dispatch(setSidebar("off"))}
          class='w-full h-6 flex flex-row justify-end mb-16'>
          <img
            src={Close}
            class='h-full object-cover cursor-pointer'
            alt='close'
          />
        </button>
        <div class='flex-1 w-full flex flex-col font-bold text-lg sm:text-xl'>
          <div class='w-full text-center mb-8'>
            <button
              onClick={() => selectMenu("/intro/introduction")}
              class='cursor-pointer'>
              회사소개
            </button>
          </div>
          <div class='w-full text-center mb-8'>
            <button
              onClick={() => selectMenu("/business/restaurant")}
              class='cursor-pointer'>
              한숲사업
            </button>
          </div>
          <div class='w-full text-center mb-8'>
            <button
              onClick={() => selectMenu("/order/catering/menu")}
              class='cursor-pointer'>
              예약 안내
            </button>
          </div>
          <div class='w-full text-center mb-8'>
            <button
              onClick={() => selectMenu("/community/notice/list")}
              class='cursor-pointer'>
              커뮤니티
            </button>
          </div>
          <div class='w-full text-center mb-8'>
            <button
              onClick={() => selectMenu("/enterprise/hansup")}
              class='cursor-pointer'>
              협력기업
            </button>
          </div>
          {isLogin && (
            <div class='w-full text-center mb-8'>
              <button
                onClick={() => selectMenu("/manager/order/calendar")}
                class='cursor-pointer'>
                관리자
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => selectMenu("/")}
          class='w-full h-auto flex flex-col justify-end px-0 sm:px-4'>
          <img src={Logo} class='w-full object-cover cursor-pointer' alt='' />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
