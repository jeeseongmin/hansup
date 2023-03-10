import PageLayout from "components/Layout/PageLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

const Ordering = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/order/catering/orderMain");
    alert("페이지 리뉴얼 중입니다. 전화로 예약 부탁드립니다.");
  }, []);
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    name: "",
    phone1: "",
    phone2: "",
    phone3: "",
    check1: "",
    check2: "",
    check3: "",
    count: "",
    request: "",
    date: new Date(),
    delivery: "delivery",
    address1: "",
    address2: "",
    mainMenu: [],
    subMenu: [],
    soup: [],
    dessert: [],
    payment: "card",
    cashReceipt: {
      status: false,
      type: "personal",
      number: "",
    },
    payed: false,
    year: 2022,
    month: null,
    day: null,
    hour: null,
    minute: 0,
  });

  // 메뉴 리스트 불러오기
  const [menuList, setMenuList] = useState([]);
  const [allMenuList, setAllMenuList] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    document.body.scrollIntoView(true);
  }, []);

  const typeList = [
    { title: "메인메뉴(확정 4) + 자율 메뉴(추후 공지)", type: "mainMenu" },
    { title: "식사메뉴(확정)", type: "subMenu" },
    { title: "국 (택 1)", type: "soup" },
    { title: "디저트(확정)", type: "dessert" },
  ];

  const getList = async () => {
    setListLoading(false);
    await axios
      .post(
        "/api/menu/search/catering",
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(async (Response) => {
        const tmpList = [];
        for (let one of typeList) {
          const cp = Response.data.filter(function (element, index) {
            return element.type === one.type && !element.isDeleted;
          });
          tmpList.push({
            title: one.title,
            type: one.type,
            menu: [...cp],
          });
        }
        let cp2 = {};
        for (let i = 0; i < Response.data.length; i++) {
          cp2[Response.data[i]._id] = Response.data[i];
        }
        setAllMenuList(cp2);
        setMenuList(tmpList);
        setListLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const changeInfo = (e, type) => {
    if (type === "date" || type === "delivery") {
      if (type === "date") {
        let prev = new Date();
        prev.setDate(prev.getDate() + 1);
        var selected = dayjs(
          e.getFullYear() + "-" + e.getMonth() + "-" + e.getDate()
        ).add(1, "month");
        if (
          !selected.isAfter(dayjs().add(1, "day")) ||
          !selected.isBefore(dayjs().add(2, "month"))
        ) {
          alert("현재일 기준 이틀 뒤부터 2개월 이내까지 선택 가능합니다.");
          let init = dayjs().add(2, "day");
          let newDate = new Date(
            init.get("year"),
            init.get("month"),
            init.get("date"),
            14,
            0,
            0
          );
          const cp = { ...info };
          cp[type] = newDate;
          setInfo(cp);
          return;
        } else if (e.getHours() < 11 || e.getHours() > 20) {
          alert("오전 11시 ~ 오후 8시 사이에만 가능합니다.");
          selected.set("hour", 14);
          let newDate = new Date(
            selected.get("year"),
            selected.get("month"),
            selected.get("date"),
            14,
            0,
            0
          );
          const cp = { ...info };
          cp[type] = newDate;
          setInfo(cp);
          return;
        }
      }
      const cp = { ...info };
      cp[type] = e;
      setInfo(cp);
    } else {
      const cp = { ...info };
      cp[type] = e.target.value;
      setInfo(cp);
    }
  };
  return (
    <PageLayout>
      <></>
      {/*<div*/}
      {/*  id='main'*/}
      {/*  class='z-30 w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 '>*/}
      {/*  <div class='grid-cols-3 gap-8 mb-8 hidden lg:grid'>*/}
      {/*    <StepBox*/}
      {/*      step={step}*/}
      {/*      current={1}*/}
      {/*      text={"1. 예약정보 입력"}*/}
      {/*      setStep={setStep}*/}
      {/*    />*/}
      {/*    <StepBox*/}
      {/*      step={step}*/}
      {/*      current={2}*/}
      {/*      text={"2. 메뉴 선택"}*/}
      {/*      setStep={setStep}*/}
      {/*    />*/}
      {/*    <StepBox step={step} current={3} text={"3. 결제"} setStep={setStep} />*/}
      {/*  </div>*/}
      {/*  <div class='grid grid-cols-1 gap-8 mb-8 lg:hidden'>*/}
      {/*    {step === 1 && (*/}
      {/*      <StepBox*/}
      {/*        step={step}*/}
      {/*        current={1}*/}
      {/*        text={"1. 예약정보 입력"}*/}
      {/*        setStep={setStep}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    {step === 2 && (*/}
      {/*      <StepBox*/}
      {/*        step={step}*/}
      {/*        current={2}*/}
      {/*        text={"2. 메뉴 선택"}*/}
      {/*        setStep={setStep}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    {step === 3 && (*/}
      {/*      <StepBox*/}
      {/*        step={step}*/}
      {/*        current={3}*/}
      {/*        text={"3. 결제"}*/}
      {/*        setStep={setStep}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div class='w-full relative border-b border-hansupBrown mb-16'>*/}
      {/*    <div class='absolute w-full left-0 -bottom-2 grid grid-cols-3 gap-8'>*/}
      {/*      <div class='flex justify-center items-center'>*/}
      {/*        <div*/}
      {/*          class={*/}
      {/*            "rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +*/}
      {/*            (step === 0*/}
      {/*              ? "bg-none"*/}
      {/*              : step === 1*/}
      {/*              ? "bg-hansupBrown"*/}
      {/*              : "bg-white border border-hansupBrown")*/}
      {/*          }>*/}
      {/*          {step !== 0 && step !== 1 && (*/}
      {/*            <AiOutlineCheck class='w-3/4 h-3/4' />*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div class='flex justify-center items-center'>*/}
      {/*        <div*/}
      {/*          class={*/}
      {/*            "rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +*/}
      {/*            (step === 1*/}
      {/*              ? "bg-none"*/}
      {/*              : step === 2*/}
      {/*              ? "bg-hansupBrown"*/}
      {/*              : "bg-white border border-hansupBrown")*/}
      {/*          }>*/}
      {/*          {step !== 1 && step !== 2 && (*/}
      {/*            <AiOutlineCheck class='w-3/4 h-3/4' />*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div class='flex justify-center items-center'>*/}
      {/*        <div*/}
      {/*          class={*/}
      {/*            "rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +*/}
      {/*            (step === 1 || step === 2*/}
      {/*              ? "bg-none"*/}
      {/*              : step === 3*/}
      {/*              ? "bg-hansupBrown"*/}
      {/*              : "bg-white border border-hansupBrown")*/}
      {/*          }>*/}
      {/*          {step !== 1 && step !== 2 && step !== 3 && (*/}
      {/*            <AiOutlineCheck class='w-3/4 h-3/4' />*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  {step === 1 && (*/}
      {/*    <OrderStep1*/}
      {/*      info={info}*/}
      {/*      setInfo={setInfo}*/}
      {/*      setStep={setStep}*/}
      {/*      changeInfo={changeInfo}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  {step === 2 && (*/}
      {/*    <OrderStep2*/}
      {/*      info={info}*/}
      {/*      setInfo={setInfo}*/}
      {/*      setStep={setStep}*/}
      {/*      menuList={menuList}*/}
      {/*      listLoading={listLoading}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  {step === 3 && (*/}
      {/*    <OrderStep3*/}
      {/*      info={info}*/}
      {/*      setInfo={setInfo}*/}
      {/*      setStep={setStep}*/}
      {/*      changeInfo={changeInfo}*/}
      {/*      allMenuList={allMenuList}*/}
      {/*      menuList={menuList}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  {step === 4 && <OrderFinal info={info} allMenuList={allMenuList} />}*/}
      {/*</div>*/}
    </PageLayout>
  );
};

export default Ordering;
