import OrderListLayout from "components/Layout/OrderListLayout";
import React, { useState, useEffect, useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import orderList from "routes/order/catering/data/orderList";
import axios from "axios";

const OrderStep2 = ({ info, setInfo, setStep, menuList, listLoading }) => {
	const [menu, setMenu] = useState({
		mainMenu: [...menuList[0].menu].map((element, index) => {
			return element._id;
		}),
		subMenu: [...menuList[1].menu].map((element, index) => {
			return element._id;
		}),
		soup: [...info.soup],
		dessert: [...menuList[3].menu].map((element, index) => {
			return element._id;
		}),
	});
	const prevStep = () => {
		setStep(1);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};

	// 모든 메뉴 선택 가능하도록 할 경우
	// const nextStep = () => {
	// 	if (menu["mainMenu"].length !== 4) {
	// 		alert("메인 메뉴를 4개 선택해주세요.");
	// 	} else if (menu["subMenu"].length !== 4) {
	// 		alert("식사 메뉴를 4개 선택해주세요.");
	// 	} else if (menu["soup"].length !== 1) {
	// 		alert("국 메뉴를 1개 선택해주세요.");
	// 	} else if (menu["dessert"].length !== 5) {
	// 		alert("디저트 메뉴를 5개 선택해주세요.");
	// 	} else {
	// 		const cp = { ...info };
	// 		cp["mainMenu"] = [...menu["mainMenu"]];
	// 		cp["subMenu"] = [...menu["subMenu"]];
	// 		cp["soup"] = [...menu["soup"]];
	// 		cp["dessert"] = [...menu["dessert"]];
	// 		setInfo(cp);
	// 		document.getElementById("scrollRef").scrollTo(0, 0);
	// 		setStep(3);
	// 	}
	// };

	// 국만 선택가능할 경우
	const nextStep = () => {
		if (false && menu["mainMenu"].length !== 4) {
			alert("메인 메뉴를 4개 선택해주세요.");
		} else if (false && menu["subMenu"].length !== 4) {
			alert("식사 메뉴를 4개 선택해주세요.");
		} else if (menu["soup"].length !== 1) {
			alert("국 메뉴를 1개 선택해주세요.");
		} else if (false && menu["dessert"].length !== 5) {
			alert("디저트 메뉴를 5개 선택해주세요.");
		} else {
			const cp = { ...info };
			cp["mainMenu"] = [...menu["mainMenu"]];
			cp["subMenu"] = [...menu["subMenu"]];
			cp["soup"] = [...menu["soup"]];
			cp["dessert"] = [...menu["dessert"]];
			setInfo(cp);
			document.getElementById("scrollRef").scrollTo(0, 0);
			setStep(3);
		}
	};

	return (
		<div class="w-full flex flex-col justify-center items-center">
			<div class="w-full mb-8">
				<div class="w-full flex flex-col text-center justify-center text-lg text-hansupBrown border-b border-hansupBrown pb-4 mb-4">
					<p>
						한숲의 메뉴는 메인 메뉴, 식사 메뉴, 국, 디저트로 구성되어있습니다.
					</p>
					<p>
						메인 메뉴는 고정 메뉴 3가지와 자율 메뉴 1가지로 구성됩니다. 자율
						메뉴는 추후 공지드릴 예정입니다.{" "}
					</p>
					<p>식사 메뉴는 고정 메뉴 4가지로 구성됩니다.</p>
					<p class="text-red-500">
						국은 원하시는 종류의 국을 하나 선택해주셔야 합니다.
					</p>
				</div>
				{listLoading &&
					menuList.map((element, index) => {
						return (
							<OrderListLayout
								key={element}
								info={element}
								col={5}
								type={"select"}
								setMenu={setMenu}
								menuList={menu}
							/>
						);
					})}{" "}
				<div class="w-full flex justify-center items-center">
					<div class="w-full h-12 flex flex-row justify-between">
						<div
							onClick={prevStep}
							class="w-36 md:w-60 cursor-pointer h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
						>
							<BsArrowLeft class="mr-2" /> 이전
						</div>
						<div
							onClick={nextStep}
							class="w-36 md:w-60 cursor-pointer h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
						>
							다음 <BsArrowRight class="ml-2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderStep2;
