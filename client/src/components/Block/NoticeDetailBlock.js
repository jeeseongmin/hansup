import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import ContentLayout from "components/Layout/ContentLayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import EditNotice from "routes/community/Notice/EditNotice";

const NoticeDetailBlock = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [notice, setNotice] = useState({});
  const currentEmail = useSelector((state) => state.setting.currentEmail);
  const currentPassword = useSelector((state) => state.setting.currentPassword);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNotice = async () => {
    if (currentEmail === "master") {
      await notice.fileList.forEach(async function (item, index) {
        await axios.get("/api/file/delete/" + item.filename);
      });

      await axios
        .post(
          "/api/notice/delete/" + match.params.id,
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
          history.push("/community/notice/list");
          document.getElementById("scrollRef").scrollTo(0, 0);
        })
        .catch((response) => {
          console.log("Error!");
        });
    } else {
      alert("권한이 없습니다.");
    }
  };

  useEffect(() => {
    axios
      .post(
        "/api/notice/" + match.params.id,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        const _text = Response.data.content.replace(/<p><\/p>/gi, "</br>");
        const cp = {
          type: Response.data.type,
          title: Response.data.title,
          // content: Response.data.content,
          content: _text,
          fileList: Response.data.fileList,
          read: Response.data.read,
          date: dataToText(Response.data.createdAt),
        };
        // console.log(Response);
        setNotice(cp);
        setLoading(true);
        setTimeout(function () {
          setImgLoading(true);
        }, 1000);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  const dataToText = (date) => {
    let year = date.substring(2, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    return year + "." + month + "." + day;
  };

  return loading ? (
    <>
      {!isEdit ? (
        <ContentLayout subtitle={"자세히보기"}>
          <div
            id='main'
            class='flex flex-col w-full h-full border-t-2 border-b-2 border-hansupBrown mb-8 '>
            <div class='w-full px-2 lg:px-8 py-4 flex justify-end items-center relative'>
              {!loading ? (
                <Skeleton animation='wave' />
              ) : (
                <>
                  <div class='w-full relative pr-24'>
                    <p class='w-full h-full break-words text-lg font-bold'>
                      {notice.title}
                    </p>
                  </div>
                  <div class='absolute right-0 text-base w-24 '>
                    {notice.date}
                  </div>
                </>
              )}
            </div>
            <div class='w-full px-2 lg:px-8 py-4 flex justify-end items-center relative border-t border-gray-300'>
              {!loading ? (
                <Skeleton animation='wave' />
              ) : (
                <>
                  <div class='w-full relative pr-24'>
                    <p class='w-full h-full break-words text-md invisible '>
                      Read {notice.read}
                    </p>
                    {/* <div class="text-lg w-auto border border-black pr-4 relative">
										</div> */}
                  </div>
                  <div class='absolute right-0 text-md w-24'>
                    <span class='text-hansupBrown font-bold mr-2'>조회</span>{" "}
                    {notice.read}
                  </div>
                </>
              )}
            </div>
            <div
              class={
                "w-full border-t border-b border-gray-300 px-4 py-4 flex flex-wrap flex-col items-center " +
                (loading ? "text-center" : "")
              }>
              {notice.fileList.length === 0 && loading ? (
                <div class='text-gray-500'>업로드된 파일이 없습니다.</div>
              ) : loading ? (
                notice.fileList.map((element, index) => {
                  return (
                    <div class='w-auto mb-4 rounded-md relative'>
                      <span class='mr-2 text-blue-600 font-bold'>
                        첨부 #{index + 1}
                      </span>
                      <a
                        class='hover:text-blue-500 '
                        href={
                          window.location.origin +
                          "/uploads/" +
                          element.filename
                        }
                        target='_blank'
                        download>
                        {element.filename}{" "}
                        <span class='text-sm text-gray-300'>(</span>
                        <span class='text-sm text-blue-300'>
                          {element.size.toString()}
                          {/* {element.size
														.toString()
														.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
                        </span>{" "}
                        <span class='text-red-500 text-sm'>bytes</span>
                        <span class='text-sm text-gray-300'>) </span>
                      </a>
                    </div>
                  );
                })
              ) : (
                <div class='w-full h-24 my-2 py-4 flex justify-center items-center text-center'>
                  <CircularProgress />
                </div>
              )}
            </div>
            <div class='w-full h-auto relative py-4 px-2 lg:px-8'>
              <div
                class='mb-24'
                dangerouslySetInnerHTML={{ __html: notice.content }}></div>
            </div>
          </div>
          <div class='flex justify-between items-center flex-col md:flex-row'>
            <Link
              class='transition delay-50 duration-100 mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
              to={"/community/notice/list"}
              onClick={() => document.body.scrollIntoView(true)}>
              뒤로 가기
            </Link>
            {loading && currentEmail === "master" ? (
              <div class='w-full md:w-auto flex flex-col md:flex-row'>
                <button
                  onClick={deleteNotice}
                  class='transition delay-50 duration-100 w-full md:w-auto my-4 md:my-0 justify-center mr-4 cursor-pointer px-16 py-2 border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'>
                  삭제하기
                </button>
                <button
                  onClick={() => setIsEdit(true)}
                  class='transition delay-50 duration-100 w-full md:w-auto justify-center cursor-pointer px-16 py-2 border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'>
                  수정하기
                </button>
              </div>
            ) : null}
          </div>
        </ContentLayout>
      ) : (
        <EditNotice id={match.params.id} info={notice} />
      )}
    </>
  ) : (
    <>
      <ContentLayout subtitle={"자세히보기"}>
        <div class='flex flex-col w-full h-full border-t-2 border-b-2 border-hansupBrown mb-8'>
          <div class='min-h-14 h-auto py-4 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center'>
            <div class='flex-1 pr-4 '>
              <Skeleton animation='wave' height={35} />
            </div>
            <div class='w-36'>
              <Skeleton animation='wave' height={35} />
            </div>
          </div>

          <div class='w-full py-8 h-96 px-8 border-b-2 border-gray-200'>
            <Skeleton animation='wave' height={35} />
          </div>
        </div>
        <div class='flex justify-between items-center flex-col md:flex-row'>
          <Link
            class='mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold'
            to={"/community/notice/list"}
            onClick={() => window.scrollTo(0, 0)}>
            뒤로 가기
          </Link>
          {/* <Button
							onClick={submit}
							class=" w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
						>
							제출하기
						</Button> */}
        </div>
      </ContentLayout>
    </>
  );
};

export default NoticeDetailBlock;
