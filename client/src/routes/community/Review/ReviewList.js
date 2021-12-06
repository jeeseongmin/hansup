import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import ReviewListBlock from "components/Block/ReviewListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Paging from "components/Paging";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const ReviewList = () => {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [reviewList, setReviewList] = useState([]);

	useEffect(() => {
		axios
			.post(
				"/api/review/page/" + page,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				// console.log(Response);
				setReviewList(Response.data);
			})
			.catch((Error) => {
				console.log(Error);
			});
	}, [page]);

	useEffect(() => {
		axios
			.post(
				"/api/review",
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				setTotalPage(Math.ceil(Response.data.length / 6));
				setLoading(true);
			})
			.catch((Error) => {
				console.log(Error);
			});
	}, [reviewList]);

	return (
		<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
			<div class="w-full flex flex-row justify-between items-center mb-8">
				<div class="inline-flex w-auto ">
					<Subtitle subtitle={"리뷰"} />
				</div>
				<Link
					to="/community/review/create"
					class="text-md md:text-lg w-auto text-hansupBrown flex flex-row justify-end items-center"
				>
					<p class="mr-2">작성하기</p> <VscArrowRight size={24} />
				</Link>
			</div>
			{loading ? (
				reviewList.length === 0 ? (
					<div class="w-full h-24 flex justify-center items-center">
						<p>리뷰가 없습니다.</p>
					</div>
				) : (
					<ReviewListBlock
						reviewList={reviewList}
						setReviewList={setReviewList}
					/>
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
	);
};

export default ReviewList;
