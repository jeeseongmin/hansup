import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import ReviewListBlock from "components/Block/ReviewListBlock";
import Subtitle from "components/Subtitle";
import { VscArrowRight } from "react-icons/vsc";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import CreateVoice from "routes/community/Voice/CreateVoice";
import DefaultButton from "components/Button/DefaultButton";

const OrderMain = () => {
	const history = useHistory();

	const goPage = (url) => {
		history.push(url);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};
	return (
		<PageLayout>
			<ContentLayout subtitle={"케이터링 예약하기"}>
				<div class="h-full w-full flex flex-col justify-center items-center">
					<div class="w-full h-48 flex justify-center items-center border-b border-hansupBrown mb-8">
						<p class="text-center font-bold text-lg mb-12 leading-loose">
							케이터링 예약과 예약 내역 확인이 가능합니다.
							<br></br>
							화이팅!
						</p>
					</div>
					<div class="w-full h-12 flex flex-row justify-around">
						<div
							onClick={() => goPage("/order/catering/ordering")}
							class="cursor-pointer w-48 h-full flex justify-center transition delay-50 duration-150 items-center border border-hansupBrown text-hansupBrown hover:bg-hansupBrown hover:text-white font-bold text-xl"
						>
							예약하기
						</div>
						<div
							onClick={() => goPage("/order/catering/orderCheck")}
							class="cursor-pointer w-48 h-full flex justify-center transition delay-50 duration-150 items-center border border-hansupBrown text-hansupBrown hover:bg-hansupBrown hover:text-white font-bold text-xl"
						>
							예약 내역 확인
						</div>
					</div>
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default OrderMain;
