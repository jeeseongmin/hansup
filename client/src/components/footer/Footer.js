import React from "react";
import styled, { css } from "styled-components";
import Logo from "image/logo.png";
import { useHistory } from "react-router-dom";

const Foot = styled.div`
  width: 100%;
  height: auto;
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
    window.scrollTo(0, 0);
    document.getElementById("scrollRef").scrollTo(0, 0);
  };

  return (
    <Foot>
      {/* FootLayout */}
      <div
        class='w-full h-full bg-hansupBrown px-8 xl:px-24 py-8 hidden md:flex flex-row text-white '
        title='footer'>
        {/* FootContainer */}
        <div class='w-1/2 h-auto flex flex-col justify-between'>
          {/* FootLogoBox */}
          <button onClick={goHome} class='cursor-pointer h-8 mb-8'>
            {/* FootLogo */}
            <img src={Logo} class='h-full object-cover' alt='한숲푸드' />
          </button>
          {/* FootTextBox */}
          <div class='w-full flex flex-row mb-1'>
            {/* FootText */}
            <div class='w-40'>회사주소</div>
            {/* FootContent */}
            <div class='flex-1'>
              <span class='mx-4'>|</span> 포항시 북구 불종로 67-4(여천동), 1층
            </div>
          </div>
          {/* FootTextBox */}
          <div class='w-full flex flex-row mb-1'>
            {/* FootText */}
            <div class='w-40'>대표 전화번호</div>
            {/* FootContent */}
            <div class='flex-1'>
              <span class='mx-4'>|</span> 010-4388-2241
            </div>
          </div>
          {/* FootTextBox */}
          <div class='w-full flex flex-row mb-1'>
            {/* FootText */}
            <div class='w-40'>사업자등록번호</div>
            {/* Footcontent */}
            <div class='flex-1'>
              <span class='mx-4'>|</span> 767-81-01697
            </div>
          </div>
          {/* FootTextBox */}
          <div class='w-full flex flex-row mb-1'>
            {/* FootText */}
            <div class='w-40'>팩스번호</div>
            {/* FootContent */}
            <div class='flex-1'>
              <span class='mx-4'>|</span> 054-610-2241
            </div>
          </div>
        </div>
        {/* copyrightLayout */}
        <div class='w-1/2 flex flex-col justify-end items-end'>
          {/* copyrightText */}
          <div class='w-full flex flex-row justify-end mb-1'>
            <div>copyright (c) 2021 한숲푸드</div>
          </div>
          {/* copyrightText */}
          <div class='w-full flex flex-row justify-end mb-1'>
            <div>all rights reserved.</div>
          </div>
        </div>
      </div>
      {/* responsiveFootLayout */}
      <div class='w-full h-full text-sm bg-hansupBrown px-8 xl:px-24 py-8 flex md:hidden flex-row items-center text-white '>
        {/* responsiveFootContainer */}
        <div class='w-full h-auto flex flex-row justify-between items-center'>
          {/* responsiveFootLogoBox */}
          <button onClick={goHome} class='w-1/4 cursor-pointer '>
            {/* responsiveFootLogo */}
            <img src={Logo} class='h-full object-cover' alt='logo' />
          </button>
          {/* responsiveFootTextBox */}
          <div class='w-1/2 flex flex-col'>
            {/* respoinsiveFootText */}
            <div class='w-full flex flex-row'>
              포항시 북구 불종로 67-4(여천동), 1층
            </div>
            {/* respoinsiveFootText */}
            <div class='w-full flex flex-row'>Tel. 010-4388-2241</div>
          </div>
        </div>
      </div>
    </Foot>
  );
};

export default Footer;
