import VoiceFormBlock from "components/Block/VoiceFormBlock";
import DefaultButton from "components/Button/DefaultButton";
import ContentLayout from "components/Layout/ContentLayout";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setRefreshVoice } from "reducers/common";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "hooks/useTitle";

const CreateVoice = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(
    () => updateTitle("한숲푸드 - 커뮤니티 - 고객의 소리 - 작성하기"),
    1000
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const contentRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef1 = useRef(null);
  const emailRef2 = useRef(null);
  const refresh_voice = useSelector((state) => state.common.refresh_voice);

  const goPage = () => {
    history.push("/community/voice/create");
  };

  const [info, setInfo] = useState({
    status: "unread",
    title: "",
    content: "",
    name: "",
    phone: "",
    email1: "",
    email2: "",
  });

  const changeInfo = (e, type) => {
    const cp = { ...info };
    cp[type] = e.target.value;
    setInfo(cp);
  };

  const submit = () => {
    if (info.title === "") {
      alert("제목을 입력해주세요!");
      titleRef.current.focus();
    } else if (info.content === "") {
      alert("내용을 입력해주세요!");
      contentRef.current.focus();
    } else if (info.name === "") {
      alert("이름을 입력해주세요!");
      nameRef.current.focus();
    } else if (info.phone !== "") {
      alert("휴대폰 번호를 입력해주세요.");
      phoneRef.current.focus();
    } else if (!info.phone.includes("-")) {
      alert("휴대폰 번호는 -로 구분해주세요.");
      phoneRef.current.focus();
    } else {
      axios
        .post(
          "/api/voice/create",
          {
            key: process.env.REACT_APP_API_KEY,
            status: info.status,
            title: info.title,
            name: info.name,
            content: info.content,
            phone: info.phone,
            email: "",
          },
          {
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          alert("업로드 되었습니다.");
          history.push("/community/voice/main");
          if (refresh_voice === "create") {
            dispatch(setRefreshVoice("recreate"));
          } else {
            dispatch(setRefreshVoice("create"));
          }
          document.getElementById("scrollRef").scrollTo(0, 0);
        })
        .catch((response) => {
          console.log("Error!");
        });
    }
  };
  return (
    <ContentLayout subtitle={"고객의 소리 작성하기"}>
      <p id="main" class="font-bold text-sm lg:text-lg mb-4">
        고객의 소리는 여러분의 고충과 피드백, 조언을 담아내는 공간입니다. 지나친
        인신 공격과 비방은 삼가주시면 감사하겠습니다.
      </p>
      <div class="h-full w-full flex flex-col justify-center items-center py-8 border-t-2 border-b-2 border-hansupBrown mb-4">
        <VoiceFormBlock
          info={info}
          changeInfo={changeInfo}
          titleRef={titleRef}
          nameRef={nameRef}
          contentRef={contentRef}
          phoneRef={phoneRef}
          isEdit={false}
        />
      </div>
      <div class="w-full h-12 flex flex-row justify-end">
        <div class="w-36 h-full">
          <DefaultButton text={"작성완료"} event={submit} />
        </div>
      </div>
    </ContentLayout>
  );
};

export default CreateVoice;
