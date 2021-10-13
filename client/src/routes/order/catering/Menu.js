import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Menu = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"메뉴 구성"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
			<ContentLayout subtitle={"케이터링 이달의 메뉴"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Menu;
