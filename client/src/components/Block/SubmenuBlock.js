import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SubmenuButton from "components/Button/SubmenuButton";
const SubmenuBlock = ({ menu }) => {
	const submenuArr = [
		["인사말", "한숲의 이야기", "한숲의 역사", "오시는 길"],
		["수화식당", "케이터링", "도시락 사업"],
		["케이터링 메뉴", "케이터링 안내", "케이터링 예약"],
		["공지사항", "리뷰", "고객의 소리"],
		["한숲맛이야기"],
		["예약관리", "예약확인", "메뉴관리", "고객의 소리"],
		[""],
	];
	const linkArr = [
		["/intro/introduction", "/intro/story", "/intro/history", "/intro/guide"],
		["/business/restaurant", "/business/catering", "/business/box"],
		[
			"/order/catering/menu",
			"/order/catering/intro",
			"/order/catering/orderMain",
		],
		[
			"/community/notice/list",
			"/community/review/list",
			"/community/voice/main",
		],
		["/enterprise/hansup"],
		[
			"/manager/order",
			"/manager/schedule",
			"/manager/menu",
			"/manager/voice/all",
		],
		[""],
	];
	return (
		<div
			class={
				"w-full flex flex-row justify-center transition delay-50 duration-300 items-center border-b border-gray-400 " +
				(menu === 7 ? "h-0" : "h-12")
			}
		>
			{menu !== 7 &&
				submenuArr[menu].map((element, index) => {
					return (
						<SubmenuButton
							text={element}
							current={linkArr[menu][index]}
							key={element}
						/>
					);
				})}
		</div>
	);
};

export default SubmenuBlock;
