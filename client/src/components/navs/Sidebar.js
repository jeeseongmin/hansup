import Close from "image/close.png";
import Logo from "image/logo.png";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSidebar } from "reducers/setting";

const Sidebar = ({ isLogin }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const sidebar = useSelector((state) => state.setting.sidebar);
	const loginToken = useSelector((state) => state.setting.loginToken);
	const currentEmail = useSelector((state) => state.setting.currentEmail);
	const currentPassword = useSelector((state) => state.setting.currentPassword);

	const selectMenu = async (url) => {
		history.push(url);
		dispatch(setSidebar("off"));
		window.scrollTo(0, 0);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};

	return (
		<div
			class={
				"z-50 w-full h-full absolute left-0 top-0 flex flex-row transition delay-50 duration-150 " +
				(sidebar === "on" ? "opacity-100 z-50" : "opacity-0 z-0 hidden")
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
							예약 안내
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
								onClick={() => selectMenu("/manager/order/calendar")}
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
	);
};

export default Sidebar;
