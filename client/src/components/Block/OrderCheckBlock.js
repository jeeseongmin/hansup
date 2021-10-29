import Switch from "@mui/material/Switch";
import axios from "axios";
import InfoBlock from "components/Block/InfoBlock";
import Subtitle from "components/Subtitle";
import React from "react";
import { MdClose } from "react-icons/md";

const OrderCheckBlock = ({ info, handleClose, toggleChange }) => {
	const [checked, setChecked] = React.useState(info.payed);

	const handleChange = async (event) => {
		setChecked(event.target.checked);
		await axios
			.post(
				"/api/order/payed/" + info._id,
				{
					key: process.env.REACT_APP_API_KEY,
					payed: event.target.checked,
				},
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then(async (Response) => {
				await alert(
					Response.payed ? "예약이 확정되었습니다." : "예약이 미확정되었습니다."
				);
				toggleChange();
			})
			.catch((Error) => {
				console.log(Error);
			});
	};

	return (
		<>
			<div class="w-full inline-flex mb-8 flex-row justify-between items-center">
				<Subtitle subtitle="예약 내역 확인" />
				<div class="flex flex-row justify-center items-center">
					<div class="flex flex-row justify-center items-center mr-2">
						<Switch
							checked={checked}
							onChange={handleChange}
							inputProps={{ "aria-label": "controlled" }}
						/>
						<p class="text-hansupBrown font-bold">
							{checked ? "확정" : "미확정"}
						</p>
					</div>
					<div
						onClick={handleClose}
						class=" cursor-pointer h-full flex flex-row justify-end items-center outline-none transtion delay-50 duration-300 text-hansupBrown font-bold text-xl"
					>
						<MdClose size={32} color="#6C4D3F" />
					</div>
				</div>
			</div>
			<InfoBlock title={"예약자 정보"}>
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
						<div class="w-full md:flex-1 text-xl">{info.phone}</div>
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
			<InfoBlock title={"예약 일정 정보"}>
				<div class="flex flex-col -mt-4">
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							날짜
						</div>
						{info.date && (
							<div class="w-full md:flex-1 text-xl">
								{info.date.substr(0, 4)}년 {info.date.substr(5, 2)}월{" "}
								{info.date.substr(8, 2)}일
							</div>
						)}
					</div>
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							시간
						</div>
						{info.date && (
							<div class="w-full md:flex-1 text-xl">
								{info.date.substr(11, 2)}시 {info.date.substr(14, 2)}분
							</div>
						)}
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
						<div class="w-full md:flex-1 text-xl">{info.address}</div>
					</div>
				</div>
			</InfoBlock>
			<InfoBlock title={"예약 메뉴"}>
				<div class="flex flex-col -mt-4">
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							메인메뉴
						</div>
						<div class="w-full md:flex-1 text-xl">
							{info.mainMenu.sort().join(", ")}
						</div>
					</div>
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							식사메뉴
						</div>
						<div class="w-full md:flex-1 text-xl">
							{info.subMenu.sort().join(", ")}
						</div>
					</div>
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							국1
						</div>
						<div class="w-full md:flex-1 text-xl">
							{info.soup.sort().join(", ")}
						</div>
					</div>
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							디저트
						</div>
						<div class="w-full md:flex-1 text-xl">
							{info.dessert.sort().join(", ")}
						</div>
					</div>
				</div>
			</InfoBlock>
			<InfoBlock title={"결제 방법"}>
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
		</>
	);
};

export default OrderCheckBlock;
