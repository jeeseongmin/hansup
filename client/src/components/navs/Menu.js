import React from "react";
// import "components/navs/nav.css";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

const MenuButton = styled.button`
  height: 4rem;
  width: 9rem;
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 0;
  /* border-top: 1px solid #6c4d3f;
	border-bottom: 1px solid rgba(#d3d3d3, 0, 0, 0.5); */
  background-color: #6c4d3f;

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
const Title = styled.span`
  padding: 1rem 0px;
  /* border-top: 1px solid #6c4d3f; */
  /* border-bottom: 1px solid rgba(#d3d3d3, 0, 0, 0.5); */
  border-top: 4px solid #6c4d3f;
  border-bottom: 4px solid transparent;
  ${(props) =>
    props.menu === 6 &&
    css`
      background-color: white;
      color: #6c4d3f;
      border-color: white;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      border-radius: 25px;
    `}
  ${(props) =>
    props.menu !== 6 &&
    props.selected &&
    css`
      border-top: 4px solid #6c4d3f;
      border-bottom: 4px solid #d3d3d3;
      transition: all 0.1s ease-out;
    `};
`;

const Menu = ({ title, menu, current, empty, setFocusedMenu }) => {
  return (
    <MenuButton
      selected={current === menu}
      menu={menu}
      // to={url}
      onFocus={() => setFocusedMenu(menu)}
      empty={empty}>
      <Title current={current} menu={menu}>
        {title}
      </Title>
    </MenuButton>
  );
};

export default Menu;
