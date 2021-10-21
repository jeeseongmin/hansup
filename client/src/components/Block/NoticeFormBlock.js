import React, { useState, useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

const NoticeFormBlock = ({
	changeInfo,
	titleRef,
	contentRef,
	info,
	isEdit,
	includeImg,
}) => {
	const buttonRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [isImageUpload, setIsImageUpload] = useState(false);

	const onChange = async (e) => {
		setLoading(false);
		const formData = new FormData();
		formData.append("file", e.target.files[0]);

		// 서버의 upload API 호출
		const res = await axios.post("/api/image/upload", formData);
		const cp = [...info.imgList];
		await cp.push({ filename: res.data.filename, id: res.data.id });
		await changeInfo(cp, "imgList");
		setLoading(true);
		setIsImageUpload(true);
	};
	// const deletePhoto = isEdit ? props.deletePhoto : null;
	const deletePhoto = null;

	const buttonClick = () => {
		buttonRef.current.click();
	};
	const removeImg = async (index) => {
		if (isEdit) {
			const cp = [...info.imgList];
			const name = cp[index];
			deletePhoto(name);

			cp.splice(index, 1);
			await changeInfo(cp, "imgList");
		} else {
			const cp = [...info.imgList];
			const id = cp[index].id;
			cp.splice(index, 1);
			changeInfo(cp, "imgList");

			await axios.get("/api/image/delete/" + id);
		}

		if (info.imgList.length === 0) {
			setIsImageUpload(false);
		}
	};

	const [img, setImg] = useState(null);
	const [url, setUrl] = useState(null);

	return (
		<div
			class={
				"w-full h-auto mb-4 relative transaition delay-100 duration-300 " +
				(includeImg ? "pt-48 " : "pt-0")
			}
		>
			{/* 딱 10개 씩만 로드하기 */}
			<div
				class={
					"top-0 w-full transaition delay-100 overflow-hidden duration-300 h-auto absolute " +
					(includeImg ? "opacity-100 h-auto" : "h-0 opacity-0")
				}
			>
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
						class="text-sm outline-none w-24 md:w-auto cursor-pointer px-0 md:px-8 py-1 justify-center border border-hansupBrown bg-hansupBrown text-white flex flex-row items-center hover:opacity-60 hover:text-white hover:font-bold"
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
							<CircularProgress />
						</div>
					)}
				</div>
				<h1 class="text-lg font-bold pt-4">
					이미지 업로드 후 입력 가능합니다.
				</h1>
			</div>
			<div class="w-full pt-4 pb-2 mb-2 grid grid-cols-1">
				<input
					// ref={titleRef}
					ref={titleRef}
					type="text"
					class="flex-1 p-4 border-2 border-gray-300 outline-none focus:border-hansupBrown"
					onChange={(e) => changeInfo(e, "email")}
					value={info.title}
					placeholder="제목을 입력하세요."
					disabled={!isImageUpload}
				/>
			</div>
			<div class="cursor-pointer w-full pt-2 pb-0 flex justify-end items-center">
				<textarea
					ref={contentRef}
					class="w-full h-24 p-4 border-2 border-gray-300 outline-none focus:border-hansupBrown resize-none	"
					onChange={(e) => changeInfo(e, "content")}
					value={info.content}
					placeholder="내용을 입력하세요."
					disabled={!isImageUpload}
				></textarea>
			</div>
		</div>
	);
};

export default NoticeFormBlock;
