import React, { useState, useEffect, useRef } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import ReviewListBlock from "components/Block/ReviewListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import CreateVoice from "routes/community/Voice/CreateVoice";
import DefaultButton from "components/Button/DefaultButton";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import DatePicker from "react-datepicker";
import { AiTwotoneCalendar } from "react-icons/ai";
import axios from "axios";

const OrderCheck = () => {
	const [searchInfo, setSearchInfo] = useState({
		name: "",
		date: new Date(),
		phone1: "",
		phone2: "",
		phone3: "",
	});

	const [orderInfo, setOrderInfo] = useState([]);

	const nameRef = useRef();
	const phone1Ref = useRef();
	const phone2Ref = useRef();
	const phone3Ref = useRef();

	const changeInfo = (e, type) => {
		if (type === "date") {
			const cp = { ...searchInfo };
			cp[type] = e;
			setSearchInfo(cp);
		} else {
			const cp = { ...searchInfo };
			cp[type] = e.target.value;
			setSearchInfo(cp);
		}
	};
	const history = useHistory();

	const goPage = (url) => {
		history.push(url);
	};

	const orderCheck = async () => {
		if (searchInfo.name === "") {
			alert("이름을 입력해주세요");
			nameRef.current.focus();
		} else if (searchInfo.phone1 === "") {
			alert("연락처를 입력해주세요.");
			phone1Ref.current.focus();
		} else if (searchInfo.phone2 === "") {
			alert("연락처를 입력해주세요.");
			phone2Ref.current.focus();
		} else if (searchInfo.phone3 === "") {
			alert("연락처를 입력해주세요.");
			phone3Ref.current.focus();
		} else {
			let phoneNumber =
				searchInfo.phone1 + "-" + searchInfo.phone2 + "-" + searchInfo.phone3;
			await axios
				.post(
					"/api/order/search/0",
					{
						key: process.env.REACT_APP_API_KEY,
						name: searchInfo.name,
						phone: phoneNumber,
						year: searchInfo.date.getFullYear(),
						month: searchInfo.date.getMonth(),
						date: searchInfo.date.getDate(),
					},
					{
						headers: {
							"Content-type": "application/json",
							Accept: "application/json",
						},
					}
				)
				.then((Response) => {
					setOrderInfo(Response.data);
					console.log(searchInfo.name, phoneNumber, searchInfo.date);
					console.log(Response);
				})
				.catch((Error) => {
					console.log(phoneNumber);
					console.log(Error);
				});
			// await getOrderInfo();
		}
	};
	const getOrderInfo = async () => {
		let phoneNumber =
			searchInfo.phone1 + "-" + searchInfo.phone2 + "-" + searchInfo.phone3;
		console.log(searchInfo, phoneNumber);
		await axios
			.post(
				"/api/order/search",
				{
					key: process.env.REACT_APP_API_KEY,
					name: searchInfo.name,
					phone: phoneNumber,
					date: searchInfo.date,
				},
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				setOrderInfo(Response.data);
				console.log(searchInfo.name, phoneNumber, searchInfo.date);
				console.log(orderInfo);
			})
			.catch((Error) => {
				console.log(phoneNumber);
				console.log(Error);
			});
	};
	const dateToString = (date) => {
		return (
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1).toString().padStart(2, "0") +
			"-" +
			date.getDate().toString().padStart(2, "0")
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
		<PageLayout>
			<div class="w-full flex flex-col justify-center items-center ">
				<div class="w-full md:w-2/3 lg:w-2/3">
					<ContentLayout subtitle={"예약 내역 확인"}>
						<p class="w-full text-left text-xl mb-4 font-bold text-hansupBrown">
							예약 시 입력하셨던 이름과 연락처, 예약 날짜를 적어주세요.
						</p>
						<InfoBlock title={""}>
							<div class="px-4 flex flex-col mb-4">
								<div class="h-12 mb-4 flex flex-row justify-between items-center">
									<div class="w-1/4 text-xl">이름</div>
									<div class="flex-1 h-full">
										<InputBox
											value={searchInfo.name}
											refName={nameRef}
											type="name"
											placeholder="이름을 입력하세요"
											onChange={changeInfo}
										/>
									</div>
								</div>
								<div class="h-12 flex flex-row justify-between items-center mb-4">
									<div class="w-1/4 text-xl">연락처</div>
									<div class="flex-1 h-full grid grid-cols-3 gap-2">
										<InputBox
											value={searchInfo.phone1}
											refName={phone1Ref}
											type="phone1"
											placeholder="010"
											onChange={changeInfo}
										/>
										<InputBox
											value={searchInfo.phone2}
											refName={phone2Ref}
											type="phone2"
											placeholder=""
											onChange={changeInfo}
										/>
										<InputBox
											value={searchInfo.phone3}
											refName={phone3Ref}
											type="phone3"
											placeholder=""
											onChange={changeInfo}
										/>
									</div>
								</div>
								<div class="h-12 flex flex-row justify-between items-center">
									<div class="w-1/4 text-xl">예약 날짜</div>
									<div class="flex-1 h-full flex justify-between items-center">
										<div class="flex-1 h-12 px-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 flex items-center">
											{dateToString(searchInfo.date)}
										</div>
										<div class="w-12">
											<DatePicker
												selected={searchInfo.date}
												onChange={(date) => changeInfo(date, "date")}
												customInput={<DateInput />}
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="px-4 pt-4 flex flex-col md:flex-row justify-between border-t border-hansupBrown">
								<div class="w-full md:w-48 lg:w-60 h-12 mb-4 md:mb-0">
									<div
										onClick={() => goPage("/order/catering/orderMain")}
										class="cursor-pointer w-full h-full flex justify-center items-center outline-none transtion delay-50 duration-300 bg-hansupBrown hover:bg-white text-white hover:text-hansupBrown border hover:border-hansupBrown font-bold text-xl"
									>
										뒤로가기
									</div>
								</div>
								<div class="w-full md:w-48 lg:w-60 h-12">
									<div
										onClick={orderCheck}
										class="cursor-pointer w-full h-full flex justify-center items-center outline-none transtion delay-50 duration-300 bg-hansupBrown hover:bg-white text-white hover:text-hansupBrown border hover:border-hansupBrown font-bold text-xl"
									>
										확인하기
									</div>
								</div>
							</div>
						</InfoBlock>
					</ContentLayout>
				</div>
			</div>
		</PageLayout>
	);
};

export default OrderCheck;
