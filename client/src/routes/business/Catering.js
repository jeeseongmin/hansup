import Description from "components/Description";
import ImageLabel from "components/ImageLabel";
import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import BoxSliderBlock from "components/Block/BoxSliderBlock";

import catering1 from "image/boxslider-catering1.jpg";
import catering2 from "image/boxslider-catering2.jpg";
import useTitle from "hooks/useTitle";

const Catering = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 한숲사업 - 케이터링"), 1000);

  return (
    <PageLayout main={true}>
      <ContentLayout subtitle={"케이터링"}>
        <div class="flex w-full h-auto lg:h-auto flex-col items-center mb-4 ">
          <div class="w-full px-16 lg:px-24 my-16 h-96">
            <BoxSliderBlock type={"catering"} />
          </div>
          <Description>
            <div class="p-8 h-1/2 text-md lg:text-lg mb-4 lg:mb-0 text-center">
              여러 행사에 빠질 수 없는 음식!
              <br></br>
              <br></br>한숲푸드는 행사, 기념일에 고객님께서 더 풍성하고 행복하게
              보내도록 맛난 케이터링 서비스를 제공합니다!<br></br>
              <br></br>
              한숲의 케이터링 서비스는 원하시는 날짜, 시간, 인원 수에 맞춰
              케이터링 박스에 정성이 담긴 15가지 메뉴를 담아 제공합니다.
            </div>
          </Description>
        </div>
      </ContentLayout>

      <div class="px-8 lg:px-40 w-full flex flex-col">
        <ImageLabel
          text={"케이터링 메뉴"}
          imgUrl={catering1}
          url={"/order/catering/menu"}
        />
        <ImageLabel
          text={"케이터링 안내"}
          imgUrl={catering2}
          url={"/order/catering/intro"}
        />
        {/*<ImageLabel*/}
        {/*  text={"케이터링 주문"}*/}
        {/*  imgUrl={catering3}*/}
        {/*  url={"/order/catering/ordering"}*/}
        {/*/>*/}
      </div>
    </PageLayout>
  );
};

export default Catering;
