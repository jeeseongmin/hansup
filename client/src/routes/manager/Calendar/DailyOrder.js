import React, { useState, useEffect, useRef } from "react";
import OrderBox from "components/Box/OrderBox";
import MenuCountBox from "components/Box/MenuCountBox";
import Modal from "@mui/material/Modal";

const DailyOrder = ({
	focusDate,
	orderInfo,
	setFocusDate,
	toggleChange,
	menuList,
	allMenuList,
}) => {
	const [loading, setLoading] = useState(false);
	const [dayOrderList, setDayOrderList] = useState([]);
	const [total, setTotal] = useState(0);
	const [undecided, setUndecided] = useState([]);
	const [undecidedTotal, setUndecidedTotal] = useState(0);

	const getDailyOrder = async () => {
		setLoading(false);
		let cp = await orderInfo.filter(function (element, index) {
			return (
				element.payed &&
				String(focusDate.get("year")) ===
					String(Number(element.date.substr(0, 4))) &&
				String(focusDate.get("month") + 1) ===
					String(Number(element.date.substr(5, 2))) &&
				String(focusDate.get("date")) ===
					String(Number(element.date.substr(8, 2)))
			);
		});
		if (cp.length > 0) {
			let num = cp.reduce((prev, next) => {
				return prev + next.count;
			}, 0);
			setTotal(num);
		} else setTotal(0);
		setDayOrderList(cp);
		setLoading(true);
	};

	const getUndecided = async () => {
		let cp = await orderInfo.filter(function (element, index) {
			return (
				!element.payed &&
				String(focusDate.get("year")) ===
					String(Number(element.date.substr(0, 4))) &&
				String(focusDate.get("month") + 1) ===
					String(Number(element.date.substr(5, 2))) &&
				String(focusDate.get("date")) ===
					String(Number(element.date.substr(8, 2)))
			);
		});
		if (cp.length > 0) {
			let num = cp.reduce((prev, next) => {
				return prev + next.count;
			}, 0);
			setUndecidedTotal(num);
		}
		setUndecided(cp);
	};

	useEffect(() => {
		getDailyOrder();
		getUndecided();
	}, [focusDate, orderInfo]);

	return (
		<div class="w-full h-full shadow-lg border border-gray-200 px-8 flex flex-col">
			<div class="h-16 flex flex-row justify-center items-center relative border-b border-hansupBrown mb-8">
				<p class="text-hansupBrown text-2xl font-bold black">
					{focusDate.format("YYYY년 MM월 DD일")}
				</p>
			</div>
			{dayOrderList.length === 0 && undecided.length === 0 ? (
				<div class="h-24 flex flex-col justify-center items-center mb-8">
					<p class="font-bold text-xl text-hansupBrown">
						예약 내역이 없습니다.
					</p>
				</div>
			) : (
				<>
					{
						<div class="flex flex-col mb-8 border-b-2 border-gray-200 pb-8">
							<div class="mb-8 flex flex-row justify-start items-center w-full h-full">
								<p class="w-48 h-full text-2xl font-bold">미확정 예약 내역</p>
								<div class="h-full text-hansupBrown hover:text-white bg-white flex justify-center items-center">
									<div class="w-full h-full flex justify-center items-center">
										<div class="px-4 w-full h-full text-lg rounded-md flex justify-center items-center bg-gray-200 text-hansupBrown">
											{undecided.length}건 / 총 {undecidedTotal}인
										</div>
									</div>
								</div>
							</div>
							{undecided.length !== 0 && (
								<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									{loading &&
										undecided.map((element, index) => {
											return (
												<OrderBox
													key={index}
													dayOrder={element}
													toggleChange={toggleChange}
												/>
											);
										})}
								</div>
							)}
							{undecided.length === 0 && (
								<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									<p>미확정된 예약이 존재하지 않습니다.</p>
								</div>
							)}
						</div>
					}
					<div class="flex flex-col mb-8 border-b-2 border-gray-200 pb-8">
						<div class="mb-8 flex flex-row justify-start items-center w-full h-full">
							<p class="w-48 h-full text-2xl font-bold">확정 예약 내역</p>
							<div class="h-full text-hansupBrown hover:text-white bg-white flex justify-center items-center ">
								<div class="w-full h-full flex justify-center items-center">
									<div class="px-4 w-full h-full text-lg rounded-md flex justify-center items-center bg-red-200 text-hansupBrown">
										{dayOrderList.length}건 / 총 {total}인
									</div>
								</div>
							</div>
						</div>
						{dayOrderList.length !== 0 && (
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{loading &&
									dayOrderList.map((element, index) => {
										return (
											<OrderBox
												key={index}
												dayOrder={element}
												toggleChange={toggleChange}
											/>
										);
									})}
							</div>
						)}
						{dayOrderList.length === 0 && (
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								<p>확정된 예약이 존재하지 않습니다.</p>
							</div>
						)}
					</div>
					<div class="flex flex-col mb-8">
						<p class="text-2xl font-bold mb-8">확정 예약 총계</p>
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
							<MenuCountBox
								key={0}
								type={"mainMenu"}
								dayOrderList={dayOrderList}
								menuList={menuList}
								allMenuList={allMenuList}
							/>
							<MenuCountBox
								key={1}
								type={"subMenu"}
								dayOrderList={dayOrderList}
								menuList={menuList}
								allMenuList={allMenuList}
							/>
							<MenuCountBox
								key={2}
								type={"soup"}
								dayOrderList={dayOrderList}
								menuList={menuList}
								allMenuList={allMenuList}
							/>
							<MenuCountBox
								key={3}
								type={"dessert"}
								dayOrderList={dayOrderList}
								menuList={menuList}
								allMenuList={allMenuList}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default DailyOrder;
