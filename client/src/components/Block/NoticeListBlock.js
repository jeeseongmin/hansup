import Description from "components/Description";
import ImageLabel from "components/ImageLabel";
import Subtitle from "components/Subtitle";
import CateringIntro from "image/catering-intro.png";
import React, { useEffect, useState } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import NoticeList from "routes/community/data/noticeList";
import NoticeBlock from "components/Block/NoticeBlock";
import Paging from "components/Paging";
import NoticeDetailBlock from "components/Block/NoticeDetailBlock";

const NoticeListBlock = () => {
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	return (
		<div class="flex flex-col w-full h-full">
			<div class="h-14 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center">
				<div class="flex-1">제목</div>
				<div class="w-36">날짜</div>
			</div>
			{/* {NoticeList.map((element, index) => {
				if (index < 10)
					return <NoticeDetailBlock notice={element} key={element} />;
			})} */}
			{NoticeList.map((element, index) => {
				if (index < 10) return <NoticeBlock notice={element} key={element} />;
			})}
			{/* 
					setPage : 현재 페이지 설정 함수
					page : 현재 페이지
					total : 총 페이지
				 */}

			{/* <Paging setPage={setPage} page={page} total={totalPage} /> */}
			<div class="w-full mt-8">
				<Paging setPage={setPage} page={1} total={10} />
			</div>
		</div>
	);
};

export default NoticeListBlock;
