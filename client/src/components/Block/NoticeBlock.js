import React from "react";
import { useHistory } from "react-router-dom";

const NoticeBlock = ({ notice }) => {
	const history = useHistory();
	const goPage = () => {
		history.push("/community/notice/" + notice._id);
	};
	return (
		<div
			onClick={goPage}
			class="py-4 cursor-pointer transition delay-50 duration-200 hover:bg-gray-100 h-auto min-h-14 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center"
		>
			<div class="flex-1 truncate pr-4 ">
				<p class="w-full truncate">{notice.title}</p>
			</div>
			<div class="w-36">
				{notice.createdAt.substr(2, 8).replace(/[-]/g, ".")}
			</div>
		</div>
	);
};

export default NoticeBlock;
