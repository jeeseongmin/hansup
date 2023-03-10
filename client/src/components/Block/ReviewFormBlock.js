import React, { useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

const ReviewFormBlock = ({
  changeInfo,
  contentRef,
  emailRef,
  passwordRef,
  info,
  isEdit,
}) => {
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isImageUpload, setIsImageUpload] = useState(false);

  const onChange = async (e) => {
    setLoading(false);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    // 서버의 upload API 호출
    const res = await axios.post("/api/image/upload", formData);
    const cp = [...info.imgList];
    await cp.push({ filename: res.data.filename, id: res.data.id });
    await changeInfo(cp, "imgList");
    setLoading(true);
    setIsImageUpload(true);
  };
  // const deletePhoto = isEdit ? props.deletePhoto : null;
  const deletePhoto = null;

  const buttonClick = () => {
    buttonRef.current.click();
  };
  const removeImg = async (index) => {
    if (isEdit) {
      const cp = [...info.imgList];
      const name = cp[index];
      deletePhoto(name);

      cp.splice(index, 1);
      await changeInfo(cp, "imgList");
    } else {
      const cp = [...info.imgList];
      const id = cp[index].id;
      cp.splice(index, 1);
      changeInfo(cp, "imgList");

      await axios.get("/api/image/delete/" + id);
    }

    if (info.imgList.length === 0) {
      setIsImageUpload(false);
    }
  };

  return (
    <div class="w-full h-auto mb-4">
      {/* 딱 10개 씩만 로드하기 */}
      <input
        title="이미지"
        ref={buttonRef}
        type="file"
        class="hidden"
        name="img"
        onChange={onChange}
      />
      <div class="w-full my-4 flex flex-row justify-between items-center">
        <h1 class="text-lg font-bold">업로드 된 이미지 목록</h1>
        <button
          class="text-sm w-24 md:w-auto cursor-pointer px-0 md:px-8 py-1 justify-center border border-hansupBrown bg-hansupBrown text-white flex flex-row items-center hover:opacity-60 hover:text-white hover:font-bold"
          onClick={buttonClick}
        >
          이미지 업로드
        </button>
      </div>
      <div
        class={
          "w-full border-2 border-gray-300 px-4 py-4 mb-2 flex flex-wrap " +
          (loading ? "text-center" : "")
        }
      >
        {info.imgList.length === 0 && loading ? (
          <div class="text-gray-500">업로드된 이미지가 없습니다.</div>
        ) : loading ? (
          info.imgList.map((element, index) => {
            return (
              <button
                title={index + "번째 파일 삭제"}
                onClick={() => removeImg(index)}
                class="w-24 mb-4 border border-gray-300 rounded-md relative mx-4"
              >
                <img
                  class="w-full h-24 object-contain"
                  src={
                    window.location.origin +
                    "/api/image/view/" +
                    element.filename
                  }
                  alt={"리뷰 음식 사진 " + (index + 1)}
                />
                <MdCancel
                  // onClick={() => removeImg(index)}
                  size={24}
                  class="cursor-pointer rounded-full bg-white absolute -top-2 -right-2"
                />
              </button>
            );
          })
        ) : (
          <div class="w-full h-24 my-2 py-4 flex justify-center items-center text-center">
            <CircularProgress />
          </div>
        )}
      </div>
      <h1 class="text-lg font-bold pt-4">이미지 업로드 후 입력 가능합니다.</h1>
      <div class={"mt-4 font-bold"}>
        <label for={"content"}>내용</label>
      </div>
      <div class="cursor-pointer w-full pt-2 pb-0 flex justify-end items-center">
        <textarea
          title="음식 리뷰 내용"
          ref={contentRef}
          id={"content"}
          class="w-full h-24 p-4 border-2 border-gray-300 focus:border-hansupBrown resize-none	"
          onChange={(e) => changeInfo(e, "content")}
          value={info.content}
          placeholder="내용"
          disabled={!isImageUpload}
        ></textarea>
      </div>
      <div class="w-full pt-4 pb-2 mb-2 grid grid-cols-2 gap-2">
        <div class={""}>
          <div className={"mb-4 font-bold"}>
            <label for={"email"}>작성자 이메일</label>
          </div>
          <input
            // ref={titleRef}
            title="작성자 이메일"
            ref={emailRef}
            type="text"
            id={"email"}
            className="w-full p-4 border-2 border-gray-300 focus:border-hansupBrown"
            onChange={(e) => changeInfo(e, "email")}
            value={info.email}
            placeholder="작성자 이메일"
            disabled={!isImageUpload}
          />
        </div>
        <div>
          <div className={"mb-4 font-bold"}>
            <label for={"password"}>작성자 패스워드</label>
          </div>

          <input
            // ref={titleRef}
            ref={passwordRef}
            title="패스워드"
            type="text"
            id={"password"}
            className="w-full p-4 border-2 border-gray-300 focus:border-hansupBrown"
            onChange={(e) => changeInfo(e, "password")}
            value={info.password}
            placeholder="패스워드"
            disabled={!isImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewFormBlock;
