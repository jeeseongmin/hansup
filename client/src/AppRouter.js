import Layout from "components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Business from "routes/business/Index";
import Community from "routes/community/Index";
import Enterprise from "routes/enterprise/Index";
import Home from "routes/Home";
import Intro from "routes/intro/Index";
import Manager from "routes/manager/Index";
import Order from "routes/order/Index";
import { useDispatch, useSelector } from "react-redux";
import Admin from "routes/admin/index";
import {
	setSidebar,
	setLoginToken,
	setCurrentEmail,
	setCurrentPassword,
	setMenu,
	setSubmenu,
} from "./reducers/setting";
import Logo from "image/logo.png";
import Close from "image/close.png";
import Sidebar from "components/navs/Sidebar";

const App = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const sidebar = useSelector((state) => state.setting.sidebar);
	const loginToken = useSelector((state) => state.setting.loginToken);
	const currentEmail = useSelector((state) => state.setting.currentEmail);
	const currentPassword = useSelector((state) => state.setting.currentPassword);

	const [isLogin, setIsLogin] = useState(false);

	const [isIe, setIsIe] = useState(false);

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
			}
		}
	}, [sessionStorage.getItem("loginToken")]);

	useEffect(() => {
		if (
			navigator.userAgent.indexOf("MSIE") !== -1 ||
			!!document.documentMode === true
		) {
			setIsIe(true);
			console.log("Internet Explorer");
		}
	}, []);

	useEffect(() => {
		let loginToken = sessionStorage.getItem("loginToken");
		if (loginToken === null || !loginToken) {
			dispatch(setLoginToken("logout"));
			dispatch(setCurrentEmail(""));
			dispatch(setCurrentPassword(""));
			dispatch(setMenu(0));
			dispatch(setSubmenu(0));
		}
	}, []);

	return isIe ? (
		<>
			<div class="h-screen">
				<div class="w-full h-full flex flex-col justify-center items-center">
					<h1 class="font-bold text-4xl mb-8">다른 브라우저를 이용해주세요.</h1>
					<div class="w-full h-96 flex justify-center items-center mb-8">
						<img
							src="/image/home-img2.png"
							class="h-full object-contain"
							alt="main-img2"
						/>
					</div>
					<p>한숲푸드 홈페이지는</p>
					<p>
						<b>Internet Explorer</b>를 지원하지 않습니다.
					</p>
					<p>
						<b>Chrome, Edge, Safari</b>를 이용해주시기 바랍니다.
					</p>
				</div>
			</div>
		</>
	) : (
		<>
			<div
				id="scrollRef"
				class={
					"h-screen min-h-screen select-none w-full flex flex-col scrollbar-hide relative " +
					(sidebar === "off" ? "overflow-y-scroll" : "overflow-y-hidden")
				}
			>
				<>
					<Layout>
						<Switch>
							<Route exact path="/admin" component={Admin} />
							<Route exact path="/" component={Home} />
							<Route path="/intro/:submenu" component={Intro} />
							<Route path="/business/:submenu" component={Business} />
							<Route path="/community/:submenu" component={Community} />
							<Route path="/order/:type/:submenu" component={Order} />
							<Route path="/enterprise/:submenu" component={Enterprise} />
							<Route path="/manager/:submenu" component={Manager} />
						</Switch>
					</Layout>
				</>
			</div>
			<Sidebar isLogin={isLogin} />
		</>
	);
};

export default App;
