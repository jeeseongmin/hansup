import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import NoticeListBlock from "components/Block/NoticeListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Paging from "components/Paging";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "hooks/useTitle";
const NoticeList = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 커뮤니티 - 공지사항"), 1000);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [noticeList, setNoticeList] = useState([]);

  const loginToken = useSelector((state) => state.setting.loginToken);
  const currentEmail = useSelector((state) => state.setting.currentEmail);
  const currentPassword = useSelector((state) => state.setting.currentPassword);

  useEffect(() => {
    axios
      .post(
        "/api/notice/page/" + page,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setNoticeList(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [page]);

  useEffect(() => {
    axios
      .post(
        "/api/notice",
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        setTotalPage(Math.ceil(Response.data.length / 10));
        setLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [noticeList]);

  return (
    <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
      <div class='h-full w-full flex flex-row justify-between items-center mb-8'>
        <div id='main' class='inline-flex w-auto'>
          <Subtitle subtitle={"공지사항"} />
        </div>
        {loginToken === "login" && (
          <Link
            to='/community/notice/create'
            class='h-full w-32 text-hansupBrown text-lg flex flex-row justify-end items-center'>
            <p class='mr-2'>작성하기</p> <VscArrowRight size={24} />
          </Link>
        )}
      </div>
      {loading ? (
        noticeList.length === 0 ? (
          <div class='w-full h-24 flex justify-center items-center'>
            <p>공지사항이 없습니다.</p>
          </div>
        ) : (
          <NoticeListBlock noticeList={noticeList} />
        )
      ) : (
        <div class='w-full h-24 flex justify-center items-center'>
          <CircularProgress />
        </div>
      )}

      <div class='w-full mt-8'>
        <Paging setPage={setPage} page={page} total={totalPage} />
      </div>
    </div>
    // <ContentLayout subtitle={"공지사항"}>
    // 	<div class="flex flex-row">
    // 		<NoticeListBlock />
    // 	</div>
    // </ContentLayout>
  );
};

export default NoticeList;
