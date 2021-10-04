import React from "react";
import styled, { css } from "styled-components";

const Foot = styled.div`
	width: 100%;
	height: 4rem;
	background-color: #d3d3d3;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Footer = () => {
	return <Foot>footer입니다. (추후 작업 예정)</Foot>;
};

export default Footer;
