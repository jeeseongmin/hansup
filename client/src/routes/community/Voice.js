import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Voice = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"고객의 소리"}>
				<div class="flex flex-row border border-black"></div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Voice;
