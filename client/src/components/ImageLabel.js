import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import labelCover from "image/labelCover.png";
import { BsArrowRight } from "react-icons/bs";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 0%;
  height: 100%;
  margin-bottom: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #6c4d3f;
  opacity: 1;
  z-index: 50;
  transition: all ease 1s 0s;

  ${(props) => {
    if (props.isHover) {
      return css`
        width: 100%;
        transition: all ease 1s 0s;
        z-index: 40;
      `;
    }
  }}

  // 기본 사이즈
	@media screen and (max-width: 1200px) {
  }
  //
  @media screen and (max-width: 768px) {
  }
  // 모바일 iPhone
  @media screen and (max-width: 480px) {
  }
`;
const ImageLabel = ({ imgUrl, text, url }) => {
  const history = useHistory();
  const [isHover, setIsHover] = useState(false);

  const onMouseOver = () => {
    console.log("onMouseOver", url);
    setIsHover(true);
  };
  const onMouseOut = () => {
    console.log("onMouseOut", url);
    setIsHover(false);
  };

  // const goPage = (e) => {
  // 	document.getElementById("scrollRef").scrollTo(0, 0);
  // 	history.push(url);
  // };
  return (
    <Link
      to={url}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => document.getElementById("scrollRef").scrollTo(0, 0)}
      class='w-full h-16 lg:h-20 mb-6 cursor-pointer relative flex justify-between items-center px-8 text-white'>
      <Container isHover={isHover} />
      <img
        src={labelCover}
        class='z-40 h-full w-full object-cover absolute left-0 top-0'
        alt=''
      />
      <img
        src={imgUrl}
        class='z-30 h-full w-full object-cover absolute left-0 top-0'
        alt={text}
      />
      <div class='z-50 font-bold text-xl'>{text}</div>
      <div class='z-50 hidden lg:block'>
        <BsArrowRight size={48} />
      </div>
      <div class='z-50 block lg:hidden'>
        <BsArrowRight size={36} />
      </div>
    </Link>
  );
};

export default ImageLabel;
