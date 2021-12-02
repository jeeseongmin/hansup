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

	const selectMenu = async (url) => {
		history.push(url);
		dispatch(setSidebar("off"));
		window.scrollTo(0, 0);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};

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
			<div
				class={
					"z-50 w-full h-full absolute left-0 top-0 flex flex-row transition delay-50 duration-150 " +
					(sidebar === "on" ? "flex" : "hidden")
				}
			>
				<div
					onClick={() => dispatch(setSidebar("off"))}
					class="flex-1 h-screen bg-black opacity-50"
				></div>
				<div class="select-none w-36 sm:w-60 bg-hansupBrown h-screen top-0 left-0 flex flex-col justify-between px-8 py-8 text-white">
					<div class="w-full h-6 flex flex-row justify-end mb-16">
						<img
							onClick={() => dispatch(setSidebar("off"))}
							src={Close}
							class="h-full object-cover cursor-pointer"
							alt="logo"
						/>
					</div>
					<div class="flex-1 w-full flex flex-col font-bold text-lg sm:text-xl">
						<div class="w-full text-center mb-8">
							<p
								onClick={() => selectMenu("/intro/introduction")}
								class="cursor-pointer"
							>
								회사소개
							</p>
						</div>
						<div class="w-full text-center mb-8">
							<p
								onClick={() => selectMenu("/business/restaurant")}
								class="cursor-pointer"
							>
								한숲사업
							</p>
						</div>
						<div class="w-full text-center mb-8">
							<p
								onClick={() => selectMenu("/order/catering/menu")}
								class="cursor-pointer"
							>
								예약안내
							</p>
						</div>
						<div class="w-full text-center mb-8">
							<p
								onClick={() => selectMenu("/community/notice/list")}
								class="cursor-pointer"
							>
								커뮤니티
							</p>
						</div>
						<div class="w-full text-center mb-8">
							<p
								onClick={() => selectMenu("/enterprise/hansup")}
								class="cursor-pointer"
							>
								협력기업
							</p>
						</div>
						{isLogin && (
							<div class="w-full text-center mb-8">
								<p
									onClick={() => selectMenu("/manager/schedule")}
									class="cursor-pointer"
								>
									관리자
								</p>
							</div>
						)}
					</div>
					<div class="w-full h-auto flex flex-col justify-end px-0 sm:px-4">
						<img
							onClick={() => selectMenu("/")}
							src={Logo}
							class="w-full object-cover cursor-pointer"
							alt="logo"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
