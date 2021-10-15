import NoticeListBlock from "components/Block/NoticeListBlock";
import ContentLayout from "components/Layout/ContentLayout";
import PageLayout from "components/Layout/PageLayout";
import React from "react";

const Index = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"공지사항"}>
				<div class="flex flex-row">
					<NoticeListBlock />
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Index;
