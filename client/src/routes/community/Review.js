import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Review = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"리뷰"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Review;
