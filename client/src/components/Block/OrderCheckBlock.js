import Switch from "@mui/material/Switch";
import axios from "axios";
import InfoBlock from "components/Block/InfoBlock";
import Subtitle from "components/Subtitle";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-datepicker/dist/react-datepicker.css";
import {
	GrAddCircle,
	GrSubtractCircle,
	GrFormEdit,
	GrSave,
} from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { setRefreshOrder } from "reducers/common";
import OrderBillBlock from "components/Block/OrderBillBlock";

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
	const [checkedPrint, setCheckedPrint] = React.useState(false);
	const refresh_order = useSelector((state) => state.common.refresh_order);
	const printRef = useRef();
	const printBtnRef = useRef();
	const [printMenu, setPrintMenu] = useState(
		info.mainMenu
			.concat(info.subMenu, info.soup, info.dessert)
			.map((element, index) => {
				return {
					name: allMenuList[element].name,
					isEdit: false,
					isDeleted: false,
				};
			})
	);
	const reset = () => {
		setPrintMenu(
			info.mainMenu
				.concat(info.subMenu, info.soup, info.dessert)
				.map((element, index) => {
					return {
						name: allMenuList[element].name,
						isEdit: false,
						isDeleted: false,
					};
				})
		);
	};
	const changePrintMenu = (e, index) => {
		const cp = [...printMenu];
		cp[index].name = e.target.value;
		setPrintMenu(cp);
	};
	const deletePrintMenu = (index) => {
		console.log("deletePrintMEnu", index);
		const cp = [...printMenu];
		cp[index].isDeleted = true;
		setPrintMenu(cp);
	};
	const createPrintMenu = (index) => {
		const cp = [...printMenu];
		cp.splice(index + 1, 0, {
			name: "",
			isEdit: false,
			isDeleted: false,
		}); // index 2 ('c')의 위치에 요소를 추가
		// cp.push({
		// 	name: "",
		// 	isEdit: false,
		// 	isDeleted: false,
		// });
		setPrintMenu(cp);
		console.log("new", cp);
	};
	const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

	const [tmp, setTmp] = useState("");
	const [printInfo, setPrintInfo] = useState({
		price: "",
		bonusMenu: "something",
		description: [],
	});
	const priceRef = useRef();
	const bonusMenuRef = useRef();
	const descriptionRef = useRef();
	const addDescription = () => {
		if (tmp !== "") {
			const cp = { ...printInfo };
			cp["description"].push({
				text: tmp,
				isDeleted: false,
			});
			setTmp("");
		}
	};
	const removeDescription = (index) => {
		console.log("index", index);
		const cp = { ...printInfo };
		cp["description"][index].isDeleted = true;
		setPrintInfo(cp);
	};

	const onChange = (e, type) => {
		if (type === "description") {
			setTmp(e.target.value);
		} else {
			const cp = { ...printInfo };
			cp[type] = e.target.value;
			setPrintInfo(cp);
		}
	};

	const goEdit = async () => {
		await handleClose();
		window.scrollTo(0, 0);
		history.push("/manager/order/update/" + info._id);
	};

	const deleteOrder = async () => {
		handleClose();
		confirmAlert({
			message: "정말 해당 주문을 삭제하시겠습니까?",
			buttons: [
				{
					label: "삭제하기",
					onClick: async () =>
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
							}),
				},
				{
					label: "취소하기",
					onClick: () => alert("취소하였습니다."),
				},
			],
		});
	};

	const printSubmit = () => {
		if (printInfo.price === "") {
			alert("가격을 입력해주세요.");
		} else if (isNaN(printInfo.price)) {
			alert("가격 칸에는 숫자만 입력해주세요.");
		} else {
			alert("출력합니다.");
		}
	};

	const handleChangePrint = () => {
		setCheckedPrint(!checkedPrint);
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
			<div
				class={
					"w-full flex flex-col mb-4 " +
					(checkedPrint ? "border-2 border-hansupBrown" : "")
				}
			>
				<div
					onClick={handleChangePrint}
					class={
						"flex justify-between transition delay-50 duration-150 " +
						(checkedPrint ? "mb-2 border-b-2 border-hansupBrown" : "")
					}
				>
					<div class={"" + (checkedPrint ? "hidden" : "invisible")}>
						<RiArrowDropDownLine size={32} />
					</div>
					<p
						class={
							"px-2 font-bold flex items-center " +
							(checkedPrint
								? "text-xl"
								: "cursor-pointer border-2 border-hansupBrown text-center")
						}
					>
						영수증 출력
					</p>
					<div
						class={
							"flex flex-row justify-center items-center mr-2 " +
							(checkedPrint ? "" : "hidden")
						}
					>
						<RiArrowDropDownLine size={32} />
					</div>
				</div>
				<div
					class={"w-full px-2 flex flex-col " + (checkedPrint ? "" : "hidden")}
				>
					<div class="w-full flex flex-col justify-start mb-4">
						<p class="h-8 w-auto font-bold text-hansupBrown mr-2">단가 : </p>
						<p
							class={
								"h-8 w-auto text-red-500 text-xs font-bold mr-2 " +
								(printInfo.price !== "" && !isNaN(printInfo.price)
									? "hidden"
									: "")
							}
						>
							단가 칸은 필수이고, 숫자만 입력가능합니다.
						</p>
						<div class="mr-2 h-8 w-full ">
							<input
								ref={priceRef}
								type="price"
								value={printInfo.price}
								onChange={(e) => onChange(e, "price")}
								class="flex-1 h-full px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 "
								placeholder={"단가"}
							/>
						</div>
					</div>
					{/* 자율 메뉴 입력 - 현재는 전체 메뉴 수정이 있기 때문에 필요 없음 */}
					{/* <div class="w-full flex flex-col justify-start mb-2">
						<p class="h-8 w-auto font-bold text-hansupBrown mr-2">
							자율 메뉴 :{" "}
						</p>
						<p
							class={
								"h-8 w-auto text-red-500 text-xs font-bold mr-2 " +
								(printInfo.bonusMenu !== "" && !isNaN(printInfo.bonusMenu)
									? "hidden"
									: "")
							}
						>
							자율메뉴 칸은 필수입니다.
						</p>
						<div class="mr-2 h-8 w-full ">
							<input
								ref={bonusMenuRef}
								type="bonusMenu"
								value={printInfo.bonusMenu}
								onChange={(e) => onChange(e, "bonusMenu")}
								class="flex-1 h-full px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 "
								placeholder={"자율 메뉴"}
							/>
						</div>
					</div> */}
					{/* 메뉴 수정란 */}
					<div class="w-full">
						<p class="h-8 w-auto font-bold text-hansupBrown mr-2">
							메뉴 수정 :{" "}
						</p>
						<p class={"w-auto text-red-500 text-xs font-bold mb-2"}>
							프린트될 항목 추가, 수정, 삭제 가능 <br></br>[프린트 미리 보기]를
							고려해서 메뉴란 수정바랍니다.<br></br>초기화 버튼을 통해 처음으로
							돌아갈 수 있습니다.
						</p>
						<div class="border-l border-r border-t border-black flex flex-col mb-2">
							<div
								class={"flex flex-row font-bold text-lg border-b border-black "}
							>
								<div class="w-16 flex justify-center items-center border-r border-black">
									NO
								</div>
								<div class="flex-1 flex justify-center items-center">
									음식명
								</div>
								<div
									onClick={reset}
									class="w-16 border-l border-black text-center"
								>
									<span class="text-sm text-red-500 cursor-pointer">
										초기화
									</span>
								</div>
							</div>
							{listLoading &&
								printMenu.map((element, index) => {
									return (
										<div
											key={element}
											class={
												"flex-row text-lg font-bold border-b border-black " +
												(element.isDeleted ? " hidden " : " flex ")
											}
										>
											<div class="w-16 flex justify-center items-center border-r border-black">
												{index + 1}
											</div>

											<div class="flex-1 flex justify-center items-center">
												<input
													value={element.name}
													class="w-full outline-none text-center px-2"
													onChange={(e) => changePrintMenu(e, index)}
												/>
											</div>
											<div class="w-16 border-l border-black flex flex-row justify-around items-center">
												<div
													class="cursor-pointer"
													onClick={() => deletePrintMenu(index)}
												>
													<GrSubtractCircle size={20} />
												</div>
												<div
													class="cursor-pointer"
													onClick={() => createPrintMenu(index)}
												>
													<GrAddCircle size={20} />{" "}
												</div>
											</div>
										</div>
									);
								})}{" "}
						</div>
					</div>
					<div class="w-full flex flex-col justify-start">
						<p class="h-8 w-auto font-bold flex items-center text-hansupBrown">
							추가 메모 입력 :{" "}
						</p>
						<div class="h-8 w-full flex flex-row justify-between items-center">
							<input
								ref={descriptionRef}
								type="description"
								value={tmp}
								onChange={(e) => onChange(e, "description")}
								class="mr-2 flex-1 h-full px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 "
								placeholder={"메모 입력"}
							/>

							<div class="cursor-pointer" onClick={addDescription}>
								<GrAddCircle size={20} />{" "}
							</div>
						</div>

						<div
							class={
								"my-2 w-full " +
								(printInfo.description.length === 0 ||
								printInfo.description.filter(function (element, index) {
									return !element.isDeleted;
								}).length === 0
									? "hidden"
									: "")
							}
						>
							<p class={"my-2 font-bold text-hansupBrown "}>메모 리스트</p>
							{printInfo.description.map((element, index) => {
								return (
									<div
										class={
											"h-8 w-full flex flex-row justify-between items-center mb-2 " +
											(element.isDeleted ? "hidden" : "flex")
										}
									>
										<p>- </p>
										<input
											value={element.text}
											class="mx-2 flex-1 h-full px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 "
											readOnly={true}
										/>

										<div
											class="cursor-pointer"
											onClick={() => removeDescription(index)}
										>
											<GrSubtractCircle size={20} />
										</div>
									</div>
								);
							})}
						</div>
						<div class="my-4 h-8 w-full flex justify-end">
							<ReactToPrint
								ref={printBtnRef}
								trigger={() => (
									<button
										disabled={
											printInfo.price !== "" &&
											!isNaN(printInfo.price) &&
											printInfo.bonusMenu
												? false
												: true
										}
										class={
											"cursor-pointer px-2 py-1   flex justify-center items-center " +
											(printInfo.price !== "" &&
											!isNaN(printInfo.price) &&
											printInfo.bonusMenu
												? "text-hansupBrown border border-hansupBrown"
												: "bg-gray-600 text-white border border-gray-600")
										}
									>
										{printInfo.price !== "" &&
										!isNaN(printInfo.price) &&
										printInfo.bonusMenu
											? "출력 미리보기"
											: "출력 불가"}
									</button>
								)}
								content={() => printRef.current}
							/>
						</div>
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
			<p
				class={
					"w-full text-xl font-bold my-4 pt-2 border-t-2 border-hansupBrown " +
					(checkedPrint ? "grid" : "hidden")
				}
			>
				출력 미리보기 (실제 인쇄되는 화면과 다릅니다.)
			</p>
			{/* 메뉴 관리 */}
			<div
				ref={printRef}
				class={
					"w-full h-full border border-black grid-cols-2 " +
					(checkedPrint ? "grid" : "hidden")
				}
			>
				<OrderBillBlock
					listLoading={listLoading}
					info={info}
					printInfo={printInfo}
					dayArr={dayArr}
					printMenu={printMenu}
				/>
				<OrderBillBlock
					listLoading={listLoading}
					info={info}
					printInfo={printInfo}
					dayArr={dayArr}
					printMenu={printMenu}
				/>
			</div>
		</>
	);
};

export default OrderCheckBlock;
