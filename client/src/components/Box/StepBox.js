import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";

const StepDiv = styled.div`
	background-color: none;
	border: 1px solid #d3d3d3;
	z-index: 30;
	color: #d3d3d3;
	width: auto;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.25rem;
	height: 2.5rem;
	font-weight: bold;
	cursor: pointer;
	position: relative;
	transition: all 0.3s ease;

	${(props) =>
		props.step === props.current &&
		css`
			background-color: #6c4d3f;
			color: white;
		`};
`;

const ArrowBox = styled.div`
	z-index: 20;
	position: absolute;
	height: 1rem;
	width: 1rem;
	transform: rotate(45deg);
	bottom: -0.5rem;
	transition: all 0.3s ease;
	background-color: none;

	${(props) =>
		props.step === props.current &&
		css`
			background-color: #6c4d3f;
		`};
`;

const StepBox = ({ step, current, text, setStep }) => {
	return (
		<StepDiv step={step} current={current} onClick={() => setStep(current)}>
			<span class="z-30">{text}</span>
			{/* <ArrowBox step={step} step={1}/> */}
			<ArrowBox step={step} current={current} />
		</StepDiv>
	);
};

export default StepBox;
