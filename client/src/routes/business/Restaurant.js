import FoodMenuBlock from "components/Block/FoodMenuBlock";
import Description from "components/Description";
import Subtitle from "components/Subtitle";
import Example from "image/example.png";
import Test from "image/test.png";
import React from "react";
import styled from "styled-components";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import MenuListLayout from "components/Layout/MenuListLayout";
import menuList from "routes/business/data/menuList";

const Label = styled.div`
	background-color: rgba(252, 244, 237, 1);
	color: #6c4d3f;
	font-weight: bold;
	width: 100%;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	bottom: -5rem;
`;

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

const Restaurant = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"수화식당"}>
				<div class="flex w-full h-auto lg:h-auto flex-col lg:flex-row items-center mb-8 relative">
					<div class="w-full lg:w-3/5 px-12 lg:pl-0 lg:pr-12 h-96 mb-4 lg:mb-0 flex justify-start items-start ">
						<img src={Test} class="h-full w-full object-cover" alt="img" />
					</div>
					<div class="h-auto lg:h-96">
						<Description>
							<div class="p-8 h-1/2 text-md lg:text-lg mb-4 lg:mb-0">
								<b>수화식당</b>은 국내 최초 청각장애인 레스토랑으로, 한식과
								양식을 판매하는 식당입니다. 또한 수어 메뉴판, 진동알림시계 등
								청각장애인 친화적 문화가 담겨있는 식당입니다.
							</div>
							<div class="p-8 flex-1 text-md lg:text-lg">
								<b>위치</b> |<br></br>경상북도 포항시 북구 불종로 67-4 1층
							</div>
						</Description>
					</div>
					<Label>
						식사하시는 분들께 디저트로 커피를 무료로 제공해드립니다!
					</Label>
				</div>
			</ContentLayout>
			<ContentLayout subtitle={"수화식당 메뉴"}>
				{[0, 1, 2, 3].map((element, index) => {
					return (
						<MenuListLayout key={menuList[element]} info={menuList[element]} />
					);
				})}
			</ContentLayout>
		</PageLayout>
	);
};

export default Restaurant;
