import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import HistoryImg from "image/intro-history-img1.png";
import useTitle from "hooks/useTitle";
const History = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 한숲의 역사"), 1000);

  return (
    <PageLayout>
      <ContentLayout subtitle={"한숲의 역사"}>
        <button id='shortcut' title=''></button>

        <div class='flex flex-row'>
          <div class='w-full lg:w-2/3'>
            <img
              src={HistoryImg}
              alt='2020년 : 1. 한숲푸드 사회적 기업 육성가 선정, 2. (주) 한숲푸드 설립, 3. 수화식당(사이닝 레스토랑) 개업, 4. 삼성열린나눔 우수 공모 선정, 5. 한국장애인고용공단 청각장애인 고용증진에 관한 업무협약서 체결, 6. 한숲푸드 예비 사회적 기업 지정. 2021년 : 1. 창포종합사회복지관 MOU 체결, 2. 협력기업 (주) 한숲맛이야기 설립'
            />
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default History;
