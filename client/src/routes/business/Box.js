import React from "react";
import Subtitle from "components/Subtitle";
import CateringIntro from "image/catering-intro.png";
import styled, { css } from "styled-components";
import ImageLabel from "components/ImageLabel";

const Description = styled.div`
	background-color: #f1f0ec;
	color: #6c4d3f;
	width: 100%;
	height: 4rem;
	display: flex;
	padding-left: 2rem;
	padding-right: 2rem;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;

	// 기본 사이즈
	@media screen and (max-width: 1200px) {
	}
	//
	@media screen and (max-width: 768px) {
		width: 100%;
	}
	// 모바일 iPhone
	@media screen and (max-width: 480px) {
	}
`;

const Box = () => {
	return (
		<div class="flex flex-col pt-12">
			<div class="px-8 lg:px-40 w-full flex flex-col mb-8">
				<div class="w-28 mb-6">
					<Subtitle subtitle={"도시락 사업"} />
				</div>
				<div class="flex w-full h-auto flex-col items-center mb-4 ">
					<Description>
						한숲 도시락은 대상 맞춤형 음식들을 풍성하게 담아 합리적인 가격으로
						제공됩니다.
					</Description>
					<div class="mt-8 w-full lg:w-3/5 px-12 lg:pl-0 lg:pr-12 h-96 mb-4 lg:mb-0 flex justify-start items-start ">
						<img
							src={CateringIntro}
							class="h-full w-full object-cover"
							alt="img"
						/>
					</div>
				</div>
			</div>
			<div class="px-8 lg:px-40 w-full flex flex-col mb-8">
				<div class="w-28 mb-6">
					<Subtitle subtitle={"도시락 문의"} />
				</div>
				<p class="text-hansupBrown mb-4">
					도시락 상담 및 문의는 전화 혹은 문자로 받고 있습니다.
				</p>
				<p class="text-hansupBrown mb-4">
					관심 있으신 분들은 아래의 번호로 연락주세요!
				</p>
				<div class="w-full h-auto grid grid-cols-1 md:grid-cols-2 items-center mb-4 gap-4">
					<Description>010-1111-2222</Description>
					<Description>010-1111-2222</Description>
				</div>
			</div>
		</div>
	);
};

export default Box;
