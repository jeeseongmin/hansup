import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import OrderCheckBlock from "components/Block/OrderCheckBlock";
import axios from "axios";

const OrderBox = ({ dayOrder, toggleChange, focusDate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modalRef = useRef();
  const clickRef = useRef();

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (clickRef && clickRef.current.contains(e.target)) handleOpen();
      else if (modalRef.current === null) {
        return;
      } else if (!modalRef.current.contains(e.target)) {
        handleClose();
      }
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [open]);

  // 메뉴 리스트 불러오기
  const [allMenuList, setAllMenuList] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  const typeList = [
    { title: "메인메뉴 (택 4)", type: "mainMenu" },
    { title: "식사메뉴 (택 4)", type: "subMenu" },
    { title: "국 (택 1)", type: "soup" },
    { title: "디저트 (택 5)", type: "dessert" },
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
      <button
        onClick={handleOpen}
        ref={clickRef}
        class='cursor-pointer rounded-xl transition delay-50 duration-150 hover:border-2 border border-gray-200 hover:border-hansupBrown flex flex-col justify-center items-center py-4 px-5'>
        <p class='w-full text-2xl font-bold pb-2 border-b border-gray-200'>
          {dayOrder.name}
        </p>
        <div class='pt-2 w-full grid grid-cols-3 gap-2'>
          <p class='text-lg'>
            {/* {dayOrder.date.substr(11, 2)}:{dayOrder.date.substr(14, 2)} */}
            {new Date(dayOrder.date).getHours() +
              ":" +
              (new Date(dayOrder.date).getMinutes() === 0
                ? "00"
                : new Date(dayOrder.date).getMinutes())}
          </p>
          <p class='text-lg text-center'>{dayOrder.count}인분</p>
          <p class='text-lg text-center'>
            {dayOrder.delivery === "delivery" ? "배달" : "직접"}
          </p>
        </div>
      </button>
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
              <OrderCheckBlock
                info={dayOrder}
                handleClose={handleClose}
                toggleChange={toggleChange}
                allMenuList={allMenuList}
                listLoading={listLoading}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderBox;
