import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const VoiceBlock = ({ voice }) => {
	const history = useHistory();
	const goPage = () => {
		if (voice.status === "unread") {
			readCheck();
		} else {
			history.push("/manager/voice/" + voice._id);
		}
	};

	const readCheck = async () => {
		await axios
			.post(
				"/api/voice/read/" + voice._id,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				history.push("/manager/voice/" + voice._id);
			})
			.catch((Error) => {
				console.log(Error);
			});
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
