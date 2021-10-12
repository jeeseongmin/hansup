import React from "react";
import styled, { css } from "styled-components";
import Subtitle from "components/Subtitle";
import Test from "image/test.png";
import FoodMenuBlock from "components/Block/FoodMenuBlock";
import Example from "image/example.png";

const Label = styled.div`
	background-color: rgba(252, 244, 237, 1);
	color: #6c4d3f;
	font-weight: bold;
	width: 100%;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MenuTitle = styled.div`
	color: #6c4d3f;
	font-size: 1.5rem;
`;
const Description = styled.div`
	background-color: #f1f0ec;
	color: #6c4d3f;
	height: 100%;
	padding: 2rem;
	flex: 1 1 0%;
	display: flex;
	flex-direction: column;

	// 기본 사이즈
	@media screen and (max-width: 1200px) {
	}
	//
	@media screen and (max-width: 768px) {
		width: 100%;
		justify-content: space-between;
	}
	// 모바일 iPhone
	@media screen and (max-width: 480px) {
	}
`;
const Line = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
	width: 100%;
	border-top: 1px solid #6c4d3f;
`;

const Restaurant = () => {
	return (
		<div class="flex flex-col pt-12">
			<div class="px-8 lg:px-40 w-full flex flex-col">
				<div class="w-24 mb-6">
					<Subtitle subtitle={"수화식당"} />
				</div>
				<div class="flex w-full h-auto lg:h-96 flex-col lg:flex-row items-center mb-4 ">
					<div class="w-full lg:w-3/5 px-12 lg:pl-0 lg:pr-12 h-full mb-4 lg:mb-0 flex justify-start items-start ">
						<img src={Test} class="h-full w-full object-cover" alt="img" />
					</div>
					<Description>
						<div class="h-1/2 text-md lg:text-lg mb-4 lg:mb-0">
							<b>수화식당</b>은 국내 최초 청각장애인 레스토랑으로, 한식과 양식을
							판매하는 식당입니다. 또한 수어 메뉴판, 진동알림시계 등 청각장애인
							친화적 문화가 담겨있는 식당입니다.
						</div>
						<div class="flex-1 text-md lg:text-lg">
							<b>위치</b> |<br></br>경상북도 포항시 북구 불종로 67-4 1층
						</div>
					</Description>
				</div>
			</div>
			<Label>식사하시는 분들께 디저트로 커피를 무료로 제공해드립니다!</Label>
			<div class="px-8 lg:px-40 w-full flex flex-col pt-16">
				<div class="w-36 mb-6">
					<Subtitle subtitle={"수화식당 메뉴"} />
				</div>
				<div class="mb-16">
					<MenuTitle>파스타 Pasta & 필라프 Pilau</MenuTitle>
					<Line></Line>
					<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-5">
						<FoodMenuBlock
							url={Example}
							title={"아라비아따 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"알프레도크림 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"비프 필라프"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"해물뚝배기 파스타"}
							price={"10,000원"}
						/>
					</div>
				</div>
				<div class="mb-16">
					<MenuTitle>피자 Pizza</MenuTitle>
					<Line></Line>
					<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-5">
						<FoodMenuBlock
							url={Example}
							title={"아라비아따 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"알프레도크림 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"비프 필라프"}
							price={"10,000원"}
						/>
					</div>
				</div>
				<div class="mb-16">
					<MenuTitle>한식메뉴 Korean Menu</MenuTitle>
					<Line></Line>
					<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-5">
						<FoodMenuBlock
							url={Example}
							title={"아라비아따 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"알프레도크림 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"비프 필라프"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"해물뚝배기 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"비프 필라프"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"해물뚝배기 파스타"}
							price={"10,000원"}
						/>
					</div>
				</div>
				<div class="mb-16">
					<MenuTitle>음료 Drink & 주류 Beer</MenuTitle>
					<Line></Line>
					<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-5">
						<FoodMenuBlock
							url={Example}
							title={"아라비아따 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"알프레도크림 파스타"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"비프 필라프"}
							price={"10,000원"}
						/>
						<FoodMenuBlock
							url={Example}
							title={"해물뚝배기 파스타"}
							price={"10,000원"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Restaurant;
