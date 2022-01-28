import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import axios from "axios";
import InfoBlock from "components/Block/InfoBlock";
import OrderReceiptBlock from "components/Block/OrderReceiptBlock";
import InputBox from "components/Box/InputBox";
import ContentLayout from "components/Layout/ContentLayout";
import PageLayout from "components/Layout/PageLayout";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const OrderCheck = () => {
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchInfo, setSearchInfo] = useState({
    name: "",
    date: new Date(),
    phone1: "",
    phone2: "",
    phone3: "",
  });
  const modalRef = useRef();

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
  const phone1Ref = useRef();
  const phone2Ref = useRef();
  const phone3Ref = useRef();

  const selectDate = () => {
    datepickerRef.current.setOpen(true);
  };
  const changeInfo = (e, type) => {
    if (type === "date") {
      const cp = { ...searchInfo };
      cp[type] = e;
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
    } else if (searchInfo.phone1 === "") {
      alert("연락처를 입력해주세요.");
      phone1Ref.current.focus();
    } else if (searchInfo.phone2 === "") {
      alert("연락처를 입력해주세요.");
      phone2Ref.current.focus();
    } else if (searchInfo.phone3 === "") {
      alert("연락처를 입력해주세요.");
      phone3Ref.current.focus();
    } else {
      let phoneNumber =
        searchInfo.phone1 + "-" + searchInfo.phone2 + "-" + searchInfo.phone3;
      await axios
        .post(
          "/api/order/search/0",
          {
            key: process.env.REACT_APP_API_KEY,
            name: searchInfo.name,
            phone: phoneNumber,
            year: searchInfo.date.getFullYear(),
            month: searchInfo.date.getMonth(),
            date: searchInfo.date.getDate(),
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
        class='w-full h-full flex justify-center items-center cursor-pointer'>
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
        <div class='w-full flex flex-col justify-center items-center '>
          <div class='w-full md:w-2/3 lg:w-2/3'>
            <ContentLayout subtitle={"예약 내역 확인"}>
              <p class='w-full text-left text-xl mb-4 font-bold text-hansupBrown'>
                예약 시 입력하셨던 이름과 연락처, 예약 날짜를 적어주세요.
              </p>
              <InfoBlock title={""}>
                <div class='px-4 flex flex-col mb-4'>
                  <div class='h-12 mb-4 flex flex-row justify-between items-center'>
                    <div class='w-1/4 text-xl'>이름</div>
                    <div class='flex-1 h-full'>
                      <InputBox
                        value={searchInfo.name}
                        refName={nameRef}
                        type='name'
                        placeholder='이름을 입력하세요'
                        onChange={changeInfo}
                      />
                    </div>
                  </div>
                  <div class='h-12 flex flex-row justify-between items-center mb-4'>
                    <div class='w-1/4 text-xl'>연락처</div>
                    <div class='flex-1 h-full grid grid-cols-3 gap-2'>
                      <InputBox
                        value={searchInfo.phone1}
                        refName={phone1Ref}
                        type='phone1'
                        placeholder='010'
                        onChange={changeInfo}
                      />
                      <InputBox
                        value={searchInfo.phone2}
                        refName={phone2Ref}
                        type='phone2'
                        placeholder=''
                        onChange={changeInfo}
                      />
                      <InputBox
                        value={searchInfo.phone3}
                        refName={phone3Ref}
                        type='phone3'
                        placeholder=''
                        onChange={changeInfo}
                      />
                    </div>
                  </div>
                  <div class='h-12 flex flex-row justify-between items-center'>
                    <div class='w-1/4 text-xl'>예약 날짜</div>
                    <div class='flex-1 h-full flex justify-between items-center'>
                      <button
                        onClick={selectDate}
                        class='flex-1 h-12 px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 flex items-center'>
                        {dateToString(searchInfo.date)}
                      </button>
                      <div class='w-12'>
                        <DatePicker
                          onClick={(e) => console.log(e)}
                          selected={searchInfo.date}
                          ref={datepickerRef}
                          onChange={(date) => changeInfo(date, "date")}
                          customInput={<DateInput />}
                        />
                      </div>
                    </div>
                  </div>

                  {empty && loading ? (
                    <p class='pt-6 w-full text-center text-xl mb-4 font-bold text-hansupBrown'>
                      예약 내역이 존재하지 않습니다.
                    </p>
                  ) : empty && !loading ? (
                    <div class='pt-6 w-full text-center text-xl font-bold text-hansupBrown'>
                      <CircularProgress />
                    </div>
                  ) : (
                    <div class=' hidden pt-6 w-full text-center text-xl mb-4 font-bold text-hansupBrown'></div>
                  )}
                </div>
                <div class='px-4 pt-4 flex flex-col md:flex-row justify-between border-t border-hansupBrown'>
                  <div class='w-full md:w-48 lg:w-60 h-12 mb-4 md:mb-0'>
                    <button
                      onClick={() => goPage("/order/catering/orderMain")}
                      class='cursor-pointer w-full h-full flex justify-center items-center outline-none transtion delay-50 duration-300 bg-hansupBrown hover:bg-white text-white hover:text-hansupBrown border hover:border-hansupBrown font-bold text-xl'>
                      뒤로가기
                    </button>
                  </div>
                  <div class='w-full md:w-48 lg:w-60 h-12'>
                    <button
                      onClick={orderCheck}
                      class='cursor-pointer w-full h-full flex justify-center items-center outline-none transtion delay-50 duration-300 bg-hansupBrown hover:bg-white text-white hover:text-hansupBrown border hover:border-hansupBrown font-bold text-xl'>
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
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <div class='h-full'>
          <div class='w-full h-full flex flex-col justify-center items-center py-16 px-4 lg:px-16'>
            <div
              ref={modalRef}
              class='select-none bg-white w-full md:w-2/3 lg:w-1/2 max-h-full overflow-auto h-full p-8'>
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
