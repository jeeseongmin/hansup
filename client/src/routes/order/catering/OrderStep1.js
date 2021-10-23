import React, { useState, useEffect, useRef } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import SubmitButton from "components/Button/SubmitButton";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";

const OrderStep1 = ({ info, setInfo, setStep, changeInfo }) => {
	// const [date, setDate] = useState(new Date());
	const passStep = () => {
		console.log("step 1 마감");
		console.log(info);
		setStep(2);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};
	// const onChange2 = (date) => {
	// 	setDate(date);
	// 	changeInfo();
	// };
	const dateToString = (date) => {
		return (
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1).toString().padStart(2, "0") +
			"-" +
			date.getDate().toString().padStart(2, "0") +
			" " +
			date.getHours().toString().padStart(2, "0") +
			":" +
			date.getMinutes().toString().padStart(2, "0")
		);
	};
	const DateInput = ({ value, onClick }) => {
		return (
			<div
				onClick={onClick}
				class="w-full h-full flex justify-center items-center cursor-pointer"
			>
				<AiTwotoneCalendar size={24} />
			</div>
		);
	};

	return (
		<div class="w-full flex flex-col justify-center items-center">
			<div class="w-full md:w-2/3 lg:w-1/2">
				<InfoBlock title={"예약자 정보"}>
					<div class="px-4 flex flex-col">
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">이름</div>
							<div class="flex-1 h-full">
								<InputBox
									value={info.name}
									type="name"
									placeholder="이름을 입력하세요"
									onChange={changeInfo}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">연락처</div>
							<div class="flex-1 h-full grid grid-cols-3 gap-2">
								<InputBox
									value={info.phone1}
									type="phone1"
									placeholder="010"
									onChange={changeInfo}
								/>
								<InputBox
									value={info.phone2}
									type="phone2"
									placeholder=""
									onChange={changeInfo}
								/>
								<InputBox
									value={info.phone3}
									type="phone3"
									placeholder=""
									onChange={changeInfo}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">인분</div>
							<div class="flex-1 h-full">
								<InputBox
									value={info.count}
									type="count"
									placeholder="ex) 10인분 (최소 10인분)"
									onChange={changeInfo}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">요청사항</div>
							<div class="flex-1 h-full">
								<InputBox
									value={info.request}
									type="request"
									placeholder="최대 50자까지 입력 가능"
									onChange={changeInfo}
								/>
							</div>
						</div>
					</div>
				</InfoBlock>
				<InfoBlock title={"예약 일정 정보"}>
					<p class="w-full text-center mb-4 font-bold text-hansupBrown">
						배달을 원하는 시간과 장소를 입력해주세요.{" "}
					</p>
					<div class="px-4 flex flex-col">
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">날짜</div>
							<div class="flex-1 h-full flex justify-between items-center">
								<div class="flex-1 h-12 px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 flex items-center">
									{dateToString(info.date)}
								</div>
								<div class="w-12">
									<DatePicker
										selected={info.date}
										onChange={(date) => changeInfo(date, "date")}
										showTimeSelect
										customInput={<DateInput />}
									/>
								</div>
							</div>
						</div>
						{/* <div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">시간</div>
							<div class="flex-1 h-full grid grid-cols-2 gap-2">
								<InputBox
									value=""
									type=""
									placeholder="시"
									changeInfo={changeInfo}
								/>
								<InputBox
									value=""
									type=""
									placeholder="분"
									changeInfo={changeInfo}
								/>
							</div>
						</div> */}
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">수령방식</div>
							<div class="flex-1 h-full grid grid-cols-2">
								<div
									onClick={() => changeInfo("delivery", "delivery")}
									class={
										"w-full h-full flex justify-center items-center transition delay-50 duration-100 border-2 cursor-pointer " +
										(info.delivery === "delivery"
											? "bg-hansupBrown text-white fond-bold"
											: "border-gray-200 text-gray-400")
									}
								>
									배달
								</div>
								<div
									onClick={() => changeInfo("self", "delivery")}
									class={
										"w-full h-full flex justify-center items-center transition delay-50 duration-100 border-t-2 border-b-2 border-r-2 cursor-pointer " +
										(info.delivery === "self"
											? "bg-hansupBrown text-white fond-bold"
											: "border-gray-200 text-gray-400")
									}
								>
									{" "}
									직접방문
								</div>
							</div>
						</div>
						<div class="h-28 mb-8 flex flex-row justify-between items-start">
							<div class="w-1/4 text-xl h-full grid grid-rows-2 gap-2 ">
								<p class="w-full h-full flex items-center">배달장소</p>
								<p></p>
							</div>

							<div class="flex-1 h-full grid grid-rows-2 gap-2">
								<InputBox
									value={info.address1}
									type="address1"
									placeholder="도로명 주소"
									onChange={changeInfo}
								/>
								<InputBox
									value={info.address2}
									type="address2"
									placeholder="상세 주소"
									onChange={changeInfo}
								/>
							</div>
						</div>
						<div class="w-full h-12">
							<div
								onClick={passStep}
								class="cursor-pointer w-full h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
							>
								다음
							</div>
						</div>
					</div>
				</InfoBlock>
			</div>
		</div>
	);
};

export default OrderStep1;
