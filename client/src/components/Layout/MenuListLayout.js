import React from "react";
import styled from "styled-components";
import FoodMenuBlock from "components/Block/FoodMenuBlock";
import Example from "image/example.png";
import menuList from "routes/business/data/menuList";

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
const MenuListLayout = ({ info }) => {
	return (
		<div class="mb-16">
			<MenuTitle>{info.title}</MenuTitle>
			<Line></Line>
			<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-5">
				{info.menu.map((element, index) => {
					return (
						<FoodMenuBlock
							url={Example}
							title={element.name}
							price={element.price + "원"}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default MenuListLayout;