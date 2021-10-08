import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

const SubmenuBtn = styled(Link)`
	width: auto;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 4px solid white;
	border-bottom: 4px solid white;
	transition: all 0.3s ease;
	color: gray;

	&:hover {
		color: #6c4d3f;
		font-weight: bold;
		border-bottom: 4px solid #6c4d3f;
	}

	${(props) =>
		props.selected &&
		css`
			color: #6c4d3f;
			font-weight: bold;
			border-bottom: 4px solid #6c4d3f;
		`}
`;

const Submenu = ({ text, current }) => {
	const location = useLocation();
	const [selected, setSelected] = useState(false);
	useEffect(() => {
		if (location.pathname === current) setSelected(true);
		else setSelected(false);
	}, [location.pathname]);
	return (
		<SubmenuBtn to={current} selected={selected}>
			{text}
		</SubmenuBtn>
	);
};

export default Submenu;
