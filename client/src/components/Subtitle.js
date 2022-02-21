import React from "react";
import styled, { css } from "styled-components";

const Div = styled.h1`
  background-color: #6c4d3f;
  color: white;
  width: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
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
