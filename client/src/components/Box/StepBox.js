import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";

const StepDiv = styled.div`
	background-color: none;
	border: 1px solid #d3d3d3;
	z-index: 50;
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
		props.step === props.selected &&
		css`
			background-color: #6c4d3f;
			color: white;
		`};
`;

const ArrowBox = styled.div`
	z-index: 40;
	position: absolute;
	height: 1rem;
	width: 1rem;
	transform: rotate(45deg);
	bottom: -0.5rem;
	transition: all 0.3s ease;
	background-color: none;

	${(props) =>
		props.step === props.selected &&
		css`
			background-color: #6c4d3f;
		`};
`;

const StepBox = ({ selected, step, text, setSelected }) => {
	return (
		<StepDiv selected={selected} step={step} onClick={() => setSelected(step)}>
			<span class="z-50">{text}</span>
			{/* <ArrowBox selected={selected} step={1}/> */}
			<ArrowBox selected={selected} step={step} />
			{/* <div
				class={
					"z-40 transition ease-out -bottom-2 absolute h-4 w-4 transform rotate-45 " +
					(selected === step ? "bg-hansupBrown" : " bg-none")
				}
			></div> */}
		</StepDiv>
	);
};

export default StepBox;
