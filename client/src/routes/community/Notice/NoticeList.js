import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import NoticeListBlock from "components/Block/NoticeListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Paging from "components/Paging";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const NoticeList = () => {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [noticeList, setNoticeList] = useState([]);

	useEffect(() => {
		axios
			.post(
				"/api/notice/page/" + page,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				setNoticeList(Response.data);
			})
			.catch((Error) => {
				console.log(Error);
			});
	}, [page]);

	useEffect(() => {
		axios
			.post(
				"/api/notice",
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				setTotalPage(Math.ceil(Response.data.length / 10));
				setLoading(true);
			})
			.catch((Error) => {
				console.log(Error);
			});
	}, [noticeList]);

	return (
		<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
			<div class="w-full flex flex-row justify-between items-center mb-4">
				<div class="inline-flex w-full mb-6">
					<Subtitle subtitle={"공지사항"} />
				</div>
				<Link
					to="/community/notice/create"
					class="w-32 text-hansupBrown text-lg flex flex-row justify-end items-center"
				>
					<p class="mr-2">작성하기</p> <VscArrowRight size={24} />
				</Link>
			</div>
			{loading ? (
				noticeList.length === 0 ? (
					<div class="w-full h-24 flex justify-center items-center">
						<p>리뷰가 없습니다.</p>
					</div>
				) : (
					<NoticeListBlock noticeList={noticeList} />
				)
			) : (
				<div class="w-full h-24 flex justify-center items-center">
					<CircularProgress />
				</div>
			)}

			<div class="w-full mt-8">
				<Paging setPage={setPage} page={page} total={totalPage} />
			</div>
		</div>
		// <ContentLayout subtitle={"공지사항"}>
		// 	<div class="flex flex-row">
		// 		<NoticeListBlock />
		// 	</div>
		// </ContentLayout>
	);
};

export default NoticeList;
