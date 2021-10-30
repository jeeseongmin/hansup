import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Menu = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"메뉴 추가"}>
				<div class="flex flex-col">
					<p class="text-hansupBrown text-lg mb-8 font-semibold">
						인당 15,000원 (케이터링 주문 최소 인원 : 10인)
					</p>
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Menu;
