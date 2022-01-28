import Modal from "@mui/material/Modal";
import InfoBlock from "components/Block/InfoBlock";
import PopupPostCodeBlock from "components/Block/PopupPostCodeBlock";
import InputBox from "components/Box/InputBox";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import styled from "styled-components";

const OrderStep1 = ({ info, setInfo, setStep, changeInfo }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nameRef = useRef();
  const phone1Ref = useRef();
  const phone2Ref = useRef();
  const phone3Ref = useRef();
  const check1Ref = useRef();
  const check2Ref = useRef();
  const check3Ref = useRef();
  const countRef = useRef();
  const requestRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const addressBtnRef = useRef();

  const clickAddress = (address) => {
    const cp = { ...info };
    cp["address1"] = address;
    setInfo(cp);
  };
  const prevStep = () => {
    history.push("/order/catering/orderMain");
    document.getElementById("scrollRef").scrollTo(0, 0);
  };
  const nextStep = () => {
    if (info.name === "") {
      alert("이름을 입력해주세요.");
      nameRef.current.focus();
    } else if (info.phone1 === "") {
      alert("핸드폰 번호를 입력해주세요.");
      phone1Ref.current.focus();
    } else if (info.phone2 === "") {
      alert("핸드폰 번호를 입력해주세요.");
      phone2Ref.current.focus();
    } else if (info.phone3 === "") {
      alert("핸드폰 번호를 입력해주세요.");
      phone3Ref.current.focus();
    } else if (info.check1 === "") {
      alert("핸드폰 번호 확인란을 입력해주세요.");
      check1Ref.current.focus();
    } else if (info.check2 === "") {
      alert("핸드폰 번호 확인란을 입력해주세요.");
      check2Ref.current.focus();
    } else if (info.check3 === "") {
      alert("핸드폰 번호 확인란을 입력해주세요.");
      check3Ref.current.focus();
    } else if (
      info.phone1 !== info.check1 ||
      info.phone2 !== info.check2 ||
      info.phone3 !== info.check3
    ) {
      alert("핸드폰 번호와 확인란을 확인해주세요.");
      phone1Ref.current.focus();
    } else if (info.count === "" || info.current === 0) {
      alert("인원수를 입력해주세요.");
      countRef.current.focus();
    } else if (info.count < 8) {
      alert(
        "배달 주문 시 최소 10인까지, 직접 방문 시 최소 8인까지 가능합니다. 인원 수를 변경해주세요."
      );
      countRef.current.focus();
    } else if (info.delivery === "delivery" && info.address1 === "") {
      alert("도로명 주소를 입력해주세요.");
      // address1Ref.current.focus();
      addressBtnRef.current.click();
    } else if (info.delivery === "delivery" && info.address2 === "") {
      alert("상세 주소를 입력해주세요.");
      address2Ref.current.focus();
    } else {
      setStep(2);
      document.getElementById("scrollRef").scrollTo(0, 0);
    }
  };

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };
  const DateInput = ({ value, onClick }) => {
    return (
      <button
        onClick={onClick}
        class='w-full h-full flex justify-center items-center cursor-pointer'>
        <AiTwotoneCalendar size={24} />
      </button>
    );
  };

  return (
    <>
      <div class='w-full flex flex-col justify-center items-center select-none'>
        <div class='w-full md:w-2/3 lg:w-1/2'>
          <InfoBlock title={"예약자 정보"}>
            <div class='px-4 flex flex-col'>
              <div class='h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>이름</div>
                <div class='w-full md:flex-1 h-12 md:h-full'>
                  <InputBox
                    value={info.name}
                    refName={nameRef}
                    type='name'
                    placeholder='이름을 입력하세요'
                    onChange={changeInfo}
                  />
                </div>
              </div>
              <div class='h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>연락처</div>
                <div class='w-full md:flex-1 h-12 md:h-full grid grid-cols-3 gap-2'>
                  <InputBox
                    value={info.phone1}
                    refName={phone1Ref}
                    type='phone1'
                    placeholder='010'
                    onChange={changeInfo}
                  />
                  <InputBox
                    value={info.phone2}
                    refName={phone2Ref}
                    type='phone2'
                    placeholder=''
                    onChange={changeInfo}
                  />
                  <InputBox
                    value={info.phone3}
                    refName={phone3Ref}
                    type='phone3'
                    placeholder=''
                    onChange={changeInfo}
                  />
                </div>
              </div>
              <div class='h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>
                  연락처 확인
                </div>
                <div class='w-full md:flex-1 h-12 md:h-full grid grid-cols-3 gap-2'>
                  <InputBox
                    value={info.check1}
                    refName={check1Ref}
                    type='check1'
                    placeholder='010'
                    onChange={changeInfo}
                  />
                  <InputBox
                    value={info.check2}
                    refName={check2Ref}
                    type='check2'
                    placeholder=''
                    onChange={changeInfo}
                  />
                  <InputBox
                    value={info.check3}
                    refName={check3Ref}
                    type='check3'
                    placeholder=''
                    onChange={changeInfo}
                  />
                </div>
              </div>
              <div class='mb-0 text-xs font-bold text-red-500'>
                {" "}
                직접 방문시, 최소 8인까지 가능
              </div>
              <div class='h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>인원수</div>
                <div class='w-full md:flex-1 h-12 md:h-full'>
                  <InputBox
                    value={info.count}
                    refName={countRef}
                    type='count'
                    placeholder='ex) 10 (최소 10인분)'
                    onChange={changeInfo}
                  />
                </div>
              </div>
              <div class='mb-0 text-xs font-bold text-red-500'>
                {" "}
                요청 메뉴 등이 있다면 기입 가능
              </div>
              <div class='h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>요청사항</div>
                <div class='w-full md:flex-1 h-12 md:h-full'>
                  <InputBox
                    value={info.request}
                    refName={requestRef}
                    type='request'
                    placeholder='최대 50자까지 입력 가능'
                    onChange={changeInfo}
                  />
                </div>
              </div>
            </div>
          </InfoBlock>
          <InfoBlock title={"예약 일정 정보"}>
            <p class='w-full text-center mb-4 font-bold text-hansupBrown'>
              배달을 원하는 시간과 장소를 입력해주세요. <br></br>
              날짜는 오늘({dateToString(new Date())}) 기준 2일 이후부터 2개월
              전까지만 선택가능합니다. <br></br>
              시간은 오전 11시 이후부터 오후 8시까지만 선택가능합니다.
            </p>
            <div class='px-4 flex flex-col'>
              <div class='h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>날짜</div>
                <div class='w-full md:flex-1 h-12 md:h-full flex justify-between items-center'>
                  <div class='flex-1 h-12 px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 flex items-center'>
                    {dateToString(info.date)}
                  </div>
                  <div class='w-12'>
                    <DatePicker
                      selected={info.date}
                      onChange={(date) => changeInfo(date, "date")}
                      showTimeSelect
                      customInput={<DateInput />}
                    />
                  </div>
                </div>
              </div>
              <div
                class={
                  "h-auto md:h-12 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center " +
                  (info.delivery === "self" ? "mb-8" : "mb-4")
                }>
                <div class='w-full md:w-1/4 mb-2 md:mb-0 text-xl'>수령방식</div>
                <div class='w-full md:flex-1 h-12 md:h-full grid grid-cols-2'>
                  <button
                    onClick={() => changeInfo("delivery", "delivery")}
                    class={
                      "w-full h-full flex justify-center items-center transition delay-50 duration-100 border-2 cursor-pointer " +
                      (info.delivery === "delivery"
                        ? "bg-hansupBrown text-white fond-bold"
                        : "border-gray-200 text-gray-400")
                    }>
                    배달
                  </button>
                  <button
                    onClick={() => changeInfo("self", "delivery")}
                    class={
                      "w-full h-full flex justify-center items-center transition delay-50 duration-100 border-t-2 border-b-2 border-r-2 cursor-pointer " +
                      (info.delivery === "self"
                        ? "bg-hansupBrown text-white fond-bold"
                        : "border-gray-200 text-gray-400")
                    }>
                    {" "}
                    직접방문
                  </button>
                </div>
              </div>
              <div class='mb-0 text-xs font-bold text-red-500'>
                {" "}
                배달비 : 포항시내 1만원, 시외 3만원
              </div>
              <div
                class={
                  "h-auto md:h-28 mb-8 flex-col md:flex-row justify-start md:justify-between items-start " +
                  (info.delivery === "self" ? "hidden" : "flex")
                }>
                <div class='w-full md:w-1/4 mb-0 text-xl h-12 md:h-full flex md:grid grid-rows-2 gap-2 '>
                  <p class='w-full h-full flex items-center'>배달장소</p>
                  <p></p>
                </div>

                <div class='w-full md:flex-1 h-28 md:h-full grid grid-rows-2 gap-2'>
                  <div class='h-full w-full flex flex-row md: justify-between items-center '>
                    <InputBox
                      value={info.address1}
                      refName={address1Ref}
                      type='address1'
                      placeholder='도로명 주소'
                      onChange={changeInfo}
                    />
                    <button
                      ref={addressBtnRef}
                      onClick={handleOpen}
                      class='ml-2 w-24 bg-hansupBrown text-white h-full'>
                      검색
                    </button>
                  </div>
                  <InputBox
                    value={info.address2}
                    refName={address2Ref}
                    type='address2'
                    placeholder='상세 주소'
                    onChange={changeInfo}
                  />
                </div>
              </div>
              <div class='w-full h-28 md:h-12 flex flex-col md:flex-row md: justify-between'>
                <button
                  onClick={prevStep}
                  class='mb-4 md:mb-0 cursor-pointer hover:bg-white hover:text-hansupBrown border border-hansupBrown transition delay-50 duration-150 w-full md:w-48 lg:w-60 h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl'>
                  뒤로
                </button>
                <button
                  onClick={nextStep}
                  class='cursor-pointer w-full md:w-48 hover:bg-white hover:text-hansupBrown border border-hansupBrown transition delay-50 duration-150 lg:w-60 h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl'>
                  다음
                </button>
              </div>
            </div>
          </InfoBlock>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <div class=''>
          <PopupPostCodeBlock
            onClose={handleClose}
            clickAddress={clickAddress}
          />
          {/* <PopupDomBlock>
					</PopupDomBlock> */}
        </div>
      </Modal>
    </>
  );
};

export default OrderStep1;
