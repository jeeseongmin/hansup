import Modal from "@mui/material/Modal";
import InfoBlock from "components/Block/InfoBlock";
import PopupPostCodeBlock from "components/Block/PopupPostCodeBlock";
import Switch from "@mui/material/Switch";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import Subtitle from "components/Subtitle";
import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { setRefreshOrder } from "reducers/common";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import InputBox from "components/Box/InputBox";

const OrderCheckBlock = ({
	info,
	handleClose,
	toggleChange,
	allMenuList,
	listLoading,
	setIsEdit,
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [checked, setChecked] = React.useState(info.payed);
	const refresh_order = useSelector((state) => state.common.refresh_order);
	const [newInfo, setNewInfo] = useState({});

	const [open, setOpen] = useState(false);
	const addressModalOpen = () => setOpen(true);
	const addressModalClose = () => setOpen(false);

	const goEdit = async () => {
		await handleClose();
		window.scrollTo(0, 0);
		history.push("/manager/order/update/" + info._id);
	};

	const deleteOrder = async () => {
		await axios
			.post(
				"/api/order/deletecheck/" + info._id,
				{
					key: process.env.REACT_APP_API_KEY,
				},
				{
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((response) => {
				toggleChange();
				alert("삭제되었습니다.");
				if (refresh_order === "delete") {
					dispatch(setRefreshOrder("redelete"));
				} else dispatch(setRefreshOrder("delete"));
				handleClose();
			})
			.catch((response) => {
				console.log("Error!");
			});
	};

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
				if (refresh_order === "decide") {
					dispatch(setRefreshOrder("redecide"));
				} else dispatch(setRefreshOrder("decide"));
				await alert(
					Response.data.payed
						? "예약이 확정되었습니다."
						: "예약이 미확정되었습니다."
				);
				toggleChange();
				handleClose();
			})
			.catch((Error) => {
				console.log(Error);
			});
	};

	const dateToString = (date) => {
		if (date) {
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
		}
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
								{new Date(info.date).getFullYear()}-
								{new Date(info.date).getMonth() + 1}-
								{new Date(info.date).getDate()}
							</div>
						)}
					</div>
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-center border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							시간
						</div>
						{info.date && (
							<div class="w-full md:flex-1 text-xl">
								{new Date(info.date).getHours() +
									":" +
									(new Date(info.date).getMinutes() === 0
										? "00"
										: new Date(info.date).getMinutes())}{" "}
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
							{listLoading &&
								info.mainMenu
									.map((element, index) => {
										return allMenuList[element]
											? allMenuList[element].name
											: "";
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
							{listLoading &&
								info.subMenu
									.map((element, index) => {
										return allMenuList[element]
											? allMenuList[element].name
											: "";
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "}
						</div>
					</div>
					<div class="px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200">
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							국
						</div>
						<div class="w-full md:flex-1 text-xl">
							{listLoading &&
								info.soup
									.map((element, index) => {
										return allMenuList[element]
											? allMenuList[element].name
											: "";
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
							{listLoading &&
								info.dessert
									.map((element, index) => {
										return allMenuList[element]
											? allMenuList[element].name
											: "";
									})
									.sort((a, b) => a.createdAt - b.createAt)
									.join(", ")}{" "}
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
					<div
						class={
							"px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start " +
							(info.payment !== "card" ? "border-b-2 border-gray-200" : "")
						}
					>
						<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
							결제여부
						</div>
						<div class="w-full md:flex-1 text-xl">
							{info.payed ? "결제 완료" : "미결제"}
						</div>
					</div>

					{!info.cashReceipt.status ? (
						<div
							class={
								"px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start " +
								(info.payment !== "card" ? "" : "hidden")
							}
						>
							<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
								현금영수증
							</div>
							<div class="w-full md:flex-1 text-xl">없음</div>
						</div>
					) : (
						<>
							<div
								class={
									"px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start border-b-2 border-gray-200 " +
									(info.payment !== "card" ? "" : "hidden")
								}
							>
								<div class="w-full md:w-1/4 text-xl font-bold md:font-normal mb-4 md:mb-0">
									현금영수증
								</div>
								<div class="w-full md:flex-1 text-xl">
									{info.cashReceipt.type === "business"
										? "사업자증빙용"
										: "개인소득공제용"}
								</div>
							</div>
							<div
								class={
									"px-4 py-4 flex flex-col md:flex-row justify-start md:justify-between items-start " +
									(info.payment !== "card" ? "" : "hidden")
								}
							>
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
			<div class="h-24 md:h-10 w-full flex justify-between flex-col md:flex-row">
				<div
					onClick={goEdit}
					class="h-10 md:h-full cursor-pointer flex justify-center items-center w-full md:w-36 border border-hansupBrown transition delay-50 duration-150 hover:bg-hansupBrown hover:text-white text-hansupBrown mb-4 md:mb-0"
				>
					수정하기
				</div>
				<div
					onClick={deleteOrder}
					class="h-10 md:h-full cursor-pointer flex justify-center items-center w-full md:w-36 border border-hansupBrown transition delay-50 duration-150 hover:bg-hansupBrown hover:text-white text-hansupBrown"
				>
					삭제하기
				</div>
			</div>
		</>
	);
};

export default OrderCheckBlock;
