import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import OrderListBlock from "components/Block/OrderListBlock";
import PageLayout from "components/Layout/PageLayout";
import Paging from "components/Paging";
import Subtitle from "components/Subtitle";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory } from "react-router-dom";

const Order = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const modalMenuRef = useRef();
  const [change, setChange] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    axios
      .post(
        "/api/order/page/" + page + "/" + match.params.type,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setOrderList(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [page, match.params.type, change]);

  const [newMenu, setNewMenu] = useState("all");

  useEffect(() => {
    setNewMenu(match.params.type);
  }, [match.params.type]);

  useEffect(() => {
    axios
      .post(
        "/api/order/type/" + match.params.type,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setTotalPage(Math.ceil(Response.data.length / 10));
        setLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [orderList, match.params.type, change]);

  const [modalMenu, setModalMenu] = useState(false);
  const onToggleMenu = () => {
    setModalMenu(!modalMenu);
  };

  const onChangeMenu = (name) => {
    history.push("/manager/order/list/" + name);
    onToggleMenu();
  };

  useEffect(() => {
    if (!modalMenu) return;
    function handleClick(e) {
      if (modalMenuRef.current === null) {
        return;
      } else if (!modalMenuRef.current.contains(e.target)) {
        setModalMenu(false);
      }
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [modalMenu]);

  return (
    <PageLayout>
      <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
        <div class='w-full flex flex-col justify-between items-start mb-4'>
          <div class='inline-flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-6'>
            <Subtitle subtitle={"???????????? ?????? ??????"} />
            <div class='w-full md:w-auto flex flex-col-reverse md:flex-row h-auto'>
              <button
                onClick={() => history.push("/manager/order/create")}
                class='mt-4 md:mt-0 cursor-pointer w-full md:w-48 h-12 mr-2 border border-hansupBrown hover:bg-hansupBrown hover:text-white transition delay-50 duration-150 flex justify-center items-center'>
                ????????????
              </button>
              <div
                ref={modalMenuRef}
                class='relative cursor-pointer mt-4 md:mt-0 w-full md:w-48 h-12 border-2 border-hansupBrown'>
                <button
                  onClick={onToggleMenu}
                  class='w-full h-full flex justify-between items-center text-hansupBrown font-bold'>
                  <div class=' w-12 h-full'></div>
                  {newMenu === "all" && <p>????????????</p>}
                  {newMenu === "undecided" && <p>?????????</p>}
                  {newMenu === "decided" && <p>??????</p>}

                  <div class=' w-12 h-full flex justify-center items-center'>
                    <IoIosArrowDown size={28} />
                    {/* <IoIosArrowUp size={28} /> */}
                  </div>
                </button>
                <div
                  class={
                    "z-30 absolute shadow-xl font-bold w-full h-36 left-0 top-12 border-l-2 border-r-2 border-t-2 border-hansupBrown grid-rows-3 " +
                    (modalMenu ? "grid" : "hidden")
                  }>
                  <button
                    onClick={() => onChangeMenu("all")}
                    class={
                      "flex justify-center items-center border-b-2 border-hansupBrown " +
                      (newMenu === "all"
                        ? "bg-hansupBrown text-white"
                        : "bg-white text-hansupBrown")
                    }>
                    ????????????
                  </button>
                  <button
                    onClick={() => onChangeMenu("undecided")}
                    class={
                      "flex justify-center items-center border-b-2 border-hansupBrown " +
                      (newMenu === "undecided"
                        ? "bg-hansupBrown text-white"
                        : "bg-white text-hansupBrown")
                    }>
                    {" "}
                    ?????????
                  </button>
                  <button
                    onClick={() => onChangeMenu("decided")}
                    class={
                      "flex justify-center items-center border-b-2 border-hansupBrown " +
                      (newMenu === "decided"
                        ? "bg-hansupBrown text-white"
                        : "bg-white text-hansupBrown")
                    }>
                    {" "}
                    ??????
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p class='text-hansupBrown font-bold'>
            ??????/???????????? ???????????? ????????? ???????????? ????????? ??? ????????????.
          </p>
          {/* <Link
						to="/community/voice/create"
						class="w-32 text-hansupBrown text-lg flex flex-row justify-end items-center"
					>
						<p class="mr-2">????????????</p> <VscArrowRight size={24} />
					</Link> */}
        </div>
        {loading ? (
          orderList.length === 0 ? (
            <div class='w-full h-24 flex justify-center items-center'>
              {match.params.type === "all" ? (
                <p>????????? ????????? ????????????.</p>
              ) : match.params.type === "undecided" ? (
                <p>???????????? ????????? ????????????.</p>
              ) : (
                <p>????????? ????????? ????????????.</p>
              )}
            </div>
          ) : (
            <OrderListBlock
              orderList={orderList}
              type={match.params.type}
              toggleChange={toggleChange}
            />
          )
        ) : (
          <div class='w-full h-24 flex justify-center items-center'>
            <CircularProgress />
          </div>
        )}

        <div class='w-full mt-8'>
          <Paging setPage={setPage} page={page} total={totalPage} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Order;
