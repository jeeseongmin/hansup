import React from "react";
import SubmenuButton from "components/Button/SubmenuButton";

const SubmenuBlock = ({ menu }) => {
  const submenuArr = [
    ["인사말", "한숲의 이야기", "한숲의 역사", "오시는 길"],
    ["수화식당", "케이터링", "한숲 도시락"],
    ["케이터링 메뉴", "케이터링 안내"],
    // ["케이터링 메뉴", "케이터링 안내", "케이터링 예약"],
    ["공지사항", "리뷰", "고객의 소리"],
    ["한숲맛이야기"],
    ["예약확인", "예약관리", "메뉴관리", "고객의 소리"],
    [""],
  ];
  const submenuArr2 = [
    ["소개", "이야기", "역사", "길 안내"],
    ["수화식당", "케이터링", "한숲 도시락"],
    ["메뉴보기", "안내", "예약하기"],
    ["공지사항", "리뷰", "고객의 소리"],
    ["한숲맛이야기"],
    ["예약확인", "예약관리", "메뉴관리", "고객의 소리"],
    [""],
  ];
  const linkArr = [
    ["/intro/introduction", "/intro/story", "/intro/history", "/intro/guide"],
    ["/business/restaurant", "/business/catering", "/business/box"],
    ["/order/catering/menu", "/order/catering/intro"],
    // [
    //   "/order/catering/menu",
    //   "/order/catering/intro",
    //   "/order/catering/orderMain",
    // ],
    [
      "/community/notice/list",
      "/community/review/list",
      "/community/voice/main",
    ],
    ["/enterprise/hansup"],
    [
      "/manager/order/calendar",
      "/manager/order/list/all",
      "/manager/menu/catering",
      "/manager/voice/all",
    ],
    [""],
  ];
  return (
    <>
      <div
        class={
          "w-full hidden md:flex flex-row justify-center transition delay-50 duration-300 items-center border-b border-gray-400 " +
          (menu === 7 ? "h-0" : "h-12")
        }
      >
        {menu !== 7 &&
          submenuArr[menu].map((element, index) => {
            return (
              <SubmenuButton
                text={element}
                current={linkArr[menu][index]}
                key={element}
              />
            );
          })}
      </div>
      {/* 반응형일 때 메뉴별 subtitle 변경 */}
      <div
        class={
          "w-full flex md:hidden flex-row justify-center transition delay-50 duration-300 items-center border-b border-gray-400 " +
          (menu === 7 ? "h-0" : "h-12")
        }
      >
        {menu !== 7 &&
          submenuArr2[menu].map((element, index) => {
            return (
              <SubmenuButton
                text={element}
                current={linkArr[menu][index]}
                key={element}
              />
            );
          })}
      </div>
    </>
  );
};

export default SubmenuBlock;
