import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Notice = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"공지사항"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Notice;
