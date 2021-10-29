import React, { useState, useEffect, useRef } from "react";
import DayView from "routes/manager/Calendar/DayView";
import dayjs from "dayjs";

const WeekView = ({ firstOfWeek, focusDate, orderInfo, setFocusDate }) => {
	const [dayOfWeek, setDayOfWeek] = useState([]);
	useEffect(() => {
		const cp = [];
		for (let i = 0; i < 7; i++) {
			let target = firstOfWeek.add(i * 1, "day");
			cp.push(target);
		}
		setDayOfWeek(cp);
	}, [firstOfWeek]);

	return (
		<div class="grid grid-cols-7 border-b-2 border-gray-200">
			{dayOfWeek.length > 0 &&
				dayOfWeek.map((element, index) => {
					return (
						<DayView
							key={index}
							orderInfo={orderInfo}
							currentDate={element}
							focusDate={focusDate}
							setFocusDate={setFocusDate}
						/>
					);
				})}
		</div>
	);
};

export default WeekView;
