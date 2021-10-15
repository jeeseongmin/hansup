import React from "react";
import reviewList from "routes/community/data/reviewList";
import ReviewBlock from "components/Block/ReviewBlock";

const ReviewListBlock = () => {
	return (
		<div class="w-full h-full grid grid-cols-3 gap-8    ">
			{reviewList.map((element, index) => {
				if (index < 6) {
					return <ReviewBlock review={element} key={element} />;
				}
			})}
		</div>
	);
};

export default ReviewListBlock;
