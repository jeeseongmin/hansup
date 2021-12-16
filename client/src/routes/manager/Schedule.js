import axios from "axios";
import PageLayout from "components/Layout/PageLayout";
import Subtitle from "components/Subtitle";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import DailyOrder from "routes/manager/Calendar/DailyOrder";
import MonthView from "routes/manager/Calendar/MonthView";

const Schedule = () => {
	const [focusDate, setFocusDate] = useState(dayjs());
	const [orderInfo, setOrderInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [month, setMonth] = useState(dayjs().get("month"));
	const [change, setChange] = useState(false);
	const toggleChange = () => {
		setChange(!change);
	};

	const getOrderInfo = () => {
		setLoading(false);
		axios
			.post(
				"/api/order/get/date",
				{
					key: process.env.REACT_APP_API_KEY,
					year: focusDate.get("year"),
					month: focusDate.get("month"),
				},
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then(async (Response) => {
				const filtered = Response.data.filter(function (element, index) {
					return !element.isDeleted;
				});
				await setOrderInfo(filtered);
				setLoading(true);
			})
			.catch((Error) => {
				console.log(Error);
			});
	};

	useEffect(() => {
		getOrderInfo();
	}, [month, change]);

	// 메뉴 리스트 불러오기
	const [menuList, setMenuList] = useState([]);
	const [allMenuList, setAllMenuList] = useState([]);
	const [listLoading, setListLoading] = useState(true);

	const typeList = [
		{ title: "메인메뉴 (택 4)", type: "mainMenu" },
		{ title: "식사메뉴 (택 4)", type: "subMenu" },
		{ title: "국 (택 1)", type: "soup" },
		{ title: "디저트 (택 5)", type: "dessert" },
	];

	const getList = () => {
		setListLoading(false);
		axios
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
			.then((Response) => {
				const tmpList = [];
				for (let one of typeList) {
					const cp = Response.data.filter(function (element, index) {
						return element.type === one.type;
					});
					tmpList.push({
						title: one.title,
						type: one.type,
						menu: [...cp],
					});
				}
				let cp2 = {};
				for (let i = 0; i < Response.data.length; i++) {
					cp2[Response.data[i]._id] = Response.data[i];
				}
				// 모든 메뉴에 대한 정보
				setAllMenuList(cp2);
				setMenuList(tmpList);
				setListLoading(true);
			})
			.catch((Error) => {
				console.log(Error);
			});
	};
	useEffect(() => {
		getList();
	}, [change]);

	return (
		<>
			<PageLayout>
				<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40"}>
					<div class="inline-flex w-full mb-6 justify-between items-center">
						<Subtitle subtitle={"케이터링 예약확인"} />
						<div class="h-8 px-3  flex flex-row justify-center items-center">
							<p class="mr-2">확정 :</p>{" "}
							<div class="w-4 h-4 rounded-full bg-red-400 mr-4"></div>
							<p class="mr-2">미확정 :</p>{" "}
							<div class="w-4 h-4 rounded-full bg-gray-300 lg:bg-gray-200"></div>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mb-16">
							<MonthView
								focusDate={focusDate}
								setFocusDate={setFocusDate}
								orderInfo={orderInfo}
								setOrderInfo={setOrderInfo}
								loading={loading}
								setLoading={setLoading}
								month={month}
								setMonth={setMonth}
							/>
						</div>
						<div>
							<DailyOrder
								focusDate={focusDate}
								orderInfo={orderInfo}
								setFocusDate={setFocusDate}
								toggleChange={toggleChange}
								allMenuList={allMenuList}
								menuList={menuList}
							/>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default Schedule;
