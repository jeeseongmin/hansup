import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	color: #6c4d3f;
	width: 100%;
`;

const FoodMenuBlock = ({ menu }) => {
	return (
		<Container>
			<div class="h-48 mb-2">
				<img
					src={
						window.location.origin +
						"/api/image/view/" +
						menu.imgList[0].filename
					}
					class="h-full w-full object-cover "
					alt={"수화식당의 음식, " + menu.name}
				/>
			</div>
			<div class="text-lg mb-2">{menu.name}</div>
			{menu.category === "restaurant" && (
				<div class="text-lg mb-2">{menu.price.toLocaleString()}원</div>
			)}{" "}
		</Container>
	);
};

export default FoodMenuBlock;
