import OrderListLayout from "components/Layout/OrderListLayout";
import React, { useState, useEffect, useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import orderList from "routes/order/catering/data/orderList";
import axios from "axios";
import useTitle from "hooks/useTitle";
const OrderStep2 = ({ info, setInfo, setStep, menuList, listLoading }) => {
  const updateTitle = useTitle("Loading...");
  setTimeout(
    () => updateTitle("한숲푸드 - 케이터링 예약 - 예약하기 - 메뉴 선택"),
    1000
  );
  const [menu, setMenu] = useState({
    mainMenu: [...menuList[0].menu].map((element, index) => {
      return element._id;
    }),
    subMenu: [...menuList[1].menu].map((element, index) => {
      return element._id;
    }),
    soup: [...info.soup],
    dessert: [...menuList[3].menu].map((element, index) => {
      return element._id;
    }),
  });
  const prevStep = () => {
    setStep(1);
    document.getElementById("scrollRef").scrollTo(0, 0);
  };

  // 모든 메뉴 선택 가능하도록 할 경우
  // const nextStep = () => {
  // 	if (menu["mainMenu"].length !== 4) {
  // 		alert("메인 메뉴를 4개 선택해주세요.");
  // 	} else if (menu["subMenu"].length !== 4) {
  // 		alert("식사 메뉴를 4개 선택해주세요.");
  // 	} else if (menu["soup"].length !== 1) {
  // 		alert("국 메뉴를 1개 선택해주세요.");
  // 	} else if (menu["dessert"].length !== 5) {
  // 		alert("디저트 메뉴를 5개 선택해주세요.");
  // 	} else {
  // 		const cp = { ...info };
  // 		cp["mainMenu"] = [...menu["mainMenu"]];
  // 		cp["subMenu"] = [...menu["subMenu"]];
  // 		cp["soup"] = [...menu["soup"]];
  // 		cp["dessert"] = [...menu["dessert"]];
  // 		setInfo(cp);
  // 		document.getElementById("scrollRef").scrollTo(0, 0);
  // 		setStep(3);
  // 	}
  // };

  // 국만 선택가능할 경우
  const nextStep = () => {
    if (false && menu["mainMenu"].length !== 4) {
      alert("메인 메뉴를 4개 선택해주세요.");
    } else if (false && menu["subMenu"].length !== 4) {
      alert("식사 메뉴를 4개 선택해주세요.");
    } else if (menu["soup"].length !== 1) {
      alert("국 메뉴를 1개 선택해주세요.");
    } else if (false && menu["dessert"].length !== 5) {
      alert("디저트 메뉴를 5개 선택해주세요.");
    } else {
      const cp = { ...info };
      cp["mainMenu"] = [...menu["mainMenu"]];
      cp["subMenu"] = [...menu["subMenu"]];
      cp["soup"] = [...menu["soup"]];
      cp["dessert"] = [...menu["dessert"]];
      setInfo(cp);
      document.getElementById("scrollRef").scrollTo(0, 0);
      setStep(3);
    }
  };

  return (
    <div class='w-full flex flex-col justify-center items-center'>
      <div class='w-full mb-8'>
        <div class='w-full flex flex-col text-center justify-center text-lg text-hansupBrown border-b border-hansupBrown pb-4 mb-4'>
          <p>
            한숲의 메뉴는 메인 메뉴, 식사 메뉴, 국, 디저트로 구성되어있습니다.
          </p>
          <p>
            메인 메뉴는 고정 메뉴 4가지와 자율 메뉴 1가지로 구성됩니다.{" "}
            <br></br>자율 메뉴는 추후 공지드릴 예정입니다.{" "}
          </p>
          <p>식사 메뉴는 고정 메뉴로 5가지로 구성됩니다.</p>
          <p class='text-red-500'>
            메인 메뉴, 식사 메뉴와 디저트는 현재 모든 메뉴가 제공되므로
            기본적으로 선택이 되어있습니다.
            <br></br>
            단, 국은 원하시는 종류의 국을 하나만 선택해주셔야 합니다.
          </p>
          <p>
            디저트는 서비스 차원으로 제공되므로, 타 메뉴와의 교체는 불가한 점
            양해부탁드립니다.
          </p>
        </div>
        {listLoading &&
          menuList.map((element, index) => {
            return (
              <OrderListLayout
                key={element}
                info={element}
                col={5}
                type={"select"}
                setMenu={setMenu}
                menuList={menu}
              />
            );
          })}{" "}
        <div class='w-full flex justify-center items-center'>
          <div class='w-full h-12 flex flex-row justify-between'>
            <button
              onClick={prevStep}
              class='w-36 md:w-60 cursor-pointer hover:bg-white hover:text-hansupBrown border border-hansupBrown transition delay-50 duration-150 h-full flex justify-center items-center bg-hansupBrown text-white font-bold text-xl'>
              <BsArrowLeft class='mr-2' /> 이전
            </button>
            <button
              onClick={nextStep}
              class='w-36 md:w-60 cursor-pointer hover:bg-white hover:text-hansupBrown border border-hansupBrown transition delay-50 duration-150 h-full flex justify-center items-center bg-hansupBrown text-white font-bold text-xl'>
              다음 <BsArrowRight class='ml-2' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStep2;
