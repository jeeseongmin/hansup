import React, { useEffect, useState, useRef } from "react";
// import "components/navs/nav.css";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Menu from "components/navs/Menu";
import Submenu from "components/navs/Submenu";
const Nav = styled.div`
	width: 100%;
	position: relative;
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
		border: 1px solid red;
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
	border-top: 1px solid #d3d3d3;
	transition: all 0.3s ease;

	${(props) =>
		props.num !== 0 &&
		css`
			display: flex;
			height: 4rem;
			transition: all 0.3s ease;
			background-color: #6c4d3f;
		`};

	// 기본 사이즈
	@media screen and (max-width: 1200px) {
		padding: 0 3rem;

		${(props) =>
			props.num !== 0 &&
			css`
				display: flex;
				height: 0rem;
				transition: all 0.3s ease;
				background-color: #6c4d3f;
			`};
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
	display: inline-flex;
	height: 4rem;
	border: 1px solid blue;
	@media screen and (max-width: 1200px) {
		display: none;
	}
	//
	@media screen and (max-width: 768px) {
	}
	// 모바일 iPhone
	@media screen and (max-width: 480px) {
	}
`;

const Navbar = () => {
	const subRef = useRef();
	const [menu, setMenu] = useState(0);

	const toggleMenu = (e, num) => {
		if (menu === 0) {
			setMenu(num);
		} else if (num === menu) {
			setMenu(0);
		} else {
			setMenu(num);
		}
	};

	const onMouseOver = (e) => {
		console.log(e.target.innerText);
		if (e.target.innerText === "회사소개") {
			setMenu(1);
		} else if (e.target.innerText === "한숲사업") {
			setMenu(2);
		} else if (e.target.innerText === "주문안내") {
			setMenu(3);
		} else if (e.target.innerText === "커뮤니티") {
			setMenu(4);
		} else if (e.target.innerText === "협력사업") {
			setMenu(5);
		} else if (menu === 0) {
			setMenu(1);
		}
	};

	useEffect(() => {
		if (menu === 0) return;
		function handleClick(e) {
			// console.log(e.target.innerText, subRef.current);
			if (subRef.current === null) {
				return;
			} else if (!subRef.current.contains(e.target)) {
				setMenu(0);
			}
		}
		window.addEventListener("mouseover", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [menu]);

	return (
		<Nav ref={subRef}>
			<NavContainer onMouseOver={onMouseOver}>
				<Logo>
					<Link to="#">
						<img src="/image/logo.png" class="object-cover h-8" alt="logo" />
					</Link>
				</Logo>
				<MenuContainer>
					<Menu
						toggleMenu={toggleMenu}
						menu={1}
						title={"회사소개"}
						url={"#"}
						current={menu}
					/>
					<Menu
						toggleMenu={toggleMenu}
						menu={2}
						title={"한숲사업"}
						url={"#"}
						current={menu}
					/>
					<Menu
						toggleMenu={toggleMenu}
						menu={3}
						title={"주문안내"}
						url={"#"}
						current={menu}
					/>
					<Menu
						toggleMenu={toggleMenu}
						menu={4}
						title={"커뮤니티"}
						url={"#"}
						current={menu}
					/>
					<Menu
						toggleMenu={toggleMenu}
						menu={5}
						title={"협력사업"}
						url={"#"}
						current={menu}
					/>
					<Menu
						toggleMenu={toggleMenu}
						menu={5}
						title={"협력사업"}
						url={"#"}
						current={menu}
						empty={true}
					/>
				</MenuContainer>
			</NavContainer>
			<SubContainer num={menu} id="check">
				<Logo>
					<Link to="#">
						<img
							src="/image/logo.png"
							class="object-cover h-8 invisible"
							alt="logo"
						/>
					</Link>
				</Logo>

				{menu === 1 && (
					<MenuContainer>
						<Submenu title={"인사말"} url={"#"} empty={false} />
						<Submenu title={"한숲 이야기"} url={"#"} empty={false} />
						<Submenu title={"한숲의 역사"} url={"#"} empty={false} />
						<Submenu title={"오시는 길"} url={"#"} empty={false} />
						<Submenu title={"회사소개"} url={"#"} empty={false} />
						<Submenu title={""} url={"#"} empty={true} />
					</MenuContainer>
				)}
				{menu === 2 && (
					<MenuContainer>
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={"수화식당"} url={"#"} empty={false} />
						<Submenu title={"케이터링"} url={"#"} empty={false} />
						<Submenu title={"도시락 사업"} url={"#"} empty={false} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
					</MenuContainer>
				)}
				{menu === 3 && (
					<MenuContainer>
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={"케이터링 메뉴"} url={"#"} empty={false} />
						<Submenu title={"케이터링 안내"} url={"#"} empty={false} />
						<Submenu title={"주문하기"} url={"#"} empty={false} />
						<Submenu title={""} url={"#"} empty={true} />
					</MenuContainer>
				)}
				{menu === 4 && (
					<MenuContainer>
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={"공지사항"} url={"#"} empty={false} />
						<Submenu title={"리뷰"} url={"#"} empty={false} />
						<Submenu title={"고객의 소리"} url={"#"} empty={false} />
					</MenuContainer>
				)}
				{menu === 5 && (
					<MenuContainer>
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={""} url={"#"} empty={true} />
						<Submenu title={"한숲맛이야기"} url={"#"} empty={false} />
						<Submenu title={""} url={"#"} empty={true} />
					</MenuContainer>
				)}
			</SubContainer>
		</Nav>
	);
};

export default Navbar;
