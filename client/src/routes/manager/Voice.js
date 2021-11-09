import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import VoiceListBlock from "components/Block/VoiceListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Paging from "components/Paging";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Voice = () => {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [voiceList, setVoiceList] = useState([]);
	useEffect(() => {
		axios
			.post(
				"/api/voice/page/" + page,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				setVoiceList(Response.data);
			})
			.catch((Error) => {
				console.log(Error);
			});
	}, [page]);

	useEffect(() => {
		axios
			.post(
				"/api/voice",
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
	}, [voiceList]);
	return (
		<PageLayout>
			<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
				<div class="w-full flex flex-row justify-between items-center mb-4">
					<div class="inline-flex w-full mb-6">
						<Subtitle subtitle={"고객의 소리"} />
					</div>
					{/* <Link
						to="/community/voice/create"
						class="w-32 text-hansupBrown text-lg flex flex-row justify-end items-center"
					>
						<p class="mr-2">작성하기</p> <VscArrowRight size={24} />
					</Link> */}
				</div>
				{loading ? (
					voiceList.length === 0 ? (
						<div class="w-full h-24 flex justify-center items-center">
							<p>리뷰가 없습니다.</p>
						</div>
					) : (
						<VoiceListBlock voiceList={voiceList} />
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
		</PageLayout>
	);
};

export default Voice;
