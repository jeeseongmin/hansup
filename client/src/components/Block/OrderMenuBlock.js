import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
// import { BsCheckCircleFill } from "react-icons/bs";
import { GrCheckmark } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	color: #6c4d3f;
	width: 100%;
	cursor: pointer;
`;

const OrderMenuBlock = ({ url, title, price, setMenu, index, type, menu }) => {
	const [selected, setSelected] = useState(false);

	const onToggle = () => {
		const cp = { ...menu };
		if (menu[type].includes(index)) {
			let arr = [...menu[type]].filter(function (element, i) {
				return element !== index;
			});
			cp[type] = arr;
			setMenu(cp);
		} else {
			if (type === "mainMenu" && menu[type].length >= 4) {
				alert("메인 메뉴는 4개까지 선택가능합니다.");
			} else if (type === "subMenu" && menu[type].length >= 4) {
				alert("식사 메뉴는 4개까지 선택가능합니다.");
			} else if (type === "soup" && menu[type].length >= 1) {
				alert("국 메뉴는 1개까지 선택가능합니다.");
			} else if (type === "dessert" && menu[type].length >= 5) {
				alert("디저트 메뉴는 5개까지 선택가능합니다.");
			} else {
				let arr = [...menu[type], index];
				cp[type] = arr;
				setMenu(cp);
			}
		}
	};

	return (
		<Container onClick={onToggle}>
			<div class="h-48 mb-2 relative">
				<img
					src={url}
					class="h-full w-full object-cover shadow-lg"
					alt="menu"
				/>
				<div
					class={
						"w-full h-full border-4 border-hansupBrown absolute left-0 bottom-0 flex justify-center items-center " +
						(menu[type].includes(index) ? "block" : "hidden")
					}
				>
					<div class="z-10 bg-hansupBrown w-full h-full opacity-60 flex justify-center items-center text-gray-200 relative"></div>
					<div class="absolute w-full h-full left-0 top-0 flex justify-center items-center">
						<AiOutlineCheck class="z-20 w-3/4 h-3/4 text-white" />
					</div>
				</div>
			</div>
			<div class="text-lg mb-2">{title}</div>
			{/* <div class="">{price}</div> */}
		</Container>
	);
};

export default OrderMenuBlock;
