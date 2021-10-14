import React from "react";
import styled from "styled-components";
import CateringMenuBlock from "components/Block/CateringMenuBlock";
import Example from "image/example.png";

const MenuTitle = styled.div`
	color: #6c4d3f;
	font-size: 1.5rem;
`;

const Line = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
	width: 100%;
	border-top: 1px solid #6c4d3f;
`;
const OrderListLayout = ({ info, col, type }) => {
	const colStyle = "grid-cols-" + col;
	return (
		<div class="mb-16">
			<MenuTitle>{info.title}</MenuTitle>
			<Line></Line>
			<div class={"w-full grid grid-cols-2 gap-5 lg:" + colStyle}>
				{info.menu.map((element, index) => {
					return (
						<CateringMenuBlock
							url={Example}
							title={element.name}
							price={element.price + "원"}
							type={type}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default OrderListLayout;
