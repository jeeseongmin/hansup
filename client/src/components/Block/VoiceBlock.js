import React from "react";
import { useHistory } from "react-router-dom";

const VoiceBlock = ({ voice }) => {
	const history = useHistory();
	const goPage = () => {
		history.push("/community/voice/" + voice._id);
	};
	return (
		<div
			onClick={goPage}
			class="py-4 cursor-pointer transition delay-50 duration-200 hover:bg-gray-100 h-auto min-h-14 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center"
		>
			<div class="flex-1 truncate pr-4 ">
				<p class="w-full truncate">{voice.title}</p>
			</div>
			<div class="w-36">
				{voice.createdAt.substr(2, 8).replace(/[-]/g, ".")}
			</div>
			{voice.status === "unread" ? (
				<div class="w-36 text-red-500">안읽음</div>
			) : (
				<div class="w-36">읽음</div>
			)}
		</div>
	);
};

export default VoiceBlock;
