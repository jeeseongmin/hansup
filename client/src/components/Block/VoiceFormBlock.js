import React from "react";
import InputBox from "components/Box/InputBox";
import TextareaBox from "components/Box/TextareaBox";

const VoiceFormBlock = ({
  info,
  changeInfo,
  titleRef,
  nameRef,
  contentRef,
  phoneRef,
  isEdit,
}) => {
  return (
    <div class="w-full  flex flex-col">
      <div class="h-24 grid grid-cols-2 gap-2 mb-2">
        <div class={"flex flex-col gap-2"}>
          <label class={"font-bold"} for={"title"}>
            제목
          </label>
          <div class={"h-16"}>
            <InputBox
              value={info.title}
              label={"title"}
              type={"title"}
              placeholder={"제목"}
              title="제목"
              onChange={changeInfo}
              refName={titleRef}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-2"}>
          <label class={"font-bold"} for={"name"}>
            이름
          </label>
          <div className={"h-16"}>
            <InputBox
              value={info.name}
              type={"name"}
              placeholder={"이름"}
              title="이름"
              label={"name"}
              onChange={changeInfo}
              refName={nameRef}
            />
          </div>
        </div>
      </div>
      <label class={"font-bold mt-2 mb-2"} for={"content"}>
        내용
      </label>
      <div class="h-96 grid grid-cols-1 gap-2 mb-2">
        <TextareaBox
          value={info.content}
          type={"content"}
          placeholder={"내용"}
          label={"content"}
          title="내용"
          onChange={changeInfo}
          refName={contentRef}
        />
      </div>
      <div class="h-16 w-full flex flex-row mb-2 items-center">
        <label class="w-24 text-xl font-bold" for={"phone"}>
          연락처
        </label>
        <div class="h-full flex-1">
          <InputBox
            title="phone"
            value={info.phone}
            type={"phone"}
            label={"phone"}
            placeholder={""}
            onChange={changeInfo}
            refName={phoneRef}
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceFormBlock;
