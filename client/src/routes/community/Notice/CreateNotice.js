import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import NoticeFormBlock from "components/Block/NoticeFormBlock";
import Subtitle from "components/Subtitle";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CreateNotice = () => {
	const history = useHistory();
	const contentRef = useRef(null);
	const titleRef = useRef(null);
	const passwordRef = useRef(null);
	const [includeImg, setIncludeImg] = useState(false);
	const [isImageUpload, setIsImageUpload] = useState(true);

	const onClickCheckBox = (e) => {
		setIncludeImg(e.target.checked);
		// 이미지 포함할 때 (true) image Upload가 된 상태가 마찬가지
		setIsImageUpload(includeImg);
		const cp = { ...info };
		cp["imgList"] = [];
		setInfo(cp);
	};
	const [info, setInfo] = useState({
		title: "",
		content: "",
		imgList: [],
	});
	const changeInfo = (e, type) => {
		if (type === "imgList") {
			const cp = { ...info };
			cp[type] = e;
			setInfo(cp);
		} else {
			const cp = { ...info };
			cp[type] = e.target.value;
			setInfo(cp);
		}
	};

	const submit = () => {
		if (info.title === "") {
			alert("제목을 입력해주세요!");
			titleRef.current.focus();
		} else if (info.content === "") {
			alert("내용을 입력해주세요!");
			contentRef.current.focus();
		} else if (includeImg && info.imgList.length === 0) {
			alert("1개 이상의 이미지를 업로드 해주세요.");
		} else {
			axios
				.post(
					"/api/notice/create",
					{
						key: process.env.REACT_APP_API_KEY,
						title: info.title,
						content: info.content,
						imgList: info.imgList,
					},
					{
						headers: {
							"content-type": "application/json",
							Accept: "application/json",
						},
					}
				)
				.then((response) => {
					alert("업로드 되었습니다.");
					history.push("/community/notice/list");
					document.getElementById("scrollRef").scrollTo(0, 0);
				})
				.catch((response) => {
					console.log("Error!");
				});
		}
	};

	return (
		<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
			<div class="inline-flex w-full justify-between mb-6">
				<Subtitle subtitle={"공지사항 작성하기"} />
				<div class="flex flex-row items-center">
					<div>
						<Checkbox
							checked={includeImg}
							onChange={(e) => onClickCheckBox(e)}
							{...label}
							labelStyle={{ color: "#6C4D3F" }}
							iconStyle={{ fill: "white" }}
							color="default"
						/>
					</div>
					<div>이미지 첨부</div>
				</div>
			</div>
			<NoticeFormBlock
				changeInfo={changeInfo}
				titleRef={titleRef}
				contentRef={contentRef}
				info={info}
				isEdit={false}
				includeImg={includeImg}
				setIsImageUpload={setIsImageUpload}
				isImageUpload={isImageUpload}
			/>

			<div class="flex justify-between items-center flex-col md:flex-row">
				<Link
					class="mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
					to={"/community/notice/list"}
					onClick={() => window.scrollTo(0, 0)}
				>
					뒤로 가기
				</Link>
				<button
					onClick={submit}
					class="outline-none w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
				>
					제출하기
				</button>
			</div>
		</div>
	);
};

export default CreateNotice;
