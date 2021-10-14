import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import SubmitButton from "components/Button/SubmitButton";

const OrderStep1 = ({ person, setPerson, schedule, setSchedule, onChange }) => {
	const onSubmit = () => {};

	return (
		<div class="w-full flex flex-col justify-center items-center">
			<form class="w-full md:w-2/3 lg:w-1/2" onSubmit={onSubmit}>
				<InfoBlock title={"예약자 정보"}>
					<div class="px-4 flex flex-col">
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">이름</div>
							<div class="flex-1 h-full">
								<InputBox
									value=""
									type=""
									placeholder="이름을 입력하세요"
									onChange={onChange}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">연락처</div>
							<div class="flex-1 h-full grid grid-cols-3 gap-2">
								<InputBox value="" type="" placeholder="" onChange={onChange} />
								<InputBox value="" type="" placeholder="" onChange={onChange} />
								<InputBox value="" type="" placeholder="" onChange={onChange} />
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">인분</div>
							<div class="flex-1 h-full">
								<InputBox
									value=""
									type=""
									placeholder="최소 10인분"
									onChange={onChange}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">요청사항</div>
							<div class="flex-1 h-full">
								<InputBox
									value=""
									type=""
									placeholder="최대 50자까지 입력 가능"
									onChange={onChange}
								/>
							</div>
						</div>
					</div>
				</InfoBlock>
				<InfoBlock title={"예약 일정 정보"}>
					<div class="px-4 flex flex-col">
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">날짜</div>
							<div class="flex-1 h-full grid grid-cols-2 gap-2">
								<InputBox
									value=""
									type=""
									placeholder="월"
									onChange={onChange}
								/>
								<InputBox
									value=""
									type=""
									placeholder="일"
									onChange={onChange}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">시간</div>
							<div class="flex-1 h-full grid grid-cols-2 gap-2">
								<InputBox
									value=""
									type=""
									placeholder="시"
									onChange={onChange}
								/>
								<InputBox
									value=""
									type=""
									placeholder="분"
									onChange={onChange}
								/>
							</div>
						</div>
						<div class="h-12 mb-4 flex flex-row justify-between items-center">
							<div class="w-1/4 text-xl">수령방식</div>
							<div class="flex-1 h-full grid grid-cols-2">
								<div
									class={
										"w-full h-full flex justify-center items-center border-2 cursor-pointer " +
										(schedule.method === "1"
											? "bg-hansupBrown text-white fond-bold"
											: "border-gray-200 text-gray-400")
									}
								>
									배달
								</div>
								<div
									class={
										"w-full h-full flex justify-center items-center border-t-2 border-b-2 border-r-2 cursor-pointer " +
										(schedule.method === "1"
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
									value=""
									type=""
									placeholder="도로명 주소"
									onChange={onChange}
								/>
								<InputBox
									value=""
									type=""
									placeholder="상세 주소"
									onChange={onChange}
								/>
							</div>
						</div>
						<div class="w-full h-12">
							<SubmitButton text={"다음"} onSubmit={onSubmit} />
						</div>
					</div>
				</InfoBlock>
			</form>
		</div>
	);
};

export default OrderStep1;
