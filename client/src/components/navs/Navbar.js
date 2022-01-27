import Menu from "components/navs/Menu";
import Submenu from "components/navs/Submenu";
import logoImg from "image/logo.png";
import ProfileImg from "image/profileDefault.png";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  setCurrentEmail,
  setCurrentPassword,
  setLoginToken,
  setProfile,
  setSidebar,
  setSubmenu,
} from "reducers/setting";
import styled, { css } from "styled-components";
import axios from "axios";

const Nav = styled.div`
  width: 100%;
  position: fixed;
  height: 4rem;
  z-index: 40;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const NavContainer = styled.div`
  height: 4rem;
  max-width: 100%;
  background-color: #6c4d3f;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem 0 10rem;

  // 기본 사이즈
  @media screen and (max-width: 1200px) {
    padding: 0 0rem 0 3rem;
    display: none;
  }
  //
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  // 모바일 iPhone
  @media screen and (max-width: 480px) {
    padding: 0 2rem;
  }
`;

const ResponsiveContainer = styled.div`
  height: 4rem;
  max-width: 100%;
  background-color: #6c4d3f;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem 0 10rem;

  // 기본 사이즈
  @media screen and (max-width: 1200px) {
    padding: 0 2rem;
    display: flex;
  }
  //
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  // 모바일 iPhone
  @media screen and (max-width: 480px) {
    padding: 0 2rem;
  }
`;
const SubContainer = styled.div`
  max-width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  /* padding: 0 10rem; */
  padding: 0 3rem 0 10rem;
  display: flex;
  height: 0;
  background-color: #6c4d3f;

  /* margin-right: 3rem; */
  border-top: 1px solid transparent;
  transition: all 0.3s ease;

  ${(props) =>
    props.num !== 0 &&
    props.num !== 6 &&
    css`
      display: flex;
      height: 4rem;
      transition: all 0.3s ease;
      background-color: #6c4d3f;
      /* border-top: 1px solid #d3d3d3; */
    `};

  // 기본 사이즈
  @media screen and (max-width: 1200px) {
    padding: 0 3rem;

    ${(props) =>
      props.num !== 0 &&
      props.num !== 6 &&
      css`
        display: flex;
        height: 0rem;
        transition: all 0.3s ease;
        background-color: #6c4d3f;
      `};
    border-top: 1px solid transparent;
  }
  //
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  // 모바일 iPhone
  @media screen and (max-width: 480px) {
    padding: 0 0rem;
  }
`;
const Logo = styled.div`
  height: auto;
`;

const MenuContainer = styled.div`
  display: none;
  height: 4rem;
  @media screen and (min-width: 1200px) {
    display: inline-flex;
  }
  @media screen and (max-width: 1200px) {
  }
  //
  @media screen and (max-width: 768px) {
  }
  // 모바일 iPhone
  @media screen and (max-width: 480px) {
  }
`;

const Navbar = ({ currentMenu }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);

  const location = useLocation();
  const subRef = useRef();
  const [menu, setMenu] = useState(0);
  const [current, setCurrent] = useState(0);

  const modalRef = useRef();
  const clickRef = useRef();

  const sidebar = useSelector((state) => state.setting.sidebar);
  const profile = useSelector((state) => state.setting.profile);
  const loginToken = useSelector((state) => state.setting.loginToken);
  const currentEmail = useSelector((state) => state.setting.currentEmail);
  const currentPassword = useSelector((state) => state.setting.currentPassword);
  const refresh_voice = useSelector((state) => state.common.refresh_voice);
  const refresh_order = useSelector((state) => state.common.refresh_order);

  const profileRef = useRef(null);
  const subProfileRef = useRef(null);

  const [overMenu, setOverMenu] = useState([false, false, false, false, false]);

  const [loginInfo, setLoginInfo] = useState({
    position: "",
    email: "",
  });

  const [unreadCount, setUnreadCount] = useState(0);
  const [undecidedCount, setUndecidedCount] = useState(0);

  const [voiceLoading, setVoiceLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    axios
      .post(
        "/api/voice/type/unread",
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setUnreadCount(Response.data.length);
        setVoiceLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [currentEmail, refresh_voice]);

  useEffect(() => {
    axios
      .post(
        "/api/order/type/undecided",
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setUndecidedCount(Response.data.length);
        setOrderLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [currentEmail, refresh_order]);

  const onToggleProfile = () => {
    if (profile === "on") {
      dispatch(setProfile("off"));
    } else dispatch(setProfile("on"));
  };

  const logout = async () => {
    await sessionStorage.setItem("loginToken", false);
    await dispatch(setLoginToken("logout"));
    await dispatch(setCurrentEmail(""));
    dispatch(setCurrentPassword(""));
    dispatch(setProfile("off"));
    await setMenu(0);
    await setSubmenu(0);
    await setIsLogin(false);

    alert("로그아웃되었습니다.");
    history.push("/");
  };

  const goEditPage = () => {
    // dispatch(setProfile("off"));
    // setModalShow(true);
    // dispatch(setMenu(0));
    // dispatch(setSubmenu(1));
    // history.push("/admin/edit");
  };

  const goPage = (url) => {
    history.push(url);
    onToggleProfile();
  };

  const toggleMenu = (e, num) => {
    if (menu === 0) {
      setMenu(num);
    } else if (num === menu) {
      setMenu(0);
    } else {
      setMenu(num);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("loginToken")) {
      if (currentEmail !== "" && currentPassword !== "") {
        setIsLogin(true);
        const payload = {
          position: "",
          email: currentEmail,
        };
        if (currentEmail === "master") {
          payload.position = "총 관리자";
        }
        setLoginInfo(payload);
      }
    } else setIsLogin(false);
  }, [sessionStorage.getItem("loginToken")]);

  const onMouseOut = (e) => {
    setMenu(0);
  };

  const onMouseOver = (e) => {
    if (e.target.tagName !== "DIV" && e.target.tagName !== "P") {
      if (e.target.innerText === "회사소개") {
        setMenu(1);
      } else if (e.target.innerText === "한숲사업") {
        setMenu(2);
      } else if (e.target.innerText === "케이터링 예약") {
        setMenu(3);
      } else if (e.target.innerText === "커뮤니티") {
        setMenu(4);
      } else if (e.target.innerText === "협력기업") {
        setMenu(5);
      } else if (e.target.innerText === "관리자") {
        setMenu(6);
      } else if (e.target.innerText === "") {
        setMenu(0);
      } else if (menu === 0) {
        setMenu(1);
      }
    }
  };

  useEffect(() => {
    if (profile === "off") return;
    function handleClick(e) {
      if (profileRef.current === null) {
        return;
      } else if (!profileRef.current.contains(e.target)) {
        dispatch(setProfile("off"));
      }
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [profile]);

  useEffect(() => {
    if (menu === 0) return;
    function handleClick(e) {
      if (subRef.current === null) {
        return;
      } else if (!subRef.current.contains(e.target)) {
        setMenu(0);
      }
    }
    window.addEventListener("mouseover", handleClick);

    return () => window.removeEventListener("mouseover", handleClick);
  }, [menu]);

  return (
    <>
      <Nav ref={subRef} onMouseLeave={onMouseOut}>
        <ResponsiveContainer>
          <Logo>
            <Link to='/'>
              <img src={logoImg} class='object-cover h-8' alt='한숲푸드 로고' />
            </Link>
          </Logo>
          <div
            onClick={() => dispatch(setSidebar("on"))}
            class='text-white hidden md:block cursor-pointer z-50'>
            <GiHamburgerMenu size={28} />
          </div>
          <div
            onClick={() => dispatch(setSidebar("on"))}
            class='text-white block md:hidden cursor-pointer z-50'>
            <GiHamburgerMenu size={24} />
          </div>
        </ResponsiveContainer>
        <NavContainer onMouseOver={onMouseOver}>
          <Logo>
            <Link to='/'>
              <img src={logoImg} class='object-cover h-8' alt='한숲푸드 로고' />
            </Link>
          </Logo>
          <MenuContainer>
            <Menu
              toggleMenu={toggleMenu}
              menu={1}
              title={"회사소개"}
              url={"/intro/introduction"}
              current={menu}
              currentMenu={currentMenu}
            />
            <Menu
              toggleMenu={toggleMenu}
              menu={2}
              title={"한숲사업"}
              url={"/business/restaurant"}
              current={menu}
              currentMenu={currentMenu}
            />
            <Menu
              toggleMenu={toggleMenu}
              menu={3}
              title={"케이터링 예약"}
              url={"/order/catering/menu"}
              current={menu}
              currentMenu={currentMenu}
            />
            <Menu
              toggleMenu={toggleMenu}
              menu={4}
              title={"커뮤니티"}
              url={"/community/notice/list"}
              current={menu}
              currentMenu={currentMenu}
            />
            <Menu
              toggleMenu={toggleMenu}
              menu={5}
              title={"협력기업"}
              url={"/enterprise/hansup"}
              current={menu}
              currentMenu={currentMenu}
            />
            {isLogin && (
              <Menu
                // toggleMenu={toggleMenu}
                menu={6}
                title={"관리자"}
                url={"/manager/order/calendar"}
                current={menu}
                currentMenu={currentMenu}
                // empty={true}
              />
            )}
            {isLogin ? (
              <div
                ref={profileRef}
                class='h-full w-auto flex justify-end items-center relative'>
                <img
                  src={ProfileImg}
                  onClick={onToggleProfile}
                  class='z-30 p-1 w-10 h-10 rounded-full cursor-pointer object-cover'
                  alt='관리자 이미지'
                />
                <div
                  onClick={onToggleProfile}
                  class='cursor-pointer z-30 w-10 h-8 absolute'>
                  <div
                    class={
                      "w-4 h-4 rounded-full bg-red-500 absolute -right-1 -top-1 justify-center items-center text-white text-xs font-bold " +
                      (orderLoading &&
                      voiceLoading &&
                      unreadCount + undecidedCount === 0
                        ? "hidden"
                        : unreadCount + undecidedCount === 0
                        ? "hidden"
                        : "flex")
                    }>
                    {orderLoading && voiceLoading
                      ? unreadCount + undecidedCount
                      : unreadCount + undecidedCount !== 0
                      ? unreadCount + undecidedCount
                      : 0}
                  </div>
                </div>
                {profile === "on" ? (
                  <div class='z-30 px-4 py-2 flex flex-col justify-center items-center -right-4 top-14 w-72 h-48 bg-white border border-gray-300 rounded-lg absolute'>
                    <div class='w-full h-full flex flex-col justify-around'>
                      <div class='w-full flex flex-col'>
                        <p class='font-bold w-auto'>{loginInfo.position}</p>
                        <p class='text-gray-500'>ID : {loginInfo.email}</p>
                      </div>
                      <div
                        onClick={() => goPage("/manager/order/list/undecided")}
                        class='relative cursor-pointer w-full py-1 border border-hansupBrown text-hansupBrown flex justify-center transition delay-50 duration-300 hover:bg-hansupBrown hover:text-white'>
                        신규 예약
                        <div
                          class={
                            "w-4 h-4 rounded-full bg-red-500 absolute -right-1 -top-1 justify-center items-center text-white text-xs font-bold " +
                            (orderLoading && undecidedCount === 0
                              ? "hidden"
                              : undecidedCount === 0
                              ? " hidden "
                              : "flex")
                          }>
                          {orderLoading ? undecidedCount : 0}
                        </div>
                      </div>
                      <div
                        onClick={() => goPage("/manager/voice/unread")}
                        class='relative cursor-pointer w-full py-1 border border-hansupBrown text-hansupBrown flex justify-center transition delay-50 duration-300 hover:bg-hansupBrown hover:text-white'>
                        신규 고객의 소리
                        <div
                          class={
                            "w-4 h-4 rounded-full bg-red-500 absolute -right-1 -top-1 flex justify-center items-center text-white text-xs font-bold " +
                            (voiceLoading && unreadCount === 0
                              ? "hidden"
                              : unreadCount === 0
                              ? "hidden"
                              : "flex")
                          }>
                          {voiceLoading ? unreadCount : 0}
                        </div>
                      </div>
                      {/* <div
												onClick={goEditPage}
												class="cursor-pointer w-full py-1 border border-hansupBrown text-hansupBrown flex justify-center transition delay-50 duration-300 hover:bg-hansupBrown hover:text-white"
											>
												정보 변경
											</div> */}
                      <div
                        onClick={logout}
                        class='cursor-pointer w-full py-1 border border-hansupBrown text-hansupBrown flex justify-center transition delay-50 duration-300 hover:bg-hansupBrown hover:text-white'>
                        로그아웃
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </MenuContainer>
        </NavContainer>
        <SubContainer num={menu} id='check'>
          <Logo>
            <img
              src='/image/logo.png'
              class='object-cover h-8 invisible select-none'
              alt='한숲푸드 로고'
            />
          </Logo>

          {menu === 1 && (
            <MenuContainer>
              <Submenu
                title={"인사말"}
                url={"/intro/introduction"}
                empty={false}
              />
              <Submenu
                title={"한숲 이야기"}
                url={"/intro/story"}
                empty={false}
              />
              <Submenu
                title={"한숲의 역사"}
                url={"/intro/history"}
                empty={false}
              />
              <Submenu title={"오시는 길"} url={"/intro/guide"} empty={false} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              {isLogin ? (
                <div class='h-full w-auto flex justify-end items-center relative invisible'>
                  <img
                    src={ProfileImg}
                    class='z-30 p-1 w-10 h-10 rounded-full cursor-pointer object-cover'
                    alt='관리자 이미지'
                  />
                </div>
              ) : null}
            </MenuContainer>
          )}
          {menu === 2 && (
            <MenuContainer>
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu
                title={"수화식당"}
                url={"/business/restaurant"}
                empty={false}
              />
              <Submenu
                title={"케이터링"}
                url={"/business/catering"}
                empty={false}
              />
              <Submenu
                title={"한숲 도시락"}
                url={"/business/box"}
                empty={false}
              />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              {isLogin ? (
                <div class='h-full w-auto flex justify-end items-center relative invisible'>
                  <img
                    src={ProfileImg}
                    class='z-30 p-1 w-10 h-10 rounded-full cursor-pointer object-cover'
                    alt='관리자 이미지'
                  />
                </div>
              ) : null}
            </MenuContainer>
          )}
          {menu === 3 && (
            <MenuContainer>
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu
                title={"케이터링 메뉴"}
                url={"/order/catering/menu"}
                empty={false}
              />
              <Submenu
                title={"케이터링 안내"}
                url={"/order/catering/intro"}
                empty={false}
              />
              <Submenu
                title={"케이터링 예약"}
                url={"/order/catering/orderMain"}
                empty={false}
              />
              <Submenu title={""} url={"#"} empty={true} />
              {isLogin ? (
                <div class='h-full w-auto flex justify-end items-center relative invisible'>
                  <img
                    src={ProfileImg}
                    class='z-30 p-1 w-10 h-10 rounded-full cursor-pointer object-cover'
                    alt='관리자 이미지'
                  />
                </div>
              ) : null}
            </MenuContainer>
          )}
          {menu === 4 && (
            <MenuContainer>
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu
                title={"공지사항"}
                url={"/community/notice/list"}
                empty={false}
              />
              <Submenu
                title={"리뷰"}
                url={"/community/review/list"}
                empty={false}
              />
              <Submenu
                title={"고객의 소리"}
                url={"/community/voice/main"}
                empty={false}
              />
              {isLogin ? (
                <div class='h-full w-auto flex justify-end items-center relative invisible'>
                  <img
                    src={ProfileImg}
                    class='z-30 p-1 w-10 h-10 rounded-full cursor-pointer object-cover'
                    alt='관리자 이미지'
                  />
                </div>
              ) : null}
            </MenuContainer>
          )}
          {menu === 5 && (
            <MenuContainer>
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu title={""} url={"#"} empty={true} />
              <Submenu
                title={"한숲맛이야기"}
                url={"/enterprise/hansup"}
                empty={false}
              />
              {isLogin ? (
                <div class='h-full w-auto flex justify-end items-center relative invisible'>
                  <img
                    src={ProfileImg}
                    class='z-30 p-1 w-10 h-10 rounded-full cursor-pointer object-cover'
                    alt='관리자 이미지'
                  />
                </div>
              ) : null}
            </MenuContainer>
          )}
        </SubContainer>
      </Nav>
      {/* {sidebar === "on" && (
				<div class="z-50 w-full h-full absolute left-0 top-0 flex flex-row">
					<div class="bg-white h-screen top-0 left-0 w-36">123</div>
					<div
						onClick={() => dispatch(setSidebar("off"))}
						class="flex-1 h-screen bg-black opacity-50"
					></div>
				</div>
			)} */}
    </>
  );
};

export default Navbar;
