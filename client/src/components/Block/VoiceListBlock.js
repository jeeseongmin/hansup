// import NoticeList from "routes/community/data/voiceList";
import VoiceBlock from "components/Block/VoiceBlock";
import React from "react";

const VoiceListBlock = ({ voiceList, type }) => {
	return (
		<div class="flex flex-col w-full h-full">
			<div class="h-14 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center">
				<div class="flex-1">제목</div>
				<div class="w-36">날짜</div>
				<div class="w-36">읽음여부</div>
			</div>
			{voiceList.map((element, index) => {
				return <VoiceBlock voice={element} key={element} type={type} />;
			})}
		</div>
	);
};

export default VoiceListBlock;
