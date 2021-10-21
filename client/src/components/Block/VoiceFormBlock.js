import React, { useState, useEffect, useRef } from "react";
import InputBox from "components/Box/InputBox";
import TextareaBox from "components/Box/TextareaBox";
const VoiceFormBlock = ({
	info,
	changeInfo,
	titleRef,
	nameRef,
	contentRef,
	phoneRef1,
	phoneRef2,
	phoneRef3,
	isEdit,
}) => {
	const buttonRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [isImageUpload, setIsImageUpload] = useState(false);

	return (
		<div class="w-full  flex flex-col">
			<div class="h-16 grid grid-cols-2 gap-2 mb-2">
				<InputBox
					value={info.title}
					type={"title"}
					placeholder={"제목"}
					onChange={changeInfo}
					refName={titleRef}
				/>
				<InputBox
					value={info.name}
					type={"name"}
					placeholder={"이름"}
					onChange={changeInfo}
					refName={nameRef}
				/>
			</div>
			<div class="h-96 grid grid-cols-1 gap-2 mb-2">
				<TextareaBox
					value={info.content}
					type={"content"}
					placeholder={"내용"}
					onChange={changeInfo}
					refName={contentRef}
				/>
			</div>
			<div class="h-16 flex flex-row mb-2 items-center">
				<p class="w-24 text-xl font-bold">연락처</p>
				<div class="h-full flex-1 grid grid-cols-3 gap-2 ">
					<InputBox
						value={info.phone1}
						type={"phone1"}
						placeholder={"010"}
						onChange={changeInfo}
						refName={phoneRef1}
					/>
					<InputBox
						value={info.phone2}
						type={"phone2"}
						placeholder={""}
						onChange={changeInfo}
						refName={phoneRef2}
					/>
					<InputBox
						value={info.phone3}
						type={"phone3"}
						placeholder={""}
						onChange={changeInfo}
						refName={phoneRef3}
					/>
				</div>
				<div class="w-96"></div>
			</div>
			<div class="h-16 flex flex-row mb-2 items-center">
				<p class="w-24 text-xl font-bold">이메일</p>
				<div class="h-full flex-1 grid grid-cols-1 gap-2 items-center">
					<InputBox
						value={info.email1}
						type={"email1"}
						placeholder={""}
						onChange={changeInfo}
					/>
				</div>
				<div class="w-12 text-center">@</div>
				<div class="h-full flex-1 grid grid-cols-1 gap-2 items-center">
					<InputBox
						value={info.email2}
						type={"email2"}
						placeholder={"naver.com"}
						onChange={changeInfo}
					/>
				</div>
				<div class="w-96"></div>
			</div>
		</div>
	);
};

export default VoiceFormBlock;
