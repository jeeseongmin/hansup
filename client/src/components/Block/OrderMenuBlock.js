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

const OrderMenuBlock = ({
	url,
	title,
	price,
	clickMenu,
	index,
	type,
	data,
}) => {
	const [selected, setSelected] = useState(false);

	const onToggle = () => {
		// if (type === "select") setSelected(!selected);
		clickMenu(index, type);
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
						(data && data[type].includes(index) ? "block" : "hidden")
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
