import React from "react";
import DaumPostcode from "react-daum-postcode";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";

const PopupPostCodeBlock = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
	const handlePostCode = (data) => {
		let fullAddress = data.address;
		let extraAddress = "";

		if (data.addressType === "R") {
			if (data.bname !== "") {
				extraAddress += data.bname;
			}
			if (data.buildingName !== "") {
				extraAddress +=
					extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
		}
		console.log(data);
		console.log(fullAddress);
		console.log(data.zonecode);
		props.clickAddress(fullAddress);
		props.onClose();
	};

	const postCodeWebStyle = {
		display: "block",
		position: "absolute",
		top: "10%",
		width: "600px",
		height: "600px",
		padding: "7px",
	};
	const postCodeMobileStyle = {
		display: "block",
		position: "absolute",
		top: "10%",
		width: "90%",
		height: "90%",
		padding: "7px",
	};

	return (
		<div class="w-full h-full flex justify-center items-center">
			<DaumPostcode style={postCodeWebStyle} onComplete={handlePostCode} />
			{/* <BrowserView>
			</BrowserView>
			<MobileView>
				<DaumPostcode style={postCodeMobileStyle} onComplete={handlePostCode} />
			</MobileView> */}
			{/* <button
				type="button"
				onClick={() => {
					props.onClose();
				}}
				className="postCode_btn"
			>
				닫기
			</button> */}
		</div>
	);
};

export default PopupPostCodeBlock;
