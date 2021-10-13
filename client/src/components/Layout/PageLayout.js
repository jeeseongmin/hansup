import React from "react";

const PageLayout = ({ children }) => {
	return (
		<div class="flex flex-col pt-12">
			{children}
		</div>
	);
};

export default PageLayout;
