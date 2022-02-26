import React, { useEffect, useState, useRef } from "react";
// import "components/navs/nav.css";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const SubmenuButton = styled(Link)`
  height: 4rem;
  width: 9rem;
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 0px;
  background-color: #6c4d3f;

  ${(props) =>
    props.isLast &&
    css`
      border-radius: 0px 0px 16px 16px;
    `};

  ${(props) =>
    props.empty &&
    css`
      visibility: hidden;
    `};
  // 기본 사이즈
  @media screen and (max-width: 1200px) {
  }
  //
  @media screen and (max-width: 768px) {
    width: 6rem;
  }
  // 모바일 iPhone
  @media screen and (max-width: 480px) {
  }
`;
const Submenu = ({ title, url, empty, isLast }) => {
  return (
    <SubmenuButton to={url} empty={empty} isLast={isLast}>
      {title}
    </SubmenuButton>
  );
};

export default Submenu;
