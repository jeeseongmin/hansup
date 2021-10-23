import StepBox from "components/Box/StepBox";
import PageLayout from "components/Layout/PageLayout";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import OrderStep1 from "routes/order/catering/OrderStep1";
import OrderStep2 from "routes/order/catering/OrderStep2";
import OrderStep3 from "routes/order/catering/OrderStep3";
import OrderFinal from "routes/order/catering/OrderFinal";

const Ordering = () => {
	const [step, setStep] = useState(1);
	const [info, setInfo] = useState({
		name: "",
		phone1: "",
		phone2: "",
		phone3: "",
		count: "",
		request: "",
		date: new Date(),
		delivery: "delivery",
		address1: "",
		address2: "",
		mainMenu: [],
		subMenu: [],
		soup: [],
		dessert: [],
		payment: "",
		cashReceipt: {},
	});
	const clickMenu = (index, type) => {
		console.log(index, type);
		const cp = { ...info };
		if (info[type].includes(index)) {
			let arr = [...info[type]].filter(function (element, index) {
				return element !== index;
			});
			cp[type] = arr;
			setInfo(cp);
		} else {
			let arr = [...info[type], index];
			cp[type] = arr;
			setInfo(cp);
		}
		console.log(info);
		여기부터 해결해보기
	};

	const changeInfo = (e, type) => {
		if (type === "date" || type === "delivery") {
			const cp = { ...info };
			cp[type] = e;
			setInfo(cp);
		} else {
			const cp = { ...info };
			cp[type] = e.target.value;
			setInfo(cp);
		}
	};
	return (
		<PageLayout>
			<div class="z-30 w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 ">
				<div class="grid-cols-3 gap-8 mb-8 hidden lg:grid">
					<StepBox
						step={step}
						current={1}
						text={"1. 예약정보 입력"}
						setStep={setStep}
					/>
					<StepBox
						step={step}
						current={2}
						text={"2. 메뉴 선택"}
						setStep={setStep}
					/>
					<StepBox step={step} current={3} text={"3. 결제"} setStep={setStep} />
				</div>
				<div class="grid grid-cols-1 gap-8 mb-8 lg:hidden">
					{step === 1 && (
						<StepBox
							step={step}
							current={1}
							text={"1. 예약정보 입력"}
							setStep={setStep}
						/>
					)}
					{step === 2 && (
						<StepBox
							step={step}
							current={2}
							text={"2. 메뉴 선택"}
							setStep={setStep}
						/>
					)}
					{step === 3 && (
						<StepBox
							step={step}
							current={3}
							text={"3. 결제"}
							setStep={setStep}
						/>
					)}
				</div>
				<div class="w-full relative border-b border-hansupBrown mb-16">
					<div class="absolute w-full left-0 -bottom-2 grid grid-cols-3 gap-8">
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +
									(step === 0
										? "bg-none"
										: step === 1
										? "bg-hansupBrown"
										: "bg-white border border-hansupBrown")
								}
							>
								{step !== 0 && step !== 1 && (
									<AiOutlineCheck class="w-3/4 h-3/4" />
								)}
							</div>
						</div>
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +
									(step === 1
										? "bg-none"
										: step === 2
										? "bg-hansupBrown"
										: "bg-white border border-hansupBrown")
								}
							>
								{step !== 1 && step !== 2 && (
									<AiOutlineCheck class="w-3/4 h-3/4" />
								)}
							</div>
						</div>
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +
									(step === 1 || step === 2
										? "bg-none"
										: step === 3
										? "bg-hansupBrown"
										: "bg-white border border-hansupBrown")
								}
							>
								{step !== 1 && step !== 2 && step !== 3 && (
									<AiOutlineCheck class="w-3/4 h-3/4" />
								)}
							</div>
						</div>
					</div>
				</div>
				{step === 1 && (
					<OrderStep1
						info={info}
						setInfo={setInfo}
						setStep={setStep}
						changeInfo={changeInfo}
					/>
				)}
				{step === 2 && (
					<OrderStep2
						info={info}
						setInfo={setInfo}
						setStep={setStep}
						clickMenu={clickMenu}
					/>
				)}
				{step === 3 && (
					<OrderStep3 info={info} setInfo={setInfo} setStep={setStep} />
				)}
				{step === 4 && (
					<OrderFinal info={info} setInfo={setInfo} setStep={setStep} />
				)}
			</div>
		</PageLayout>
	);
};

export default Ordering;
