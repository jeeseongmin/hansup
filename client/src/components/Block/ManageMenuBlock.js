import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	color: #6c4d3f;
	width: 100%;
`;

const ManageMenuBlock = ({ use, menu, updateMenu, deleteMenu, match }) => {
	if (use === "control") {
		return (
			<Container>
				<div class="h-48 mb-2 relative">
					<img
						src={
							"http://hansup.cafe24app.com/api/image/view/" +
							menu.imgList[0].filename
						}
						class="h-full w-full object-cover "
						alt="menu"
					/>
					<div class="z-20 w-full h-full absolute left-0 top-0 transition delay-50 duration-150 bg-black bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100 flex justify-center items-center">
						<div class="z-30 w-full flex flex-row justify-center text-white text-lg font-bold">
							<span
								onClick={() => updateMenu(menu)}
								class="cursor-pointer mr-2"
							>
								수정
							</span>{" "}
							/{" "}
							<span
								onClick={() => deleteMenu(menu._id)}
								class="cursor-pointer ml-2"
							>
								삭제
							</span>
						</div>
					</div>
				</div>
				<div class="text-lg mb-2">{menu.name}</div>
				{menu.category === "restaurant" && (
					<div class="text-lg mb-2">{menu.price.toLocaleString()}원</div>
				)}
			</Container>
		);
	} else if (use === "view") {
		return (
			<Container>
				<div class="h-48 mb-2 relative">
					<img
						src={
							"http://localhost:5000/api/image/view/" + menu.imgList[0].filename
						}
						class="h-full w-full object-cover "
						alt="menu"
					/>
				</div>
				<div class="text-lg mb-2">{menu.name}</div>
				{menu.category === "restaurant" && (
					<div class="text-lg mb-2">{menu.price.toLocaleString()}원</div>
				)}
			</Container>
		);
	}
};

export default ManageMenuBlock;
