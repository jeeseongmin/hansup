import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

const SubmenuBtn = styled.button`
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

const SubmenuButton = ({ text, current }) => {
  const history = useHistory();
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const focusRef = useRef();

  const goPage = () => {
    history.push(current);
    window.location.reload();
  };
  useEffect(() => {
    if (location.pathname.includes("voice") && current.includes("voice"))
      setSelected(true);
    else if (location.pathname.includes("notice") && current.includes("notice"))
      setSelected(true);
    else if (location.pathname.includes("review") && current.includes("review"))
      setSelected(true);
    else if (
      location.pathname.includes("/order/catering/order") &&
      (current.includes("orderMain") ||
        current.includes("orderCheck") ||
        current.includes("ordering"))
    ) {
      setSelected(true);
    } else if (
      location.pathname.includes("/manager/order/create") &&
      current === "/manager/order/list/all"
    ) {
      setSelected(true);
    } else if (
      location.pathname.includes("/manager/order/update") &&
      current === "/manager/order/list/all"
    ) {
      setSelected(true);
    } else if (
      location.pathname.includes("/manager/order/list/undecided") &&
      current === "/manager/order/list/all"
    ) {
      setSelected(true);
    } else if (
      location.pathname.includes("/manager/menu/restaurant") &&
      current === "/manager/menu/catering"
    ) {
      setSelected(true);
    } else if (location.pathname === current) setSelected(true);
    else setSelected(false);
  }, [location.pathname]);

  return (
    <SubmenuBtn
      selected={selected}
      onClick={goPage}
      title={selected ? "선택됨" : ""}>
      {text}
    </SubmenuBtn>
  );
};

export default SubmenuButton;
