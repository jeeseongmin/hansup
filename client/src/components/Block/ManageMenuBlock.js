import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	color: #6c4d3f;
	width: 100%;
`;

const ManageMenuBlock = ({ url, title, price }) => {
	return (
		<Container>
			<div class="h-48 mb-2">
				<img src={url} class="h-full w-full object-cover " alt="menu" />
			</div>
			<div class="text-lg mb-2">{title}</div>
		</Container>
	);
};

export default ManageMenuBlock;
