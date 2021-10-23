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
	const prevStep = () => {
		setStep(1);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};

	const check = () => {
		setStep(3);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};

	return (
		<div class="w-full flex flex-col justify-center items-center">
			<div class="w-full mb-8">
				{[0, 1, 2, 3].map((element, index) => {
					return (
						<OrderListLayout
							key={orderList[element]}
							info={orderList[element]}
							col={5}
							type={"select"}
							clickMenu={clickMenu}
							data={info}
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
							onClick={check}
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
