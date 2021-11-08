import React, { useEffect, useState } from "react";

const DayView = ({ currentDate, focusDate, orderInfo, setFocusDate }) => {
	const [total, setTotal] = useState(0);
	const [dayOrder, setDayOrder] = useState([]);
	const [undecided, setUndecided] = useState([]);
	const [undecidedTotal, setUndecidedTotal] = useState(0);

	const getDayOrder = async () => {
		let cp = await orderInfo.filter(function (element, index) {
			return (
				element.payed &&
				String(currentDate.get("year")) ===
					String(Number(element.date.substr(0, 4))) &&
				String(currentDate.get("month") + 1) ===
					String(Number(element.date.substr(5, 2))) &&
				String(currentDate.get("date")) ===
					String(Number(element.date.substr(8, 2)))
			);
		});
		if (cp.length > 0) {
			let num = cp.reduce((prev, next) => {
				return prev + next.count;
			}, 0);
			setTotal(num);
		}
		setDayOrder(cp);
	};

	const getUndecided = async () => {
		let cp = await orderInfo.filter(function (element, index) {
			return (
				!element.payed &&
				String(currentDate.get("year")) ===
					String(Number(element.date.substr(0, 4))) &&
				String(currentDate.get("month") + 1) ===
					String(Number(element.date.substr(5, 2))) &&
				String(currentDate.get("date")) ===
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
		getDayOrder();
		getUndecided();
	}, [orderInfo]);

	return (
		<div
			onClick={() => setFocusDate(currentDate)}
			class={
				"py-3 h-32 flex flex-col transition delay-50 duration-150 justify-between items-center hover:bg-yellow-100 cursor-pointer " +
				(currentDate.format("DD/MM/YYYY") === focusDate.format("DD/MM/YYYY")
					? "bg-yellow-100"
					: "")
			}
		>
			<div
				class={
					"text-xl font-bold " +
					(currentDate.get("month") === focusDate.get("month")
						? "text-hansupBrown"
						: "text-gray-300")
				}
			>
				{currentDate.get("date")}
			</div>
			{undecided.length > 0 && (
				<div class="w-full h-8 px-0 md:px-2 flex justify-center items-center">
					<div class="w-4 md:w-full h-4 md:h-full text-md lg:text-lg rounded-full md:rounded-md border border-gray-300 lg:border-gray-200 flex justify-center items-center bg-gray-300 lg:bg-gray-200 md:bg-gray-200 text-hansupBrown">
						<p class="hidden md:block">미확정 {undecided.length}건 </p>
					</div>
				</div>
			)}
			{dayOrder.length > 0 && (
				<div class="w-full h-8 px-0 md:px-2 flex justify-center items-center">
					<div class="w-4 md:w-full h-4 md:h-full text-md lg:text-lg rounded-full md:rounded-md flex justify-center items-center bg-red-200 md:bg-red-200 text-hansupBrown">
						<p class="hidden md:block">
							{dayOrder.length}건{" "}
							<span class="hidden lg:inline-block">/ 총 {total}인</span>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DayView;
