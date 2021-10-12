import React from "react";
import Subtitle from "components/Subtitle";
import CateringIntro from "image/catering-intro.png";
import styled, { css } from "styled-components";
import ImageLabel from "components/ImageLabel";

const Description = styled.div`
	background-color: #f1f0ec;
	color: #6c4d3f;
	height: 100%;
	padding: 2rem;
	flex: 1 1 0%;
	display: flex;
	flex-direction: column;

	// 기본 사이즈
	@media screen and (max-width: 1200px) {
	}
	//
	@media screen and (max-width: 768px) {
		width: 100%;
		justify-content: space-between;
	}
	// 모바일 iPhone
	@media screen and (max-width: 480px) {
	}
`;
const Catering = () => {
	return (
		<div class="flex flex-col pt-12">
			<div class="px-8 lg:px-40 w-full flex flex-col mb-8">
				<div class="w-24 mb-6">
					<Subtitle subtitle={"케이터링"} />
				</div>
				<div class="flex w-full h-auto lg:h-96 flex-col lg:flex-row items-center mb-4 ">
					<div class="w-full lg:w-3/5 px-12 lg:pl-0 lg:pr-12 h-full mb-4 lg:mb-0 flex justify-start items-start ">
						<img
							src={CateringIntro}
							class="h-full w-full object-cover"
							alt="img"
						/>
					</div>
					<Description>
						<div class="h-1/2 text-md lg:text-lg mb-4 lg:mb-0">
							여러 행사에 빠질 수 없는 것이 바로 음식! 한숲푸드는 행사, 기념일에
							고객님께서 더 풍성하고 행복하게 보내도록 맛난 케이터링 서비스를
							제공합니다!<br></br>
							<br></br>
							한숲의 케이터링 서비스는 원하시는 날짜, 시간, 인원 수에 맞춰
							케이터링 박스에 정성이 담긴 15가지 메뉴를 담아 제공합니다.
						</div>
					</Description>
				</div>
			</div>
			<div class="px-8 lg:px-40 w-full flex flex-col">
				<ImageLabel
					text={"케이터링 메뉴"}
					imgUrl={CateringIntro}
					url={"/order/catering/menu"}
				/>
				<ImageLabel
					text={"케이터링 안내"}
					imgUrl={CateringIntro}
					url={"/order/catering/intro"}
				/>
				<ImageLabel
					text={"케이터링 주문"}
					imgUrl={CateringIntro}
					url={"/order/catering/ordering"}
				/>
			</div>
		</div>
	);
};

export default Catering;
