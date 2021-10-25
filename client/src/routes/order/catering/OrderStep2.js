import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import SubmitButton from "components/Button/SubmitButton";
import CateringMenuBlock from "components/Block/CateringMenuBlock";
import orderList from "routes/order/catering/data/orderList";
import OrderListLayout from "components/Layout/OrderListLayout";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
const OrderStep2 = ({ info, setInfo, setStep, clickMenu }) => {
	const [menu, setMenu] = useState({
		mainMenu: [...info.mainMenu],
		subMenu: [...info.subMenu],
		soup: [...info.soup],
		dessert: [...info.dessert],
	});
	const prevStep = () => {
		setStep(1);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};

	const nextStep = () => {
		if (menu["mainMenu"].length !== 4) {
			alert("메인 메뉴를 4개 선택해주세요.");
		} else if (menu["subMenu"].length !== 4) {
			alert("식사 메뉴를 4개 선택해주세요.");
		} else if (menu["soup"].length !== 1) {
			alert("국 메뉴를 1개 선택해주세요.");
		} else if (menu["dessert"].length !== 5) {
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
				{[0, 1, 2, 3].map((element, index) => {
					return (
						<OrderListLayout
							key={index}
							info={orderList[element]}
							col={5}
							type={"select"}
							setMenu={setMenu}
							menu={menu}
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
