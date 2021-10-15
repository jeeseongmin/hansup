import React, { useState, useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
// import CircularProgress from "@material-ui/core/CircularProgress";

const ReviewFormBlock = ({ changeInfo, contentRef, info }) => {
	const buttonRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const onChange = () => {};
	const buttonClick = () => {};
	const removeImg = () => {};

	return (
		<div class="w-full h-auto mb-4">
			{/* 딱 10개 씩만 로드하기 */}
			<input
				ref={buttonRef}
				type="file"
				class="hidden"
				name="img"
				onChange={onChange}
			/>
			<div class="w-full my-4 flex flex-row justify-between items-center">
				<h1 class="text-lg font-bold">업로드 된 이미지 목록</h1>
				<button
					class="text-sm outline-none w-full md:w-auto cursor-pointer px-0 md:px-8 py-1 justify-center border border-hansupBrown bg-hansupBrown text-white flex flex-row items-center hover:opacity-60 hover:text-white hover:font-bold"
					onClick={buttonClick}
				>
					이미지 업로드
				</button>
			</div>
			<div
				class={
					"w-full border-2 border-gray-300 px-4 py-4 mb-2 flex flex-wrap " +
					(loading ? "text-center" : "")
				}
			>
				{info.imgList.length === 0 && loading ? (
					<div class="text-gray-500">업로드된 이미지가 없습니다.</div>
				) : loading ? (
					info.imgList.map((element, index) => {
						return (
							<div class="w-24 mb-4 border border-gray-300 rounded-md relative mx-4">
								<img
									class="w-full h-24 object-contain"
									src={
										window.location.origin +
										"/api/image/view/" +
										element.filename
									}
									alt="imgList"
								/>
								{/* <img
                            class="w-full h-24 object-contain"
                            src={
                                "http://localhost:5000/api/image/view/" + element.filename
                            }
                            alt="imgList"
                        /> */}
								<MdCancel
									onClick={() => removeImg(index)}
									size={24}
									class="cursor-pointer rounded-full bg-white absolute -top-2 -right-2"
								/>
							</div>
						);
					})
				) : (
					<div class="w-full h-24 my-2 py-4 flex justify-center items-center text-center">
						{/* <CircularProgress /> */}
					</div>
				)}
			</div>
			<div class="cursor-pointer w-full pt-2 pb-0 flex justify-end items-center">
				<textarea
					ref={contentRef}
					class="w-full h-24 p-4 border-2 border-gray-300 outline-none focus:border-hansupBrown resize-none	"
					onChange={(e) => changeInfo(e, "content")}
					value={info.content}
					placeholder="내용"
				></textarea>
			</div>
			<div class="w-full pt-4 pb-2 mb-2 grid grid-cols-2 gap-2">
				<input
					// ref={titleRef}
					type="text"
					class="flex-1 p-4 border-2 border-gray-300 outline-none focus:border-hansupBrown"
					onChange={(e) => changeInfo(e, "title")}
					value={info.title}
					placeholder="작성자 이름"
				/>
				<input
					// ref={titleRef}
					type="password"
					class="flex-1 p-4 border-2 border-gray-300 outline-none focus:border-hansupBrown"
					onChange={(e) => changeInfo(e, "title")}
					value={info.title}
					placeholder="패스워드"
				/>
			</div>
		</div>
	);
};

export default ReviewFormBlock;
