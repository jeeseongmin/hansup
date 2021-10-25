import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import axios from "axios";

const DayView = ({ currentDate, focusDate, orderInfo }) => {
	const [total, setTotal] = useState();
	const [dayOrder, setDayOrder] = useState([]);

	const getDayOrder = async () => {
		let cp = await orderInfo.filter(function (element, index) {
			return (
				String(currentDate.get("year")) === element.date.substr(0, 4) &&
				String(currentDate.get("month") + 1) === element.date.substr(5, 2) &&
				String(currentDate.get("date")) === element.date.substr(8, 2)
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

	useEffect(() => {
		getDayOrder();
	}, [orderInfo]);

	return (
		<div class="h-16 flex flex-col justify-between items-center">
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
			{dayOrder.length > 0 && (
				<div class="w-full h-8 px-0 md:px-2 flex justify-center items-center">
					<div class="w-4 md:w-full h-4 md:h-full text-lg rounded-full md:rounded-md flex justify-center items-center bg-yellow-500 md:bg-homePink text-hansupBrown">
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
