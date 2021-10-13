import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Intro = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"가격 및 주문 최소 인원"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
			<ContentLayout subtitle={"결제 방법"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
			<ContentLayout subtitle={"배달비"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Intro;
