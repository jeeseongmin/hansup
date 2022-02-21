import Description from "components/Description";
import Subtitle from "components/Subtitle";
import CateringIntro from "image/catering-intro.png";
import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import BoxSliderBlock from "components/Block/BoxSliderBlock";
import useTitle from "hooks/useTitle";
const Box = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲 - 도시락"), 1000);

  return (
    <PageLayout>
      <button id='shortcut' title=''></button>
      <ContentLayout subtitle={"한숲 도시락"}>
        <div class='flex w-full h-auto flex-col items-center mb-4 '>
          <Description>
            <div class='py-6 px-4 font-bold flex justify-center items-center text-base lg:text-lg'>
              한숲 도시락은 대상 맞춤형 음식들을 풍성하게 담아 합리적인 가격으로
              제공됩니다.
            </div>
          </Description>

          <div class='w-full px-16 lg:px-72 my-16 h-96'>
            <BoxSliderBlock type={"box"} />
          </div>
        </div>
      </ContentLayout>
      <ContentLayout subtitle={"도시락 문의"}>
        <p class='text-hansupBrown mb-4'>
          도시락 상담 및 문의는 전화 혹은 문자로 받고 있습니다.
        </p>
        <p class='text-hansupBrown mb-4'>
          관심 있으신 분들은 아래의 번호로 연락주세요!
        </p>
        <div class='w-full h-auto grid grid-cols-1 md:grid-cols-2 items-center mb-4 gap-4'>
          <Description>
            <div class='py-6 px-4 font-bold flex justify-center items-center text-base lg:text-lg'>
              010-4388-2241
            </div>
          </Description>
          <Description>
            <div class='py-6 px-4 font-bold flex justify-center items-center text-base lg:text-lg'>
              054-231-0102
            </div>
          </Description>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default Box;
