import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import IntroImg1 from "image/intro-intro-img1.png";
import IntroImg2 from "image/intro-intro-img2.png";
import Description from "components/Description";
import ReactPlayer from "react-player";

const Introduction = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"인사말"}>
				<div class="flex w-full h-auto lg:h-auto flex-col lg:flex-row items-center mb-8 relative">
					<div class="w-full md:w-auto h-auto mb-4 lg:mb-0 flex justify-center lg:justify-start items-start">
						{/* <img src={IntroImg1} class="h-full w-full object-cover" alt="img" /> */}
						<ReactPlayer
							url="https://youtu.be/hSoTS14DhTA"
							controls
							// className="home-video video-shadow main-video"
						/>
					</div>
					<div class="flex-1 h-96 text-hansupBrown text-lg p-4 flex flex-col justify-center items-center">
						<p class="h-auto leading-10">
							<b>다양한 나무들이 모여 하나의 숲을 만들 듯,</b>
							<br></br>청각장애인과 비장애인들이 모여 우리만의 특색있는 숲을
							만들고자 합니다.<br></br>
							이러한 특색을 담은 맛있는 음식으로 고객님들께 착하고 즐거운 맛을
							제공하고 싶습니다.<br></br>
							<b>
								더 나아가 베리어 프리 문화에 앞장서는 기업이 되어, 장애인 친화적
								세상이 다가오기를 꿈꿉니다.
							</b>
						</p>
					</div>
				</div>
			</ContentLayout>
			<ContentLayout subtitle={"한숲비전"}>
				<div class="flex w-full h-auto lg:h-auto flex-col lg:flex-row items-center mb-8">
					<div class="w-full lg:w-3/5 pl-0 pr-0 lg:pl-0 lg:pr-8 h-48 sm:h-60 lg:h-96 mb-4 lg:mb-0 flex flex-col justify-center items-center">
						<p class="w-full h-auto text-2xl sm:text-3xl md:text-5xl leading-normal md:leading-relaxed font-thin">
							한숲푸드는<br></br>
							<span class="bg-yellow-50 py-1">장애인과 비장애인이 함께</span>
							<br></br>
							<span class="bg-yellow-50 py-1">소통하고 나누는 세상</span>을
							꿈꿉니다.
						</p>
					</div>
					<div class="hidden w-full lg:flex-1 h-48 lg:h-96 text-hansupBrown text-lg pl-4 lg:flex flex-col justify-center items-center relative">
						<img
							src={IntroImg2}
							class="absolute right-0 h-full w-full object-contain"
							alt="img"
						/>
					</div>
				</div>
			</ContentLayout>
			<div class="w-full flex flex-col -mt-16 mb-24 px-8 xl:px-40">
				<div class="mb-6">
					<Description>
						<div class="w-full flex justify-center items-center text-center md:text-left py-4 px-4 text-lg lg:text-xl font-bold">
							첫째, 베리어프리(장애극복)문화를 구축하는 장애친화적 기업 한숲이
							되고 싶습니다.
						</div>
					</Description>
				</div>
				<div>
					<Description>
						<div class="w-full flex justify-center items-center text-center md:text-left py-4 px-4 text-lg lg:text-xl font-bold">
							둘째, 포항지역사회에 건강하고 맛있는 음식을 제공하는 한숲이 되고
							싶습니다.
						</div>
					</Description>
				</div>
			</div>
		</PageLayout>
	);
};

export default Introduction;
