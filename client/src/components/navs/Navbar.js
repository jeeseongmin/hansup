import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Menu from "components/navs/Menu";
import Submenu from "components/navs/Submenu";
import logoImg from "image/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "reducers/setting";
import Modal from "@mui/material/Modal";

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
			border-top: 1px solid #d3d3d3;
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
	const location = useLocation();
	const subRef = useRef();
	const [menu, setMenu] = useState(0);
	const [current, setCurrent] = useState(0);

	const modalRef = useRef();
	const clickRef = useRef();

	const sidebar = useSelector((state) => state.setting.sidebar);

	const toggleSidebar = () => {
		console.log(sidebar);
		if (true) {
			dispatch(setSidebar("on"));
		} else {
			dispatch(setSidebar("off"));
		}
	};

	useEffect(() => {
		console.log(sidebar);
	}, [sidebar]);

	const toggleMenu = (e, num) => {
		if (menu === 0) {
			setMenu(num);
		} else if (num === menu) {
			setMenu(0);
		} else {
			setMenu(num);
		}
	};

	const onMouseOut = (e) => {
		// console.log("out", e);
		setMenu(0);
	};

	const onMouseOver = (e) => {
		if (e.target.innerText === "회사소개") {
			setMenu(1);
		} else if (e.target.innerText === "한숲사업") {
			setMenu(2);
		} else if (e.target.innerText === "예약안내") {
			setMenu(3);
		} else if (e.target.innerText === "커뮤니티") {
			setMenu(4);
		} else if (e.target.innerText === "협력기업") {
			setMenu(5);
		} else if (e.target.innerText === "관리자") {
			setMenu(6);
		} else if (menu === 0) {
			setMenu(1);
		}
	};

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
						<Link to="/">
							<img src={logoImg} class="object-cover h-8" alt="logo" />
						</Link>
					</Logo>
					<div
						onClick={() => dispatch(setSidebar("on"))}
						class="text-white hidden md:block cursor-pointer z-50 border border-black"
					>
						<GiHamburgerMenu size={28} />
					</div>
					<div
						onClick={() => dispatch(setSidebar("on"))}
						class="text-white block md:hidden cursor-pointer z-50"
					>
						<GiHamburgerMenu size={24} />
					</div>
				</ResponsiveContainer>
				<NavContainer onMouseOver={onMouseOver}>
					<Logo>
						<Link to="/">
							<img src={logoImg} class="object-cover h-8" alt="logo" />
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
							title={"예약안내"}
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
						<Menu
							// toggleMenu={toggleMenu}
							menu={6}
							title={"관리자"}
							url={"/manager/schedule"}
							current={menu}
							currentMenu={currentMenu}

							// empty={true}
						/>
					</MenuContainer>
				</NavContainer>
				<SubContainer num={menu} id="check">
					<Logo>
						<Link to="/">
							<img
								src="/image/logo.png"
								class="object-cover h-8 invisible"
								alt="logo"
							/>
						</Link>
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
								title={"도시락 사업"}
								url={"/business/box"}
								empty={false}
							/>
							<Submenu title={""} url={"#"} empty={true} />
							<Submenu title={""} url={"#"} empty={true} />
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
						</MenuContainer>
					)}
					{menu === 5 && (
						<MenuContainer>
							<Submenu title={""} url={"#"} empty={true} />
							<Submenu title={""} url={"#"} empty={true} />
							<Submenu title={""} url={"#"} empty={true} />
							<Submenu title={""} url={"#"} empty={true} />
							<Submenu
								title={"한숲맛이야기"}
								url={"/enterprise/hansup"}
								empty={false}
							/>
							<Submenu title={""} url={"#"} empty={true} />
						</MenuContainer>
					)}
				</SubContainer>
			</Nav>
			{sidebar === "on" && (
				<div
					onClick={() => dispatch(setSidebar("off"))}
					class="z-50 w-full h-full absolute left-0 top-0 bg-black opacity-50"
				></div>
			)}
		</>
	);
};

export default Navbar;
