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
	return (
		<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
			<div class="w-full flex flex-row justify-between items-center mb-8">
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
			<div class="flex flex-row">
				<NoticeListBlock />
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
