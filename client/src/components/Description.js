import React from "react";
import styled, { css } from "styled-components";

const Desc = styled.div`
	background-color: #f1f0ec;
	color: #6c4d3f;
	height: 100%;
	width: 100%;
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
const Description = ({ children }) => {
	return <Desc>{children}</Desc>;
};

export default Description;
