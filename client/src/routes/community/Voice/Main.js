import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import ReviewListBlock from "components/Block/ReviewListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import CreateVoice from "routes/community/Voice/CreateVoice";
import DefaultButton from "components/Button/DefaultButton";
import useTitle from "hooks/useTitle";

const Main = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 커뮤니티 - 고객의 소리"), 1000);

  const history = useHistory();

  const goPage = () => {
    history.push("/community/voice/create");
  };
  return (
    <ContentLayout subtitle={"고객의 소리"}>
      <div
        id='main'
        class='h-full w-full flex flex-col justify-center items-center'>
        <div class='w-full h-48 flex justify-center items-center border-b border-hansupBrown mb-8'>
          <p class='text-center font-bold text-lg mb-12 leading-loose'>
            칭찬, 불만, 건의사항 등이 있으시면<br></br>언제든지 말씀
            부탁드립니다.
          </p>
        </div>
        <div class='w-2/3 md:w-1/2 lg:w-1/4 h-12'>
          <DefaultButton text={"작성하기"} event={goPage} />
        </div>
      </div>
    </ContentLayout>
  );
};

export default Main;
