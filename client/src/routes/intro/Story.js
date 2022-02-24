import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import StoryImg1 from "image/intro-story-img1.jpg";
import StoryImg2 from "image/intro-story-img2.jpg";
import StoryImg3 from "image/intro-story-img3.jpg";
import Description from "components/Description";
import useTitle from "hooks/useTitle";
const Story = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 회사소개 - 한숲의 이야기"), 1000);

  return (
    <>
      <PageLayout>
        <ContentLayout subtitle={"한숲 스토리"}>
          <button id='shortcut' title=''></button>
          <div class='flex flex-col'>
            {/* 반응형 & 원본 */}
            <div class='w-full h-auto flex lg:hidden flex-col mb-16'>
              <div class='h-72 w-full mb-4'>
                <img
                  src={StoryImg1}
                  class='w-full h-full object-cover'
                  alt='농아인과 청인이 대화하는 사진 1'
                />
              </div>
              <div class='w-full h-full text-md leading-loose text-justify'>
                <span class='mr-2'></span>
                우리 중에는 선천적으로 청각장애인도 있으며, 후천적으로 청각장애를 갖게 된 이들도 있습니다. 선천이든 후천이든 우리 모두 즐겁게 일하는 법을 압니다. 식자재를 받아 준비하고, 손님을 맞이하며, 서빙을 하고, 설거지합니다. 
                <br></br>
                <br></br> <span class='mr-2'></span>
                때론 출장 뷔페로 온종일 바삐 움직여 땀범벅이 되곤 합니다. 땀을 흘리고 움직일 직장이 있다는 것은 참으로 행복한 일입니다. 
                <b>
                  비장애인들과 함께 소통하고 웃고, 우리가 만든 맛있는 음식을 함께 나눌 수 있다는 것, 사회인으로 우리가 한 역할을 맡을 수 있다는 것, 이것만으로도 우린 즐겁습니다.
                </b>
              </div>
            </div>
            <div class='w-full h-auto hidden lg:grid grid-cols-2 gap-8 mb-16'>
              <div class='h-full text-lg leading-loose text-justify'>
                <span class='mr-2'></span>
                우리 중에는 선천적으로 청각장애인도 있으며, 후천적으로 청각장애를 갖게 된 이들도 있습니다. 선천이든 후천이든 우리 모두 즐겁게 일하는 법을 압니다. 식자재를 받아 준비하고, 손님을 맞이하며, 서빙을 하고, 설거지합니다. 
                <br></br>
                <br></br> <span class='mr-2'></span>
                때론 출장 뷔페로 온종일 바삐 움직여 땀범벅이 되곤 합니다. 땀을 흘리고 움직일 직장이 있다는 것은 참으로 행복한 일입니다. 
                <b>
                  비장애인들과 함께 소통하고 웃고, 우리가 만든 맛있는 음식을 함께 나눌 수 있다는 것, 사회인으로 우리가 한 역할을 맡을 수 있다는 것, 이것만으로도 우린 즐겁습니다.
                </b>
              </div>
              <div class='h-full w-full'>
                <img
                  src={StoryImg1}
                  class='h-full object-cover'
                  alt='농아인과 청인이 대화하는 사진 1'
                />
              </div>
            </div>
            {/* 반응형 & 원본 */}

            <div class='w-full h-auto flex lg:hidden flex-col mb-16'>
              <div class='h-72 w-full mb-4'>
                <img
                  src={StoryImg2}
                  class='w-full h-full object-cover'
                  alt='여자가 활짝 웃고있는 사진'
                />
              </div>
              <div class='w-full h-full text-md leading-loose text-justify'>
                <span class='mr-2'></span>
                하지만 처음부터 즐겁게 일했던 것은 아닙니다. 청각장애인은 소리를 듣지 못합니다. 듣지를 못하니 자연스레 말도 못 합니다. 
                <br></br>
                <br></br>
                <b>
                  <span class='mr-2'></span>
                  사회생활에서 중요한 의사소통의 제한은 고용 진입과 유지에 큰 장벽이 되고 있습니다. 우리 역시도 잦은 이직을 경험했고, 건청인과의 의사소통 지원체계의 부재는 오로지 우리들의 개인적 스트레스와 책임으로 돌아갔습니다.
                </b>
                 우리가 가진 장점을 펼치기도 전에 차단될 때가 더욱 많았습니다.
              </div>
            </div>
            <div class='w-full h-auto hidden lg:grid grid-cols-2 gap-8 mb-16'>
              <div>
                <img
                  src={StoryImg2}
                  class='w-full h-full object-cover'
                  alt='여자가 활짝 웃고있는 사진'
                />
              </div>
              <div class='h-full text-lg leading-loose text-justify'>
                <span class='mr-2'></span>
                하지만 처음부터 즐겁게 일했던 것은 아닙니다. 청각장애인은 소리를 듣지 못합니다. 듣지를 못하니 자연스레 말도 못 합니다. 
                <br></br>
                <br></br>
                <b>
                  <span class='mr-2'></span>
                  사회생활에서 중요한 의사소통의 제한은 고용 진입과 유지에 큰 장벽이 되고 있습니다. 우리 역시도 잦은 이직을 경험했고, 건청인과의 의사소통 지원체계의 부재는 오로지 우리들의 개인적 스트레스와 책임으로 돌아갔습니다.
                </b>
                 우리가 가진 장점을 펼치기도 전에 차단될 때가 더욱 많았습니다.
              </div>
            </div>
            {/* 반응형 & 원본 */}

            <div class='w-full h-auto flex lg:hidden flex-col mb-16'>
              <div class='h-72 w-full mb-4'>
                <img
                  src={StoryImg3}
                  class='w-full h-full object-cover'
                  alt='농아인에게 청인이 수화로 설명하는 모습'
                />
              </div>
              <div class='h-full text-md leading-loose text-justify'>
                <span class='mr-2'></span>
                특히 청각장애인 여성들은 거의 사회생활을 경험하지 못한 채 농업 혹은 무직의 삶으로 
                <b>
                  생계에 어려움을 겪고 있고 기초수급권을 받는 것이 유일한 삶의 생계수단이 되는 실정
                </b>
                이었습니다. 그러다 보니 삶의 질 뿐만 아니라 자존감조차 낮은 문화를 이루고 있음에 안타까웠습니다.
                <br></br>
                <br></br>
                <span class='mr-2'></span>그래서 우린 
                <b>청각장애인이 운영하는 기업 '한숲푸드'</b>
                를 만들었습니다.
                여기 모인 대부분은 청각장애인이거나 청각장애인을 가족으로 두고 있는 사람들입니다.
                수어를 하는 사람들도 있으며, 수어를 하지 못하는 사람들도 있습니다.
                말하는 사람도 있으며, 듣지 못하는 사람도 있습니다.
                하지만 놀랍게도 식당은 잘 돌아갑니다.
              </div>
            </div>
            <div class='w-full h-auto hidden lg:grid grid-cols-2 gap-8 mb-16'>
              <div class='h-full text-lg leading-loose text-justify'>
                <span class='mr-2'></span>
                특히 청각장애인 여성들은 거의 사회생활을 경험하지 못한 채 농업 혹은 무직의 삶으로 
                <b>
                  생계에 어려움을 겪고 있고 기초수급권을 받는 것이 유일한 삶의 생계수단이 되는 실정
                </b>
                이었습니다. 그러다 보니 삶의 질 뿐만 아니라 자존감조차 낮은 문화를 이루고 있음에 안타까웠습니다.
                <br></br>
                <br></br>
                <span class='mr-2'></span>그래서 우린 
                <b>청각장애인이 운영하는 기업 '한숲푸드'</b>
                를 만들었습니다.
                여기 모인 대부분은 청각장애인이거나 청각장애인을 가족으로 두고 있는 사람들입니다.
                수어를 하는 사람들도 있으며, 수어를 하지 못하는 사람들도 있습니다.
                말하는 사람도 있으며, 듣지 못하는 사람도 있습니다.
                하지만 놀랍게도 식당은 잘 돌아갑니다.
              </div>
              <div>
                <img
                  src={StoryImg3}
                  class='w-full h-full object-cover'
                  alt='농아인에게 청인이 수화로 설명하는 모습'
                />
              </div>
            </div>
          </div>
        </ContentLayout>
        <div class='w-full -mt-16 mb-16'>
          <Description>
            <span class='w-full flex justify-center items-center text-center md:text-left mt-2 pt-4 pb-2 px-4 text-md lg:text-xl font-bold'>
              우리는 더 많은 청각장애인과 함께 <br class='block md:hidden'></br>
              사회와 소통하고
            </span>
            <span class='w-full flex justify-center items-center text-center md:text-left pt-2 pb-2 px-4 text-md lg:text-xl font-bold'>
              장애인의 성공적인 자립을 통해 <br class='block md:hidden'></br>
              지역사회통합에 이바지하고자 합니다.
            </span>

            <div class='w-full flex justify-center items-center text-center md:text-left pt-2 pb-2 px-4 text-md lg:text-xl font-bold'>
              우리 한숲푸드는 청각장애인들이 일하기에{" "}
              <br class='block md:hidden'></br>편안한 환경을 만들고,
            </div>
            <div class='w-full flex justify-center items-center text-center md:text-left mb-2 pt-2 pb-4 px-4 text-md lg:text-xl font-bold'>
              손님들에겐 색다르고 특색있는 음식과 경험을{" "}
              <br class='block md:hidden'></br>제공하고자 합니다.
            </div>
          </Description>
        </div>
      </PageLayout>
    </>
  );
};

export default Story;
