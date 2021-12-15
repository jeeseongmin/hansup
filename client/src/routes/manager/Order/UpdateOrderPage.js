import Modal from "@mui/material/Modal";
import InfoBlock from "components/Block/InfoBlock";
import PopupPostCodeBlock from "components/Block/PopupPostCodeBlock";
import Switch from "@mui/material/Switch";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import Subtitle from "components/Subtitle";
import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { setRefreshOrder } from "reducers/common";
import dayjs from "dayjs";
import InputBox from "components/Box/InputBox";
import PageLayout from "components/Layout/PageLayout";
import OrderListLayout from "components/Layout/OrderListLayout";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioButton from "components/Button/RadioButton";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const UpdateOrderPage = ({ match }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [orderList, setOrderList] = useState([]);
	const modalMenuRef = useRef();
	const [change, setChange] = useState(false);
	const refresh_order = useSelector((state) => state.common.refresh_order);
	const [info, setInfo] = useState({
		name: "",
		phone1: "",
		phone2: "",
		phone3: "",
		check1: "",
		check2: "",
		check3: "",
		count: "",
		request: "",
		date: new Date(),
		delivery: "",
		address: "",
		mainMenu: [],
		subMenu: [],
		soup: [],
		dessert: [],
		payment: "",
		cashReceipt: {
			status: false,
			type: "personal",
			number: "",
		},
		payed: false,
		isDeleted: false,
	});
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// 메뉴 리스트 불러오기
	const [menuList, setMenuList] = useState([]);
	const [allMenuList, setAllMenuList] = useState([]);
	const [listLoading, setListLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		document.getElementById("scrollRef").scrollTo(0, 0);
	}, []);

	const typeList = [
		{ title: "메인메뉴(확정 4) + 자율 메뉴(추후 공지)", type: "mainMenu" },
		{ title: "식사메뉴(확정)", type: "subMenu" },
		{ title: "국 (택 1)", type: "soup" },
		{ title: "디저트(확정)", type: "dessert" },
	];

	const getInfo = async () => {
		await axios
			.post(
				"/api/order/" + match.params.id,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then(async (Response) => {
				const cp = {
					id: Response.data._id,
					name: Response.data.name,
					phone1: Response.data.phone.slice(0, 3),
					phone2: Response.data.phone.slice(4, 8),
					phone3: Response.data.phone.slice(9, 13),
					check1: Response.data.phone.slice(0, 3),
					check2: Response.data.phone.slice(4, 8),
					check3: Response.data.phone.slice(9, 13),
					count: Response.data.count,
					request: Response.data.request,
					date: new Date(Response.data.date),
					delivery: Response.data.delivery,
					address: Response.data.address,
					mainMenu: Response.data.mainMenu,
					subMenu: Response.data.subMenu,
					soup: Response.data.soup,
					dessert: Response.data.dessert,
					payment: Response.data.payment,
					cashReceipt: Response.data.cashReceipt,
					payed: Response.data.payed,
					isDeleted: Response.data.isDeleted,
				};
				setInfo(cp);

				setListLoading(false);
				await axios
					.post(
						"/api/menu/search/catering",
						{ key: process.env.REACT_APP_API_KEY },
						{
							headers: {
								"Content-type": "application/json",
								Accept: "application/json",
							},
						}
					)
					.then(async (Response2) => {
						const tmpList = [];
						for (let one of typeList) {
							const cp = Response2.data.filter(function (element, index) {
								return element.type === one.type;
							});
							tmpList.push({
								title: one.title,
								type: one.type,
								menu: [...cp],
							});
						}
						let cp2 = {};
						for (let i = 0; i < Response2.data.length; i++) {
							cp2[Response2.data[i]._id] = Response2.data[i];
						}
						setAllMenuList(cp2);
						setMenuList(tmpList);
						const cp = {
							mainMenu: [...tmpList[0].menu].map((element, index) => {
								return element._id;
							}),
							subMenu: [...tmpList[1].menu].map((element, index) => {
								return element._id;
							}),
							soup: [...Response.data.soup],
							dessert: [...tmpList[3].menu].map((element, index) => {
								return element._id;
							}),
						};
						setMenu(cp);
						setLoading(true);
						setListLoading(true);
					})
					.catch((Error) => {
						console.log(Error);
					});
			})
			.catch((Error) => {
				console.log(Error);
			});
	};

	useEffect(() => {
		getInfo();
		// getList();
	}, []);

	// for update order

	const nameRef = useRef();
	const phone1Ref = useRef();
	const phone2Ref = useRef();
	const phone3Ref = useRef();
	const check1Ref = useRef();
	const check2Ref = useRef();
	const check3Ref = useRef();
	const countRef = useRef();
	const requestRef = useRef();
	const addressRef = useRef();
	const [menu, setMenu] = useState({});
	const [selected, setSelected] = useState(false);
	const [selected2, setSelected2] = useState(false);

	const handleChange = (e) => {
		const cp = { ...info };
		cp["payment"] = e.target.value;
		setInfo(cp);
	};
	const onChangeNumber = (e) => {
		const cp = { ...info };
		cp["cashReceipt"].number = e.target.value;
		setInfo(cp);
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

	const updateOrder = async () => {
		if (info.name === "") {
			alert("이름을 입력해주세요.");
			nameRef.current.focus();
		} else if (info.phone1 === "") {
			alert("핸드폰 번호를 입력해주세요.");
			phone1Ref.current.focus();
		} else if (info.phone2 === "") {
			alert("핸드폰 번호를 입력해주세요.");
			phone2Ref.current.focus();
		} else if (info.phone3 === "") {
			alert("핸드폰 번호를 입력해주세요.");
			phone3Ref.current.focus();
		} else if (info.check1 === "") {
			alert("핸드폰 번호 확인란을 입력해주세요.");
			check1Ref.current.focus();
		} else if (info.check2 === "") {
			alert("핸드폰 번호 확인란을 입력해주세요.");
			check2Ref.current.focus();
		} else if (info.check3 === "") {
			alert("핸드폰 번호 확인란을 입력해주세요.");
			check3Ref.current.focus();
		} else if (
			info.phone1 !== info.check1 ||
			info.phone2 !== info.check2 ||
			info.phone3 !== info.check3
		) {
			alert("핸드폰 번호와 확인란을 확인해주세요.");
			phone1Ref.current.focus();
		} else if (info.count === "" || info.current === 0) {
			alert("인원수를 입력해주세요.");
			countRef.current.focus();
		} else if (info.delivery === "delivery" && info.address === "") {
			alert("도로명 주소를 입력해주세요.");
			addressRef.current.click();
		} else if (false && menu["mainMenu"].length !== 4) {
			alert("메인 메뉴를 4개 선택해주세요.");
		} else if (false && menu["subMenu"].length !== 4) {
			alert("식사 메뉴를 4개 선택해주세요.");
		} else if (menu["soup"].length !== 1) {
			alert("국 메뉴를 1개 선택해주세요.");
		} else if (false && menu["dessert"].length !== 5) {
			alert("디저트 메뉴를 5개 선택해주세요.");
		} else {
			const cp = { ...info };
			cp["mainMenu"] = [...menu["mainMenu"]];
			cp["subMenu"] = [...menu["subMenu"]];
			cp["soup"] = [...menu["soup"]];
			cp["dessert"] = [...menu["dessert"]];
			setInfo(cp);
			document.getElementById("scrollRef").scrollTo(0, 0);
			await axios
				.post(
					"/api/order/update/" + info.id,
					{
						key: process.env.REACT_APP_API_KEY,
						name: info.name,
						phone: info.phone1 + "-" + info.phone2 + "-" + info.phone3,
						count: info.count,
						request: info.request,
						date: info.date,
						delivery: info.delivery,
						address: info.address,
						mainMenu: menu.mainMenu,
						subMenu: menu.subMenu,
						soup: menu.soup,
						dessert: info.dessert,
						payment: info.payment,
						cashReceipt: info.cashReceipt,
						payed: info.payed,
						isDeleted: info.isDeleted,
					},
					{
						headers: {
							"content-type": "application/json",
							Accept: "application/json",
						},
					}
				)
				.then((response) => {
					alert("수정되었습니다.");
					document.getElementById("scrollRef").scrollTo(0, 0);
					if (refresh_order === "create") {
						dispatch(setRefreshOrder("recreate"));
					} else dispatch(setRefreshOrder("create"));
					history.push("/manager/order/list/all");
				})
				.catch((response) => {
					console.log("Error!");
				});
		}
	};

	const dateToString = (date) => {
		if (loading && date) {
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
		<>
			<PageLayout>
				<div class={"w-full flex flex-col mb-16 lg:mb-24"}>
					<div class="w-full flex flex-col justify-between items-start mb-4  px-8 xl:px-40 ">
						<div class="inline-flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-6 pb-6 border-b-2 border-hansupBrown">
							<Subtitle subtitle={"예약 수정하기"} />
						</div>
					</div>
					<div class="w-full flex flex-col justify-center items-center select-none  px-8 xl:px-40 ">
						<div class="w-full md:w-2/3 lg:w-1/2">
							<InfoBlock title={"예약자 정보"}>
								<div class="px-4 flex flex-col">
									<div class="h-12 mb-4 flex flex-row justify-between items-center">
										<div class="w-1/4 text-xl">이름</div>
										<div class="flex-1 h-full">
											<InputBox
												value={info.name}
												refName={nameRef}
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
												refName={phone1Ref}
												type="phone1"
												placeholder="010"
												onChange={changeInfo}
											/>
											<InputBox
												value={info.phone2}
												refName={phone2Ref}
												type="phone2"
												placeholder=""
												onChange={changeInfo}
											/>
											<InputBox
												value={info.phone3}
												refName={phone3Ref}
												type="phone3"
												placeholder=""
												onChange={changeInfo}
											/>
										</div>
									</div>
									<div class="h-12 mb-4 flex flex-row justify-between items-center">
										<div class="w-1/4 text-xl">연락처 확인</div>
										<div class="flex-1 h-full grid grid-cols-3 gap-2">
											<InputBox
												value={info.check1}
												refName={check1Ref}
												type="check1"
												placeholder="010"
												onChange={changeInfo}
											/>
											<InputBox
												value={info.check2}
												refName={check2Ref}
												type="check2"
												placeholder=""
												onChange={changeInfo}
											/>
											<InputBox
												value={info.check3}
												refName={check3Ref}
												type="check3"
												placeholder=""
												onChange={changeInfo}
											/>
										</div>
									</div>
									<div class="h-12 mb-4 flex flex-row justify-between items-center">
										<div class="w-1/4 text-xl">인원수</div>
										<div class="flex-1 h-full">
											<InputBox
												value={info.count}
												refName={countRef}
												type="count"
												placeholder="ex) 10 (최소 10인분)"
												onChange={changeInfo}
											/>
										</div>
									</div>
									<div class="h-12 mb-4 flex flex-row justify-between items-center">
										<div class="w-1/4 text-xl">요청사항</div>
										<div class="flex-1 h-full">
											<InputBox
												value={info.request}
												refName={requestRef}
												type="request"
												placeholder="최대 50자까지 입력 가능"
												onChange={changeInfo}
											/>
										</div>
									</div>
								</div>
							</InfoBlock>
							<InfoBlock title={"예약 일정 정보"}>
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
									<div
										class={
											"h-12 flex flex-row justify-between items-center " +
											(info.delivery === "self" ? "mb-8" : "mb-4")
										}
									>
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
									<div
										class={
											"h-28 mb-8 flex-row justify-between items-start " +
											(info.delivery === "self" ? "hidden" : "flex")
										}
									>
										<div class="w-1/4 text-xl h-full grid grid-rows-2 gap-2 ">
											<p class="w-full h-full flex items-center">배달장소</p>
											<p></p>
										</div>

										<div class="flex-1 h-full grid grid-rows-2 gap-2">
											<InputBox
												value={info.address}
												refName={addressRef}
												type="address"
												placeholder="주소를 입력해주세요."
												onChange={changeInfo}
											/>
										</div>
									</div>
								</div>
							</InfoBlock>
							<InfoBlock title={"결제"}>
								<div class="flex flex-col ">
									<div class="flex flex-col mb-4">
										{/* <p class="text-lg mb-4">결제수단</p> */}
										<FormControl sx={{ m: 1, minWidth: 80 }}>
											<InputLabel id="demo-simple-select-autowidth-label">
												결제수단
											</InputLabel>

											<Select
												value={info.payment}
												label="결제 수단"
												onChange={handleChange}
											>
												<MenuItem value={"card"}>후불 결제 (카드)</MenuItem>
												<MenuItem value={"cash"}>후불 결제 (현금)</MenuItem>
												<MenuItem value={"transfer"}>계좌이체</MenuItem>
											</Select>
										</FormControl>

										{/* <input
								type="text"
								placeholder="ex) 신용카드, 현금, 계좌이체"
								value={info.payment}
								onChange={(e) => changeInfo(e, "payment")}
								class="px-4 text-lg border-2 border-gray-300 outline-none w-full h-12 flex justify-center items-center"
							/> */}
									</div>
									{info.payment !== "card" && (
										<div
											class={
												"flex py-4 flex-row justify-between items-center " +
												(selected ? "border-b-2 border-gray-200" : "mb-12")
											}
										>
											<p class="text-lg h-full flex justify-center items-center ">
												현금영수증
											</p>
											<div class="h-full flex flex-row items-center">
												<div class="mr-3">
													<RadioButton
														text={"미신청"}
														setSelected={setSelected}
														current={selected}
														clicked={false}
													/>
												</div>
												<div>
													<RadioButton
														text={"신청"}
														setSelected={setSelected}
														current={selected}
														clicked={true}
													/>
												</div>
											</div>
										</div>
									)}
									{info.payment !== "card" && (
										<div
											class={
												"py-4 w-full h-full mb-12 flex flex-col transition delay-100 duration-200  " +
												(selected ? "block" : "hidden")
											}
										>
											{/* 
								selected2가 false이면 개인소득공제용 
								selected2가 true이면 사업자증빙용
							*/}
											<div class="flex flex-col h-auto mb-4">
												<div class="w-full h-8">
													<RadioButton
														text={"개인소득공제용"}
														setSelected={setSelected2}
														current={selected2}
														clicked={false}
													/>
												</div>
											</div>
											<div class="flex flex-col mb-4">
												<div class="w-fuill h-8">
													<RadioButton
														text={"사업자증빙용"}
														setSelected={setSelected2}
														current={selected2}
														clicked={true}
													/>
												</div>
											</div>
											<div class="h-12 my-2">
												<InputBox
													value={info.cashReceipt["number"]}
													placeholder={
														!selected2 ? "휴대폰 번호" : "사업자등록번호"
													}
													type=""
													onChange={onChangeNumber}
												/>
											</div>
										</div>
									)}
								</div>
							</InfoBlock>
						</div>
					</div>
					<div class="w-full mb-8 px-8 md:px-16">
						<div class="w-full flex flex-col text-center justify-center text-lg text-hansupBrown  pb-4 mb-4">
							<p>
								한숲의 메뉴는 메인 메뉴, 식사 메뉴, 국, 디저트로
								구성되어있습니다.
							</p>
							<p>
								메인 메뉴는 고정 메뉴 3가지와 자율 메뉴 1가지로 구성됩니다. 자율
								메뉴는 추후 공지드릴 예정입니다.{" "}
							</p>
							<p>식사 메뉴는 고정 메뉴 4가지로 구성됩니다.</p>
							<p class="text-red-500">
								국은 원하시는 종류의 국을 하나 선택해주셔야 합니다.
							</p>
						</div>
						{loading &&
							listLoading &&
							menuList.map((element, index) => {
								return (
									<OrderListLayout
										key={element}
										info={element}
										col={5}
										type={"select"}
										setMenu={setMenu}
										menuList={menu}
									/>
								);
							})}{" "}
					</div>
					<div class="w-full h-12 -mb-8 px-8 md:px-16">
						{/* <SubmitButton text={"결제"} onSubmit={(e) => onSubmit(e)} /> */}
						<div class="w-full h-12 flex flex-row justify-between">
							<div
								// onClick={prevStep}
								class="w-36 md:w-48 cursor-pointer h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
							>
								<BsArrowLeft class="mr-2" /> 취소
							</div>
							<div
								onClick={updateOrder}
								class="w-36 md:w-48 cursor-pointer h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
							>
								저장 <BsArrowRight class="ml-2" />
							</div>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default UpdateOrderPage;
