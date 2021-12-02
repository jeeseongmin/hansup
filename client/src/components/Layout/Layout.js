import SubmenuBlock from "components/Block/SubmenuBlock";
import TitleBlock from "components/Block/TitleBlock";
import Footer from "components/footer/Footer";
import Navbar from "components/navs/Navbar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
	const location = useLocation();
	const [menu, setMenu] = useState(7);
	const [title, setTitle] = useState("");

	useEffect(() => {
		if (location.pathname.includes("/admin")) {
			setMenu(100);
			setTitle("관리자 로그인");
		} else if (location.pathname.includes("/manager")) {
			setMenu(5);
			setTitle("관리자");
		} else if (location.pathname === "/") {
			setMenu(7);
			setTitle("");
		} else if (location.pathname.includes("/business")) {
			setMenu(1);
			setTitle("한숲사업");
		} else if (location.pathname.includes("/order")) {
			setMenu(2);
			setTitle("예약안내");
		} else if (location.pathname.includes("/community")) {
			setMenu(3);
			setTitle("커뮤니티");
		} else if (location.pathname.includes("/enterprise")) {
			setMenu(4);
			setTitle("협력기업");
		} else {
			setMenu(0);
			setTitle("회사소개");
		}
	}, [location.pathname]);

	return (
		<div class="min-h-screen flex flex-col">
			<Navbar currentMenu={menu} />
			<div class="pt-16 flex-1 flex flex-col w-full">
				<TitleBlock text={title} />
				{menu !== 100 && <SubmenuBlock menu={menu} />}
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
