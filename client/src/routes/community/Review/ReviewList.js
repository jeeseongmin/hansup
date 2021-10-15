import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import ReviewListBlock from "components/Block/ReviewListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ReviewList = () => {
	return (
		<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
			<div class="w-full flex flex-row justify-between items-center mb-8">
				<div class="inline-flex w-full mb-6">
					<Subtitle subtitle={"리뷰"} />
				</div>
				<Link
					to="/community/review/create"
					class="w-32 text-hansupBrown text-lg flex flex-row justify-end items-center"
				>
					<p class="mr-2">작성하기</p> <VscArrowRight size={24} />
				</Link>
			</div>
			<ReviewListBlock />
		</div>
	);
};

export default ReviewList;
