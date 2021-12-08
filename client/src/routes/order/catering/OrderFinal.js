import InfoBlock from "components/Block/InfoBlock";
import Description from "components/Description";
import React from "react";
import { useHistory } from "react-router-dom";

const OrderFinal = ({ info, allMenuList }) => {
	const history = useHistory();

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
							<div class="w-full md:flex-1 text-xl">{info.name}</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								연락처
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.phone1}-{info.phone2}-{info.phone3}
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								인분
							</div>
							<div class="w-full md:flex-1 text-xl">{info.count} 인분</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								요청사항
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.request === "" ? "없음" : info.request}
							</div>
						</div>
					</div>
				</InfoBlock>
				<InfoBlock title={"예약 일정 정보 확인"}>
					<div class="flex flex-col -mt-4">
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								날짜
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.date.getFullYear()}년 {info.date.getMonth() + 1}월{" "}
								{info.date.getDate()}일
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								시간
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.date.getHours()}시 {info.date.getMinutes()}분
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								수령방식
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.delivery === "delivery" ? "배달" : "직접 수령"}
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								배달장소
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.address1} <br></br>
								{info.address2}
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
								{info.mainMenu
									.map((element, index) => {
										return allMenuList[element].name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "}
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								식사메뉴
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.subMenu
									.map((element, index) => {
										return allMenuList[element].name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "}
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								국1
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.soup
									.map((element, index) => {
										return allMenuList[element].name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "}
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								디저트
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.dessert
									.map((element, index) => {
										return allMenuList[element].name;
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "}
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
							<div class="w-full md:flex-1 text-xl">
								{info.payment === "card"
									? "신용카드"
									: info.payment === "cash"
									? "현금"
									: "계좌이체"}
							</div>
						</div>
						<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								결제여부
							</div>
							<div class="w-full md:flex-1 text-xl">
								{info.payed ? "결제 완료" : "미결제"}
							</div>
						</div>

						{!info.cashReceipt.status ? (
							<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
								<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
									현금영수증
								</div>
								<div class="w-full md:flex-1 text-xl">없음</div>
							</div>
						) : (
							<>
								<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
									<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
										현금영수증
									</div>
									<div class="w-full md:flex-1 text-xl">
										{info.cashReceipt.type === "business"
											? "사업자증빙용"
											: "개인소득공제용"}
									</div>
								</div>
								<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
									<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
										{info.cashReceipt.type === "business"
											? "사업자번호"
											: "핸드폰번호"}
									</div>
									<div class="w-full md:flex-1 text-xl">
										{info.cashReceipt.number}
									</div>
								</div>
							</>
						)}
					</div>
				</InfoBlock>
			</div>
			<p class="font-bold text-hansupBrown text-xl text-center mb-4 leading-8">
				주문을 확인한 뒤,<br class="block md:hidden"></br> 해당 연락처로 확정
				문자를 드리겠습니다.
			</p>
			<p class="font-bold text-hansupBrown text-xl text-center mb-2 leading-8">
				예약과 관련해서 문의있으시면,<br class="block md:hidden"></br> 하단의
				번호로 연락주세요!
			</p>
			<div class="h-full py-8 w-full md:w-2/3 lg:w-auto">
				<Description>
					<div class="flex justify-center items-center font-bold px-0 md:px-36 py-4 text-xl">
						010-4388-2241
					</div>
				</Description>
			</div>
			<div class="h-12 w-full md:w-2/3 flex justify-center items-center">
				<div
					onClick={() => history.push("/")}
					class="mt-4 cursor-pointer w-full lg:w-60 h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
				>
					홈으로
				</div>
			</div>
		</div>
	);
};

export default OrderFinal;
