import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import SubmitButton from "components/Button/SubmitButton";
import RadioButton from "components/Button/RadioButton";
import Description from "components/Description";

const OrderFinal = () => {
	const [selected, setSelected] = useState(false);
	const [selected2, setSelected2] = useState(false);
	const onSubmit = () => {};
	const onChange = () => {};
	return (
		<div class="w-full flex flex-col justify-center items-center">
			<h1 class="text-4xl font-bold text-hansupBrown mb-16">
				예약이 완료되었습니다!
			</h1>
			<div class="mb-16 h-full px-6 py-8 w-full md:w-2/3 lg:w-1/2 border border-gray-200 shadow-lg">
				<InfoBlock title={"예약자 정보 확인"}>
					<div class="flex flex-col -mt-4">
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								이름
							</div>
							<div class="w-full md:flex-1 text-xl">김한숲</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								연락처
							</div>
							<div class="w-full md:flex-1 text-xl">010-1111-2222</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								인분
							</div>
							<div class="w-full md:flex-1 text-xl">12 인분</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								요청사항
							</div>
							<div class="w-full md:flex-1 text-xl">없음</div>
						</div>
					</div>
				</InfoBlock>
				<InfoBlock title={"예약 일정 정보 확인"}>
					<div class="flex flex-col -mt-4">
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								날짜
							</div>
							<div class="w-full md:flex-1 text-xl">10월 1일</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								시간
							</div>
							<div class="w-full md:flex-1 text-xl">18시 00분</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								수령방식
							</div>
							<div class="w-full md:flex-1 text-xl">배달</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								배달장소
							</div>
							<div class="w-full md:flex-1 text-xl">
								도로명 주소 <br></br>상세주소
							</div>
						</div>
					</div>
				</InfoBlock>
				<InfoBlock title={"예약 메뉴 확인"}>
					<div class="flex flex-col -mt-4">
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								메인메뉴
							</div>
							<div class="w-full md:flex-1 text-xl">
								메인메뉴1, 메인메뉴2, 메인메뉴3, 메인메뉴4
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								식사메뉴
							</div>
							<div class="w-full md:flex-1 text-xl">
								식사메뉴1, 식사메뉴2, 식사메뉴3, 식사메뉴4
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								국1
							</div>
							<div class="w-full md:flex-1 text-xl">국1</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								디저트
							</div>
							<div class="w-full md:flex-1 text-xl">
								디저트1, 디저트2, 디저트3, 디저트4
							</div>
						</div>
					</div>
				</InfoBlock>
				<InfoBlock title={"결제"}>
					<div class="flex flex-col -mt-4">
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								결제수단
							</div>
							<div class="w-full md:flex-1 text-xl">결제수단 1</div>
						</div>

						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								현금영수증
							</div>
							<div class="w-full md:flex-1 text-xl">없음</div>
						</div>
					</div>
				</InfoBlock>
			</div>
			<p class="font-bold text-hansupBrown text-xl text-center mb-2 leading-8">
				예약과 관련해서 문의있으시면,<br class="block md:hidden"></br> 하단의
				번호로 연락주세요!
			</p>
			<div class="h-full py-8 w-full md:w-2/3 lg:w-auto">
				<Description>
					<div class="flex justify-center items-center font-bold px-0 md:px-36 py-4 text-xl">
						010-1111-2222
					</div>
				</Description>
			</div>
		</div>
	);
};

export default OrderFinal;
