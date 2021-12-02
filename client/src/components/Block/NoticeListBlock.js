import Description from "components/Description";
import ImageLabel from "components/ImageLabel";
import Subtitle from "components/Subtitle";
import CateringIntro from "image/catering-intro.png";
import React, { useEffect, useState } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
// import NoticeList from "routes/community/data/noticeList";
import NoticeBlock from "components/Block/NoticeBlock";
import { Route, Link, useHistory } from "react-router-dom";

import Paging from "components/Paging";
import NoticeDetailBlock from "components/Block/NoticeDetailBlock";
import axios from "axios";

const NoticeListBlock = ({ noticeList }) => {
	const history = useHistory();

	return (
		<div class="flex flex-col w-full h-full">
			<div class="text-base md:text-lg h-14 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center">
				<div class="flex-1">제목</div>
				<div class="w-12 md:w-24">날짜</div>
				<div class="w-12 md:w-24 text-right md:text-center">조회</div>
			</div>
			{noticeList.map((element, index) => {
				return <NoticeBlock notice={element} key={element} />;
			})}
		</div>
	);
};

export default NoticeListBlock;
