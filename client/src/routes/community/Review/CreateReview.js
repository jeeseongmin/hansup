import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ReviewFormBlock from "components/Block/ReviewFormBlock";
import Subtitle from "components/Subtitle";

const CreateReview = () => {
	const history = useHistory();
	const contentRef = useRef(null);
	const [info, setInfo] = useState({
		content: "",
		imgList: [],
		creator: "",
		password: "",
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

	const submit = () => {};
	return (
		<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
			<div class="inline-flex w-full mb-6">
				<Subtitle subtitle={"리뷰 작성하기"} />
			</div>
			<ReviewFormBlock
				contentRef={contentRef}
				changeInfo={changeInfo}
				info={info}
				isEdit={false}
			/>

			<div class="flex justify-between items-center flex-col md:flex-row">
				<Link
					class="mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
					to={"/community/review/list"}
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

export default CreateReview;
