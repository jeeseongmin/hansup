import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import HansupImg from "image/hansup-img.png";
import DefaultButton2 from "components/Button/DefaultButton2";
import useTitle from "hooks/useTitle";

const Hansup = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 협력기업 - 한숲맛이야기"), 1000);

  const goPage = () => {};

  const errorAlert = () => {
    alert("홈페이지 개발중입니다.");
  };
  return (
    <PageLayout>
      <ContentLayout subtitle={"한숲맛이야기"}>
        <div id='main' class='flex h-full md:h-72 flex-col md:flex-row'>
          <div class='w-full md:w-auto h-full mr-4 flex justify-center items-center'>
            <img
              src={HansupImg}
              class='w-96 h-72 object-cover '
              alt='한숲맛이야기(사랑이 넘치는 손맛)'
            />
          </div>
          <div class='w-full md:flex-1 flex flex-col justify-between py-2 '>
            <div class='px-8 py-4 md:p-0'>
              <p class='text-xl font-bold leading-relaxed text-hansupBrown'>
                ㈜한숲맛이야기는 반찬배달 전문 기업으로, 청각장애인 고용과
                건강하고 질 좋은 반찬 제공을 위해 노력하는 사회적기업 육성가
                과정에 있는 기업입니다.
              </p>
            </div>
            <div class='mt-4 md:mt-0 px-8 md:px-0 w-full h-12'>
              <DefaultButton2 text={"자세히 보기"} event={errorAlert} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default Hansup;
