import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import SubmitButton from "components/Button/SubmitButton";
import OrderStep1 from "routes/order/catering/OrderStep1";
import OrderStep2 from "routes/order/catering/OrderStep2";
import OrderStep3 from "routes/order/catering/OrderStep3";

/* 
	해야 할 것 :
	1. 각 input 정보 변동
	2. onChange 구성
	3. orderStep 1 onSubmit 구성

*/
const Ordering = () => {
	const [step, setStep] = useState(1);
	const [person, setPerson] = useState({
		name: "",
		phone: "",
		count: "",
		request: "",
	});
	const [schedule, setSchedule] = useState({
		date: "",
		time: "",
		method: "",
		location: "",
	});

	const onChange = () => {};
	return (
		<PageLayout>
			<div class="z-30 w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 ">
				<div class="grid grid-cols-3 gap-8 mb-8">
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
				<div class="w-full relative border-b border-hansupBrown mb-16">
					<div class="absolute w-full left-0 -bottom-2 grid grid-cols-3 gap-8">
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 " +
									(step === 1 ? "bg-hansupBrown" : "bg-none")
								}
							></div>
						</div>
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 " +
									(step === 2 ? "bg-hansupBrown" : "bg-none")
								}
							></div>
						</div>
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 " +
									(step === 3 ? "bg-hansupBrown" : "bg-none")
								}
							></div>
						</div>
					</div>
				</div>
				{step === 1 && (
					<OrderStep1
						person={person}
						setPerson={setPerson}
						schedule={schedule}
						setSchedule={setSchedule}
						onChange={onChange}
					/>
				)}
				{step === 2 && <OrderStep2 />}
				{step === 3 && <OrderStep3 person={person} schedule={schedule} />}
			</div>
		</PageLayout>
	);
};

export default Ordering;
