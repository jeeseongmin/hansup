import ContentLayout from "components/Layout/ContentLayout";
import PageLayout from "components/Layout/PageLayout";
import React, { useEffect } from "react";

const { kakao } = window;
const Guide = () => {
	useEffect(() => {
		const container = document.getElementById("map");
		const options = {
			center: new kakao.maps.LatLng(36.03879096889036, 129.36728131343452),
			level: 3,
		};
		var map = new kakao.maps.Map(container, options);
		var markerPosition = new kakao.maps.LatLng(
			36.03879096889036,
			129.36728131343452
		);
		var markerPosition2 = new kakao.maps.LatLng(
			36.03879096889036,
			129.36728131343452
		);
		var marker = new kakao.maps.Marker({
			position: markerPosition,
		});

		var marker2 = new kakao.maps.Marker({
			position: markerPosition2,
		});

		marker.setMap(map);
		marker2.setMap(map);
	}, []);
	return (
		<PageLayout>
			<ContentLayout subtitle={"오시는 길"}>
				<div class="flex flex-col">
					<p class="text-2xl mb-6 ">
						<b>한숲 푸드</b>{" "}
						<span class="text-lg">| 경상북도 포항시 북구 불종로 67-4 1층</span>
					</p>
					<div class="shadow-lg">
						<div id="map" style={{ width: "100%", height: "400px" }}></div>
					</div>
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Guide;
