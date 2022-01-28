import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import ContentLayout from "components/Layout/ContentLayout";
import CircularProgress from "@mui/material/CircularProgress";
import PageLayout from "components/Layout/PageLayout";
import Subtitle from "components/Subtitle";
import { useSelector, useDispatch } from "react-redux";
import { setRefreshVoice } from "reducers/common";

const VoiceDetailBlock = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [voice, setVoice] = useState({});
  const currentEmail = useSelector((state) => state.setting.currentEmail);
  const currentPassword = useSelector((state) => state.setting.currentPassword);
  const refresh_voice = useSelector((state) => state.common.refresh_voice);

  useEffect(() => {
    axios
      .post(
        "/api/voice/" + match.params.id,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        // console.log(Response);
        setVoice(Response.data);
        setLoading(true);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  const deleteVoice = async () => {
    if (currentEmail === "master") {
      await axios
        .post(
          "/api/voice/deletecheck/" + match.params.id,
          {
            key: process.env.REACT_APP_API_KEY,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          alert("삭제되었습니다.");
          if (refresh_voice === "delete") {
            dispatch(setRefreshVoice("redelete"));
          } else {
            dispatch(setRefreshVoice("delete"));
          }
          history.push("/manager/voice/all");
          document.getElementById("scrollRef").scrollTo(0, 0);
        })
        .catch((response) => {
          console.log("Error!");
        });
    } else {
      alert("권한이 없습니다.");
    }
  };

  return loading ? (
    <>
      <PageLayout>
        <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
          <div class='w-full flex flex-row justify-between items-center mb-4'>
            <div class='inline-flex w-full mb-6'>
              <Subtitle subtitle={"자세히보기"} />
            </div>
          </div>
          <div class='flex flex-col w-full h-full border-t-2 border-b-2 border-hansupBrown mb-8 '>
            <div class='min-h-full lg:min-h-14 h-auto py-4 flex flex-col lg:flex-row px-4 lg:px-8 border-b-2 border-gray-200 jutsify-start lg:justify-between items-start lg:items-center'>
              <div class='flex-1 pr-4 mb-4 lg:mb-0 font-bold '>
                <p class='w-full break-all'>{voice.title}</p>
              </div>
              <div class='w-full lg:w-36'>
                {voice.createdAt &&
                  voice.createdAt.substr(2, 8).replace(/[-]/g, ".")}
              </div>
            </div>

            <div
              class={
                "w-full h-96 py-8 px-4 lg:px-8 border-t overflow-y-auto border-gray-300 "
              }>
              <p class='w-full break-all'>{voice.content}</p>
            </div>
            <div class='min-h-full lg:min-h-14 h-auto py-4 flex flex-col lg:flex-row px-4 lg:px-8 border-t-2 border-gray-200 jutsify-start lg:justify-between items-start lg:items-center'>
              <div class='flex-1 pr-4 mb-4 lg:mb-0 font-bold '>
                <p class='w-full break-all'>
                  <span class='hidden sm:inline-block mr-2'>연락처 : </span>
                  {voice.phone}
                </p>
              </div>
              {/* <div class="w-1/2 font-bold">
								<span class="hidden sm:inline-block mr-2">이메일 : </span>
								{voice.email}
							</div> */}
            </div>
          </div>
          <div class='flex justify-between items-center flex-col md:flex-row'>
            <Link
              class='mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
              to={"/manager/voice/all"}
              onClick={() => window.scrollTo(0, 0)}>
              뒤로 가기
            </Link>
            <button
              class='mb-4 md:mb-0 w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
              onClick={deleteVoice}>
              삭제하기
            </button>
          </div>
        </div>
      </PageLayout>
    </>
  ) : (
    <>
      <PageLayout>
        <div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
          <div class='w-full flex flex-row justify-between items-center mb-4'>
            <div class='inline-flex w-full mb-6'>
              <Subtitle subtitle={"자세히보기"} />
            </div>
          </div>
          <div class='flex flex-col w-full h-full border-t-2 border-b-2 border-hansupBrown mb-8 '>
            <div class='min-h-full lg:min-h-14 h-auto py-4 flex flex-col lg:flex-row px-4 lg:px-8 border-b-2 border-gray-200 jutsify-start lg:justify-between items-start lg:items-center'>
              <div class='flex-1 pr-4 mb-4 lg:mb-0 font-bold '>
                <p class='w-full break-all'>
                  <Skeleton animation='wave' height={35} />
                </p>
              </div>
              <div class='w-full lg:w-36'>
                <Skeleton animation='wave' height={35} />
              </div>
            </div>

            <div
              class={
                "w-full h-96 py-8 px-4 lg:px-8 border-t overflow-y-auto border-gray-300 "
              }>
              <p class='w-full break-all'>
                <Skeleton animation='wave' height={35} />
              </p>
            </div>
          </div>
          <div class='flex justify-between items-center flex-col md:flex-row'>
            <Link
              class='mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
              to={"/manager/voice/all"}
              onClick={() => window.scrollTo(0, 0)}>
              뒤로 가기
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default VoiceDetailBlock;
