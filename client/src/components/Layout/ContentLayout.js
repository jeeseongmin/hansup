import React from "react";
import Subtitle from "components/Subtitle";

const ContentLayout = ({ children, subtitle }) => {
	return (
		<div
			class={
				"w-full flex flex-col mb-16 lg:mb-24 " +
				(subtitle === "한숲비전"
					? "px-8 lg:pl-8 xl:pl-40 xl:pr-0"
					: "px-8 xl:px-40")
			}
		>
			<div class="inline-flex w-full mb-6">
				<Subtitle subtitle={subtitle} />
			</div>
			{children}
		</div>
	);
};

export default ContentLayout;
