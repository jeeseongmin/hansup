import React, { useEffect, useState } from "react";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import RadioButton from "components/Button/RadioButton";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { setRefreshOrder } from "reducers/common";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "hooks/useTitle";

const OrderStep3 = ({
  info,
  setInfo,
  setStep,
  changeInfo,
  allMenuList,
  menuList,
}) => {
  const updateTitle = useTitle("Loading...");
  setTimeout(
    () => updateTitle("한숲푸드 - 케이터링 예약 - 예약하기 - 결제"),
    1000
  );
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const prevStep = () => {
    setStep(2);
    document.getElementById("scrollRef").scrollTo(0, 0);
  };
  const refresh_order = useSelector((state) => state.common.refresh_order);

  const handleChange = (e) => {
    const cp = { ...info };
    cp["payment"] = e.target.value;
    setInfo(cp);
  };

  const onChangeNumber = (e) => {
    const cp = { ...info };
    cp["cashReceipt"].number = e.target.value;
    setInfo(cp);
  };

  useEffect(() => {
    const cp = { ...info };
    cp["cashReceipt"].status = selected;
    cp["cashReceipt"].type = selected2 ? "business" : "personal";
  }, [selected, selected2]);

  const nextStep = async () => {
    await axios
      .post(
        "/api/order/create",
        {
          key: process.env.REACT_APP_API_KEY,
          name: info.name,
          phone: info.phone1 + "-" + info.phone2 + "-" + info.phone3,
          count: info.count,
          request: info.request,
          date: info.date,
          delivery: info.delivery,
          address: info.address1 + " " + info.address2,
          mainMenu: info.mainMenu,
          subMenu: info.subMenu,
          soup: info.soup,
          dessert: info.dessert,
          payment: info.payment,
          cashReceipt: info.cashReceipt,
          payed: false,
        },
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setStep(4);
        document.getElementById("scrollRef").scrollTo(0, 0);
        if (refresh_order === "create") {
          dispatch(setRefreshOrder("recreate"));
        } else dispatch(setRefreshOrder("create"));
      })
      .catch((response) => {
        console.log("Error!");
      });
  };
  return (
    <div class="w-full flex flex-col justify-center items-center">
      <div class="h-full px-6 py-8 w-full md:w-2/3 lg:w-1/2 border border-gray-200 shadow-lg">
        <InfoBlock title={"예약자 정보 확인"}>
          <div class="flex flex-col -mt-4">
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                이름
              </div>
              <div class="w-full md:flex-1 text-xl">{info.name}</div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                연락처
              </div>
              <div class="w-full md:flex-1 text-xl">
                {info.phone1}-{info.phone2}-{info.phone3}
              </div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                인분
              </div>
              <div class="w-full md:flex-1 text-xl">{info.count} 인분</div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                요청사항
              </div>
              <div class="w-full md:flex-1 text-xl">
                {info.request === "" ? "없음" : info.request}
              </div>
            </div>
          </div>
        </InfoBlock>
        <InfoBlock title={"예약 일정 정보 확인"}>
          <div class="flex flex-col -mt-4">
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                날짜
              </div>
              <div class="w-full md:flex-1 text-xl">
                {info.date.getFullYear()}년 {info.date.getMonth() + 1}월{" "}
                {info.date.getDate()}일
              </div>
              {/* <div class='w-full md:flex-1 text-xl'>
                {info.year}년 {info.month}월 {info.day}일
              </div> */}
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                시간
              </div>
              <div class="w-full md:flex-1 text-xl">
                {info.date.getHours()}시 {info.date.getMinutes()}분
              </div>
              {/* <div class='w-full md:flex-1 text-xl'>
                {info.hour}시 {info.minute}분
              </div> */}
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                수령방식
              </div>
              <div class="w-full md:flex-1 text-xl">
                {info.delivery === "delivery" ? "배달" : "직접 수령"}
              </div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
              {info.delivery === "self" ? (
                <></>
              ) : (
                <>
                  <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                    배달장소
                  </div>
                  <div class="w-full md:flex-1 text-xl">
                    {info.address1} <br></br>
                    {info.address2}
                  </div>
                </>
              )}
            </div>
          </div>
        </InfoBlock>
        <InfoBlock title={"예약 메뉴 확인"}>
          <div class="flex flex-col -mt-4">
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                메인메뉴
              </div>
              <div class="w-full md:flex-1 text-xl">
                {/* {menuList[0].menu
									.filter(function (element, index) {
										return element.type === "mainMenu";
									})
									.map((element, index) => {
										return element.name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")} */}

                {info.mainMenu
                  .map((element, index) => {
                    return allMenuList[element].name;
                  })
                  .sort((a, b) => a.createdAt - b.createAt)
                  .join(", ")}
              </div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                식사메뉴
              </div>
              <div class="w-full md:flex-1 text-xl">
                {/* {menuList[1].menu
									.filter(function (element, index) {
										return element.type === "subMenu";
									})
									.map((element, index) => {
										return element.name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "} */}
                {info.subMenu
                  .map((element, index) => {
                    return allMenuList[element].name;
                  })
                  .sort((a, b) => a.createdAt - b.createAt)
                  .join(", ")}
              </div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                국1
              </div>
              <div class="w-full md:flex-1 text-xl">
                {/* {info.soup.sort().join(", ")} */}
                {info.soup
                  .map((element, index) => {
                    return allMenuList[element].name;
                  })
                  .sort((a, b) => a.createdAt - b.createAt)
                  .join(", ")}
              </div>
            </div>
            <div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
              <div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
                디저트
              </div>
              <div class="w-full md:flex-1 text-xl">
                {/* {menuList[3].menu
									.filter(function (element, index) {
										return element.type === "dessert";
									})
									.map((element, index) => {
										return element.name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")} */}
                {info.dessert
                  .map((element, index) => {
                    return allMenuList[element].name;
                  })
                  .sort((a, b) => a.createdAt - b.createAt)
                  .join(", ")}
              </div>
            </div>
          </div>
        </InfoBlock>
        <InfoBlock title={"결제"}>
          <div class="flex flex-col ">
            <div class="flex flex-col mb-4">
              {/* <p class="text-lg mb-4">결제수단</p> */}
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                {/* <InputLabel id='demo-simple-select-autowidth-label'>
                  결제수단
                </InputLabel> */}
                <p class="text-lg h-full flex justify-left items-center mb-4">
                  결제 수단 선택
                </p>
                <select
                  value={info.payment}
                  class="border border-gray-400 py-2 px-2"
                  // label='결제 수단'
                  onChange={handleChange}
                >
                  <option value={"card"}>후불 결제 (카드)</option>
                  <option value={"cash"}>후불 결제 (현금)</option>
                  <option value={"transfer"}>계좌이체</option>
                  <option value={"giftCard"}>상품권 결제</option>
                </select>
              </FormControl>
              {/* <Select
                  value={info.payment}
                  label='결제 수단'
                  onChange={handleChange}>
                  <MenuItem value={"card"}>후불 결제 (카드)</MenuItem>
                  <MenuItem value={"cash"}>후불 결제 (현금)</MenuItem>
                  <MenuItem value={"transfer"}>계좌이체</MenuItem>
                  <MenuItem value={"giftCard"}>상품권 결제</MenuItem>
                </Select>
              </FormControl> */}

              {/* <input
								type="text"
								placeholder="ex) 신용카드, 현금, 계좌이체"
								value={info.payment}
								onChange={(e) => changeInfo(e, "payment")}
								class="px-4 text-lg border-2 border-gray-300 w-full h-12 flex justify-center items-center"
							/> */}
            </div>
            {info.payment !== "card" && (
              <div
                class={
                  "flex py-4 flex-row justify-between items-center " +
                  (selected ? "border-b-2 border-gray-200" : "mb-12")
                }
              >
                <p class="text-lg h-full flex justify-center items-center ">
                  현금영수증
                </p>
                <div class="h-full flex flex-row items-center">
                  <div class="mr-3">
                    <RadioButton
                      text={"미신청"}
                      title={selected === false ? "선택됨" : ""}
                      setSelected={setSelected}
                      current={selected}
                      clicked={false}
                    />
                  </div>
                  <div>
                    <RadioButton
                      text={"신청"}
                      setSelected={setSelected}
                      title={selected === true ? "선택됨" : ""}
                      current={selected}
                      clicked={true}
                    />
                  </div>
                </div>
              </div>
            )}
            {info.payment !== "card" && (
              <div
                class={
                  "py-4 w-full h-full mb-12 flex flex-col transition delay-100 duration-200  " +
                  (selected ? "block" : "hidden")
                }
              >
                {/* 
								selected2가 false이면 개인소득공제용 
								selected2가 true이면 사업자증빙용
							*/}
                <div class="flex flex-col h-auto mb-4">
                  <div class="w-full h-8">
                    <RadioButton
                      text={"개인소득공제용"}
                      setSelected={setSelected2}
                      title={selected2 === false ? "선택됨" : ""}
                      current={selected2}
                      clicked={false}
                    />
                  </div>
                </div>
                <div class="flex flex-col mb-4">
                  <div class="w-fuill h-8">
                    <RadioButton
                      text={"사업자증빙용"}
                      setSelected={setSelected2}
                      title={selected2 === true ? "선택됨" : ""}
                      current={selected2}
                      clicked={true}
                    />
                  </div>
                </div>
                <div class="h-12 my-2">
                  <InputBox
                    value={info.cashReceipt["number"]}
                    title={
                      !selected2
                        ? "개인소득공제용 휴대폰 번호"
                        : "사용자 증빙용 사업자등록번호"
                    }
                    placeholder={!selected2 ? "휴대폰 번호" : "사업자등록번호"}
                    type=""
                    onChange={onChangeNumber}
                  />
                </div>
              </div>
            )}
            <div class="w-full h-12 -mb-8">
              {/* <SubmitButton text={"결제"} onSubmit={(e) => onSubmit(e)} /> */}
              <div class="w-full h-12 flex flex-row justify-between">
                <button
                  onClick={prevStep}
                  class="w-36 md:w-48 cursor-pointer h-full flex justify-center items-center bg-hansupBrown text-white font-bold text-xl"
                >
                  <BsArrowLeft class="mr-2" /> 이전
                </button>
                <button
                  // onClick={nextStep}
                  onClick={() =>
                    alert("현재 예약이 불가능합니다. 전화로 문의 부탁드립니다.")
                  }
                  class="w-36 md:w-48 cursor-pointer h-full flex justify-center items-center bg-hansupBrown text-white font-bold text-xl"
                >
                  다음 <BsArrowRight class="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </InfoBlock>
      </div>
    </div>
  );
};

export default OrderStep3;
