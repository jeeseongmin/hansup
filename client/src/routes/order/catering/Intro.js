import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";

const Intro = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"가격 및 주문 최소 인원"}>
				<div class="flex flex-col">
					<p class="text-hansupBrown text-lg mb-8 font-semibold">
						인당 15,000원 (케이터링 주문 최소 인원 : 10인)
					</p>
				</div>
			</ContentLayout>
			<ContentLayout subtitle={"결제 방법"}>
				<div class="flex flex-col">
					<p class="text-hansupBrown text-lg mb-8 font-semibold">
						계좌이체, 카드결제, 상품권결제(온누리.포항사랑), 현금결제 모두
						가능합니다!
					</p>
				</div>
			</ContentLayout>
			<ContentLayout subtitle={"배달비"}>
				<div class="flex flex-col">
					<p class="text-hansupBrown text-lg mb-8 font-semibold">
						일요일은 배달이 어려워, 직접 방문만 가능합니다.
						<br></br>
						주소 | 경상북도 포항시 북구 불종로 67-4, 수화식당
					</p>
				</div>
				<div class="grid grid-cols-3 grid-rows-3 border-2 border-hansupBrown border-opacity-50">
					<div class=" text-hansupBrown text-lg font-bold text-center border-b-2 border-r-2 border-hansupBrown border-opacity-50"></div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 border-b-2 border-hansupBrown border-opacity-50">
						포항 시내
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 border-b-2 border-hansupBrown border-opacity-50">
						시외
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 border-r-2 border-hansupBrown border-opacity-50">
						평일
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 ">
						5,000원
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 ">
						30,000원
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 border-r-2 border-hansupBrown border-opacity-50">
						토요일
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 ">
						15,000원
					</div>
					<div class=" text-hansupBrown text-lg font-bold text-center py-4 ">
						30,000원
					</div>
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Intro;
