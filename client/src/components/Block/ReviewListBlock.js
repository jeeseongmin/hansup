import ReviewBlock from "components/Block/ReviewBlock";
import React from "react";

const ReviewListBlock = ({ reviewList, setReviewList }) => {
	return (
		<div class="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-8    ">
			{reviewList.map((element, index) => {
				return (
					<ReviewBlock
						review={element}
						key={element._id}
						reviewList={reviewList}
						setReviewList={setReviewList}
					/>
				);
			})}
		</div>
	);
};

export default ReviewListBlock;
