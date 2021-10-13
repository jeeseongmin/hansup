import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import HistoryImg from "image/intro-history-img1.png";

const History = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"한숲의 역사"}>
				<div class="flex flex-row">
					<div class="w-full lg:w-2/3">
						<img src={HistoryImg} alt="img1" />
					</div>
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default History;
