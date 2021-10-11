import React from "react";
import styled, { css } from "styled-components";

const Div = styled.div`
	background-color: #6c4d3f;
	color: white;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 2rem;
	font-weight: bold;
`;

const Subtitle = ({ subtitle }) => {
	return <Div>{subtitle}</Div>;
};

export default Subtitle;
