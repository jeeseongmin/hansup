import React from "react";
import InputBox from "components/Box/InputBox";
import TextareaBox from "components/Box/TextareaBox";
const VoiceFormBlock = () => {
	const onChange = () => {};

	return (
		<div class="w-full  flex flex-col">
			<div class="h-16 grid grid-cols-2 gap-2 mb-2">
				<InputBox
					value={""}
					type={""}
					placeholder={"제목"}
					onChange={onChange}
				/>
				<InputBox
					value={""}
					type={""}
					placeholder={"이름"}
					onChange={onChange}
				/>
			</div>
			<div class="h-96 grid grid-cols-1 gap-2 mb-2">
				<TextareaBox
					value={""}
					type={""}
					placeholder={"내용"}
					onChange={onChange}
				/>
			</div>
			<div class="h-16 flex flex-row mb-2 items-center">
				<p class="w-24 text-xl font-bold">연락처</p>
				<div class="h-full flex-1 grid grid-cols-3 gap-2 ">
					<InputBox
						value={""}
						type={""}
						placeholder={"010"}
						onChange={onChange}
					/>
					<InputBox value={""} type={""} placeholder={""} onChange={onChange} />
					<InputBox value={""} type={""} placeholder={""} onChange={onChange} />
				</div>
				<div class="w-96"></div>
			</div>
			<div class="h-16 flex flex-row mb-2 items-center">
				<p class="w-24 text-xl font-bold">이메일</p>
				<div class="h-full flex-1 grid grid-cols-1 gap-2 items-center">
					<InputBox value={""} type={""} placeholder={""} onChange={onChange} />
				</div>
				<div class="w-12 text-center">@</div>
				<div class="h-full flex-1 grid grid-cols-1 gap-2 items-center">
					<InputBox
						value={""}
						type={""}
						placeholder={"naver.com"}
						onChange={onChange}
					/>
				</div>
				<div class="w-96"></div>
			</div>
		</div>
	);
};

export default VoiceFormBlock;
