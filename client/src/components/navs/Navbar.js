import React from "react";
// import "components/navs/nav.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
	max-width: 100%;
	background-color: #6c4d3f;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 3rem;
`;
const Logo = styled.div`
	height: auto;
	border: 1px solid red;
`;
const LogoButton = styled.div`
	height: 2rem;
	object-fit: cover;
`;

const Menu = styled(Link)`
	text-decoration: none;
	color: white;
	font-size: 18px;
	font-weight: 500;
	padding: 8px 15px;
	transition: all 0.3s ease;
`;
const Nav = styled.div`
	background-color: #6c4d3f;
	width: 100%;
	padding: 10px 0;
`;

const MenuContainer = styled.div`
	display: inline-flex;
	border: 1px solid black;
`;

const Navbar = () => {
	return (
		<Nav>
			<NavContainer>
				<Logo>
					<Link to="#">
						<img src="/image/logo.png" class="object-cover h-8" alt="logo" />
					</Link>
				</Logo>
				<MenuContainer>
					<Menu to="#" className="link">
						회사소개
					</Menu>
					<Menu to="#" className="link">
						한숲사업
					</Menu>
					<Menu to="#" className="link">
						주문안내
					</Menu>
					<Menu to="#" className="link">
						커뮤니티
					</Menu>
					<Menu to="#" className="link">
						협력기업
					</Menu>
				</MenuContainer>
			</NavContainer>
		</Nav>
	);
};

export default Navbar;
