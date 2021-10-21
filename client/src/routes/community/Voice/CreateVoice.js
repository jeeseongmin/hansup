import VoiceFormBlock from "components/Block/VoiceFormBlock";
import DefaultButton from "components/Button/DefaultButton";
import ContentLayout from "components/Layout/ContentLayout";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreateVoice = () => {
	const history = useHistory();
	const titleRef = useRef(null);
	const nameRef = useRef(null);
	const contentRef = useRef(null);
	const phoneRef1 = useRef(null);
	const phoneRef2 = useRef(null);
	const phoneRef3 = useRef(null);
	const emailRef1 = useRef(null);
	const emailRef2 = useRef(null);

	const goPage = () => {
		history.push("/community/voice/create");
	};

	const [info, setInfo] = useState({
		status: "unread",
		title: "",
		content: "",
		name: "",
		phone1: "",
		phone2: "",
		phone3: "",
		email1: "",
		email2: "",
	});

	const changeInfo = (e, type) => {
		const cp = { ...info };
		cp[type] = e.target.value;
		setInfo(cp);
	};

	const submit = () => {
		if (info.title === "") {
			alert("제목을 입력해주세요!");
			titleRef.current.focus();
		} else if (info.content === "") {
			alert("내용을 입력해주세요!");
			contentRef.current.focus();
		} else if (info.name === "") {
			alert("이름을 입력해주세요!");
			nameRef.current.focus();
		} else if (
			(info.phone1 === "" || info.phone2 === "" || info.phone3 === "") &&
			(info.email1 === "" || info.email2 === "")
		) {
			alert("휴대폰 번호 혹은 이메일을 입력해주세요.");
			phoneRef1.current.focus();
		} else if (
			info.phone1 !== "" &&
			info.phone2 !== "" &&
			info.phone3 !== "" &&
			info.phone2.length > 4
		) {
			alert("올바른 휴대폰 번호를 입력해주세요.");
			phoneRef2.current.focus();
		} else if (
			info.phone1 !== "" &&
			info.phone2 !== "" &&
			info.phone3 !== "" &&
			info.phone3.length > 4
		) {
			alert("올바른 휴대폰 번호를 입력해주세요.");
			phoneRef3.current.focus();
		} else {
			axios
				.post(
					"/api/voice/add",
					{
						key: process.env.REACT_APP_API_KEY,
						status: info.status,
						title: info.title,
						name: info.name,
						content: info.content,
						phone:
							info.phone1 === "" || info.phone2 === "" || info.phone3 === ""
								? ""
								: info.phone1 + "-" + info.phone2 + "-" + info.phone3,
						email:
							info.email1 === "" || info.email2 === ""
								? ""
								: info.email1 + "@" + info.email2,
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
					history.push("/community/voice/main");
					document.getElementById("scrollRef").scrollTo(0, 0);
				})
				.catch((response) => {
					console.log("Error!");
				});
		}
	};
	return (
		<ContentLayout subtitle={"고객의 소리 작성하기"}>
			<p class="font-bold text-sm lg:text-lg mb-4">
				고객의 소리는 여러분의 고충과 피드백, 조언을 담아내는 공간입니다. 지나친
				인신 공격과 비방은 삼가주시면 감사하겠습니다.
			</p>
			<div class="h-full w-full flex flex-col justify-center items-center py-8 border-t-2 border-b-2 border-hansupBrown mb-4">
				<VoiceFormBlock
					info={info}
					changeInfo={changeInfo}
					titleRef={titleRef}
					nameRef={nameRef}
					contentRef={contentRef}
					phoneRef1={phoneRef1}
					phoneRef2={phoneRef2}
					phoneRef3={phoneRef3}
					isEdit={false}
				/>
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
