import Description from "components/Description";
import ImageLabel from "components/ImageLabel";
import Subtitle from "components/Subtitle";
import CateringIntro from "image/catering-intro.png";
import React, { useEffect, useState } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
// import NoticeList from "routes/community/data/noticeList";
import NoticeBlock from "components/Block/NoticeBlock";
import Paging from "components/Paging";
import NoticeDetailBlock from "components/Block/NoticeDetailBlock";

const NoticeListBlock = ({ noticeList }) => {
	return (
		<div class="flex flex-col w-full h-full">
			<div class="h-14 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center">
				<div class="flex-1">제목</div>
				<div class="w-36">날짜</div>
			</div>
			{noticeList.map((element, index) => {
				return <NoticeBlock notice={element} key={element} />;
			})}
		</div>
	);
};

export default NoticeListBlock;
