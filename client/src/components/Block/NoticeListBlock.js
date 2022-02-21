import NoticeBlock from "components/Block/NoticeBlock";
import React from "react";
import { useHistory } from "react-router-dom";

const NoticeListBlock = ({ noticeList }) => {
  const history = useHistory();

  return (
    <div class='flex flex-col w-full h-full'>
      <div class='text-base md:text-lg h-14 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center'>
        <div class='flex-1'>제목</div>
        <div class='w-12 md:w-24'>날짜</div>
        <div class='w-12 md:w-24 text-right md:text-center'>조회</div>
      </div>
      {noticeList.map((element, index) => {
        return <NoticeBlock notice={element} key={element} />;
      })}
    </div>
  );
};

export default NoticeListBlock;
