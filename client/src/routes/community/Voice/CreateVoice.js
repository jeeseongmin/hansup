import VoiceFormBlock from "components/Block/VoiceFormBlock";
import DefaultButton from "components/Button/DefaultButton";
import ContentLayout from "components/Layout/ContentLayout";
import React from "react";
import { useHistory } from "react-router-dom";

const CreateVoice = () => {
	const history = useHistory();

	const goPage = () => {
		history.push("/community/voice/create");
	};
	const submit = () => {};
	return (
		<ContentLayout subtitle={"고객의 소리 작성하기"}>
			<div class="h-full w-full flex flex-col justify-center items-center py-8 border-t-2 border-b-2 border-hansupBrown mb-4">
				<VoiceFormBlock />
			</div>
			<div class="w-full h-12 flex flex-row justify-end">
				<div class="w-36 h-full">
					<DefaultButton text={"작성완료"} event={submit} />
				</div>
			</div>
		</ContentLayout>
	);
};

export default CreateVoice;
