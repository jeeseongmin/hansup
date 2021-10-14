import React from "react";

const InfoBlock = ({ children, title }) => {
	return (
		<div class="flex flex-col mb-8">
			<p class="text-hansupBrown text-3xl font-bold pb-2 mb-4 border-b border-hansupBrown">
				{title}
			</p>
			{children}
		</div>
	);
};

export default InfoBlock;
