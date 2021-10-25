import React, { useState, useEffect, useRef } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MonthView from "routes/manager/Calendar/MonthView";
import dayjs from "dayjs";

const Schedule = () => {
	const [focusDate, setFocusDate] = useState(dayjs());
	useEffect(() => {
		console.log(focusDate.date(1).day(0));
	}, []);
	return (
		<PageLayout>
			<ContentLayout subtitle={"예약확인"}>
				<div class="flex flex-col">
					<MonthView />
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Schedule;
