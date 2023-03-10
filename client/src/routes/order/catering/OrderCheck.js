import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import axios from "axios";
import InfoBlock from "components/Block/InfoBlock";
import OrderReceiptBlock from "components/Block/OrderReceiptBlock";
import InputBox from "components/Box/InputBox";
import ContentLayout from "components/Layout/ContentLayout";
import PageLayout from "components/Layout/PageLayout";
import React, { useEffect, useRef, useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useTitle from "hooks/useTitle";

const OrderCheck = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(
    () => updateTitle("한숲푸드 - 케이터링 예약 - 예약 내역 확인"),
    1000
  );

  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    history.push("/order/catering/orderMain");
    document.body.scrollIntoView(true);
  };
  const [searchInfo, setSearchInfo] = useState({
    name: "",
    date: new Date(),
    year: "",
    month: "",
    day: "",
    dateString: "",
    phone: "",
    phone1: "",
    phone2: "",
    phone3: "",
  });
  const modalRef = useRef();

  useEffect(() => {
    document.body.scrollIntoView(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (modalRef.current === null) {
        return;
      } else if (!modalRef.current.contains(e.target)) {
        handleClose();
      }
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [open]);

  const [orderInfo, setOrderInfo] = useState({});

  const datepickerRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const dateRef = useRef();

  const selectDate = () => {
    datepickerRef.current.setOpen(true);
  };

  const changeInfo = (e, type) => {
    if (type === "date") {
      const cp = { ...searchInfo };
      cp[type] = e;
      setSearchInfo(cp);
    } else if (type === "phone") {
      const cp = { ...searchInfo };
      cp[type] = e.target.value;
      setSearchInfo(cp);
    } else {
      const cp = { ...searchInfo };
      cp[type] = e.target.value;
      setSearchInfo(cp);
    }
  };
  const history = useHistory();

  const goPage = (url) => {
    history.push(url);
  };

  const orderCheck = async () => {
    setLoading(false);
    if (searchInfo.name === "") {
      alert("이름을 입력해주세요");
      nameRef.current.focus();
    } else if (searchInfo.phone === "") {
      alert("연락처를 입력해주세요.");
      phoneRef.current.focus();
    } else if (!searchInfo.phone.includes("-")) {
      alert("연락처에 -를 포함해주세요.");
      phoneRef.current.focus();
    } else if (searchInfo.dateString === "") {
      alert("예약 날짜를 입력해주세요.");
      dateRef.current.focus();
    } else if (!searchInfo.dateString.includes("-")) {
      alert("연, 월, 일을 -로 구분해주세요.");
      dateRef.current.focus();
    } else {
      let phoneNumber = searchInfo.phone;
      let [year, month, day] = searchInfo.dateString.split("-");
      await axios
        .post(
          "/api/order/search/0",
          {
            key: process.env.REACT_APP_API_KEY,
            name: searchInfo.name,
            phone: phoneNumber,
            year: year,
            month: month * 1 - 1,
            date: day,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(async (Response) => {
          await setOrderInfo(Response.data[0]);
          if (Response.data.length > 0) {
            setEmpty(false);
            handleOpen();
          } else {
            setEmpty(true);
          }
          setLoading(true);
        })
        .catch((Error) => {
          console.log(Error);
        });
      // await getOrderInfo();
    }
  };
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };
  const DateInput = ({ value, onClick }) => {
    return (
      <button
        onClick={onClick}
        class="w-full h-full flex justify-center items-center cursor-pointer"
      >
        <AiTwotoneCalendar size={24} />
      </button>
    );
  };

  // 메뉴 리스트 불러오기
  const [allMenuList, setAllMenuList] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  const typeList = [
    { title: "메인메뉴 (확정)", type: "mainMenu" },
    { title: "식사메뉴 (확정)", type: "subMenu" },
    { title: "국 (택 1)", type: "soup" },
    { title: "디저트 (확정)", type: "dessert" },
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
      .then((Response) => {
        const tmpList = [];
        for (let one of typeList) {
          const cp = Response.data.filter(function (element, index) {
            return element.type === one.type;
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
        setListLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <PageLayout>
        <div
          id="main"
          class="w-full flex flex-col justify-center items-center "
        >
          <div class="w-full md:w-2/3 lg:w-2/3">
            <ContentLayout subtitle={"예약 내역 확인"}>
              <p class="w-full text-left text-xl mb-4 font-bold text-hansupBrown">
                예약 시 입력하셨던 이름과 연락처, 예약 날짜를 적어주세요.
              </p>
              <InfoBlock title={""}>
                <div class="px-4 flex flex-col mb-4">
                  <div class="h-12 mb-4 flex flex-row justify-between items-center">
                    <label class="w-1/4 text-xl" for={"name"}>
                      이름
                    </label>
                    <div class="flex-1 h-full">
                      <InputBox
                        value={searchInfo.name}
                        refName={nameRef}
                        title="예약자 이름"
                        type="name"
                        placeholder="이름을 입력하세요"
                        onChange={changeInfo}
                        label={"name"}
                      />
                    </div>
                  </div>
                  <div class="h-12 flex flex-row justify-between items-center mb-4">
                    <label class="w-1/4 text-xl" for={"phone"}>
                      연락처
                    </label>
                    <div class="flex-1 h-full grid grid-cols-1 gap-2">
                      <InputBox
                        value={searchInfo.phone}
                        refName={phoneRef}
                        type="phone"
                        placeholder="ex. 010-1234-1234"
                        title="연락처"
                        onChange={changeInfo}
                        label={"phone"}
                      />
                    </div>
                  </div>
                  <div class="h-12 flex flex-row justify-between items-center">
                    <label class="w-1/4 text-xl" for={"date"}>
                      예약 날짜
                    </label>
                    <div class="flex-1 h-full flex justify-between items-center">
                      <div class="w-full md:flex-1 h-12 md:h-full grid grid-cols-1 gap-2">
                        <InputBox
                          value={searchInfo.dateString}
                          title="예약 날짜"
                          type="date"
                          placeholder="ex. 2000-01.25"
                          onChange={changeInfo}
                          label={"date"}
                        />
                      </div>
                    </div>
                  </div>

                  {empty && loading ? (
                    <p class="pt-6 w-full text-center text-xl mb-4 font-bold text-hansupBrown">
                      예약 내역이 존재하지 않습니다.
                    </p>
                  ) : empty && !loading ? (
                    <div class="pt-6 w-full text-center text-xl font-bold text-hansupBrown">
                      <CircularProgress />
                    </div>
                  ) : (
                    <div class=" hidden pt-6 w-full text-center text-xl mb-4 font-bold text-hansupBrown"></div>
                  )}
                </div>
                <div class="px-4 pt-4 flex flex-col md:flex-row justify-between border-t border-hansupBrown">
                  <div class="w-full md:w-48 lg:w-60 h-12 mb-4 md:mb-0">
                    <button
                      onClick={() => goPage("/order/catering/orderMain")}
                      class="cursor-pointer w-full h-full flex justify-center items-center transtion delay-50 duration-300 bg-hansupBrown hover:bg-white text-white hover:text-hansupBrown border hover:border-hansupBrown font-bold text-xl"
                    >
                      뒤로가기
                    </button>
                  </div>
                  <div class="w-full md:w-48 lg:w-60 h-12">
                    <button
                      onClick={orderCheck}
                      class="cursor-pointer w-full h-full flex justify-center items-center transtion delay-50 duration-300 bg-hansupBrown hover:bg-white text-white hover:text-hansupBrown border hover:border-hansupBrown font-bold text-xl"
                    >
                      확인하기
                    </button>
                  </div>
                </div>
              </InfoBlock>
            </ContentLayout>
          </div>
        </div>
      </PageLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div class="h-full">
          <div class="w-full h-full flex flex-col justify-center items-center py-16 px-4 lg:px-16">
            <div
              ref={modalRef}
              class=" bg-white w-full md:w-2/3 lg:w-1/2 max-h-full overflow-auto h-full p-8"
            >
              <OrderReceiptBlock
                info={orderInfo}
                handleClose={handleClose}
                allMenuList={allMenuList}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderCheck;
