import React from "react";
import styled from "styled-components";
import CateringMenuBlock from "components/Block/CateringMenuBlock";
import OrderMenuBlock from "components/Block/OrderMenuBlock";
import Example from "image/example.png";

const MenuTitle = styled.div`
	color: #6c4d3f;
	font-size: 1.5rem;
	font-weight: bold;
`;

const Line = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
	width: 100%;
	border-top: 1px solid #6c4d3f;
`;
const OrderListLayout = ({ info, col, type, setMenu, menuList }) => {
	const colStyle = "grid-cols-" + col;
	return (
		<div class="mb-16">
			<MenuTitle>{info.title}</MenuTitle>
			<Line></Line>
			{type === "view" ? (
				<div class={"w-full grid grid-cols-2 gap-5 lg:grid-cols-5"}>
					{/* <div class={"w-full grid grid-cols-2 gap-5 lg:grid-cols-5" + colStyle}> */}
					{info.menu.map((element, index) => {
						return (
							<CateringMenuBlock
								url={
									"http://hansupfood.com/api/image/view/" +
									element.imgList[0].filename
								}
								title={element.name}
								price={element.price + "원"}
							/>
						);
					})}
				</div>
			) : (
				<div class={"w-full grid grid-cols-2 gap-5 lg:" + colStyle}>
					{info.menu.map((element, index) => {
						return (
							<OrderMenuBlock
								menu={element}
								type={element.type}
								setMenu={setMenu}
								menuList={menuList}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default OrderListLayout;
