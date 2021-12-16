import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import dayjs from "dayjs";
import WeekView from "routes/manager/Calendar/WeekView";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const MonthView = ({
	focusDate,
	setFocusDate,
	orderInfo,
	setOrderInfo,
	loading,
	setLoading,
	month,
	setMonth,
}) => {
	// const [focusDate, setFocusDate] = useState(dayjs());

	const [firstOfWeek, setFirstOfWeek] = useState([]);
	const style = { color: "#6C4D3F" };

	useEffect(() => {
		if (month !== focusDate.get("month")) setMonth(focusDate.get("month"));
	}, [focusDate]);

	useEffect(() => {
		const startDay = focusDate.date(1).day(0).startOf("day");
		const endDay = focusDate.endOf("month").day(0).startOf("day");
		const cp = [];
		for (let i = 0; i < 7; i++) {
			let current = startDay.add(i * 7, "day");
			cp.push(current);
			if (current.format("DD/MM/YYYY") === endDay.format("DD/MM/YYYY")) break;
		}
		setFirstOfWeek(cp);
	}, [focusDate]);

	const changeMonth = (isNext) => {
		const cp = isNext
			? focusDate.add(1, "month")
			: focusDate.subtract(1, "month");
		setFocusDate(cp);
	};

	return (
		<div class="flex flex-col w-full justify-center items-center">
			<div class="w-full flex justify-center items-center relative">
				<div class="flex flex-row items-center mb-4">
					<div onClick={() => changeMonth(false)} class="cursor-pointer">
						<IoIosArrowBack style={style} size={28} />
					</div>
					<div class="text-hansupBrown text-2xl font-bold mx-8">
						{focusDate.year()}년 {focusDate.month() + 1}월
					</div>
					<div onClick={() => changeMonth(true)} class="cursor-pointer">
						<IoIosArrowForward style={style} size={28} />
					</div>
				</div>
				<div
					onClick={() => setFocusDate(dayjs())}
					class="rounded-full py-1 border border-hansupBrown px-4 text-hansupBrown hover:text-white bg-white hover:bg-hansupBrown transition delay-50 duration-300 absolute flex items-center font-bold top-0 right-0 cursor-pointer "
				>
					today
				</div>
			</div>
			<div class="w-full flex flex-col">
				<div class="grid grid-cols-7 border-t-2 border-b-2 border-hansupBrown py-3">
					<div class="text-center text-hansupBrown font-bold">일</div>
					<div class="text-center text-hansupBrown font-bold">월</div>
					<div class="text-center text-hansupBrown font-bold">화</div>
					<div class="text-center text-hansupBrown font-bold">수</div>
					<div class="text-center text-hansupBrown font-bold">목</div>
					<div class="text-center text-hansupBrown font-bold">금</div>
					<div class="text-center text-hansupBrown font-bold">토</div>
				</div>
				{firstOfWeek.length > 0 &&
					loading &&
					firstOfWeek.map((element, index) => {
						return (
							<WeekView
								key={index}
								firstOfWeek={element}
								focusDate={focusDate}
								orderInfo={orderInfo}
								setFocusDate={setFocusDate}
							/>
						);
					})}
				{loading ? (
					""
				) : (
					<div class="w-full h-96 flex justify-center items-center">
						<CircularProgress style={style} />
					</div>
				)}
			</div>
		</div>
	);
};

export default MonthView;
