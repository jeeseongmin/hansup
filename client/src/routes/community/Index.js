import React from "react";
import { Route } from "react-router-dom";
import Notice from "routes/community/Notice/Index";
import Review from "routes/community/Review/Index";
import Voice from "routes/community/Voice/Index";
import CreateReview from "routes/community/Review/CreateReview";

const Index = () => {
	return (
		<div class="w-full h-auto">
			<switch>
				{/* 
					/community/notice/list 이면 기본 페이지
					/community/notice/:id 이면 디테일 페이지
					/community/notice/create 이면 작성 페이지
					/community/notice/:id 에서 수정 할 수 있도록 state 변경

				*/}
				<Route path="/community/notice/:type" component={Notice} />
				<Route path="/community/review/:type" component={Review} />
				<Route path="/community/voice/:type" component={Voice} />
			</switch>
		</div>
	);
};

export default Index;
