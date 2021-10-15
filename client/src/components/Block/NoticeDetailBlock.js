import React from "react";

const NoticeDetailBlock = ({ notice }) => {
	return (
		<div class="flex flex-col w-full h-full">
			<div class="min-h-14 h-auto py-4 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center">
				<div class="flex-1 pr-4 ">
					<p class="w-full break-all">{notice.title}</p>
				</div>
				<div class="w-36">{notice.date}</div>
			</div>

			<div class="w-full py-8 h-96 px-8 border-b-2 border-gray-200">
				<p class="w-full break-all">{notice.content}</p>
			</div>
		</div>
	);
};

export default NoticeDetailBlock;
