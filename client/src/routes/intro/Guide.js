import ContentLayout from "components/Layout/ContentLayout";
import PageLayout from "components/Layout/PageLayout";
import React, { useEffect } from "react";
import useTitle from "hooks/useTitle";
const { kakao } = window;
const Guide = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드 - 회사소개 - 오시는 길"), 1000);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(36.0385924912626, 129.36724809695312),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(
      36.0385924912626,
      129.36724809695312
    );
    var markerPosition2 = new kakao.maps.LatLng(
      36.0385924912626,
      129.36724809695312
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
    <PageLayout main={true}>
      <ContentLayout subtitle={"오시는 길"}>
        <div id='main' class='flex flex-col'>
          <p class='text-2xl mb-6 '>
            <b>한숲푸드 (수화식당)</b>{" "}
            <span class='text-lg'>
              <br class='inline-block md:hidden'></br>
              <span class='hidden md:inline-block'>|</span> 경상북도 포항시 북구
              불종로 67-4 (여천동), 1층
            </span>
          </p>
          <div class='shadow-lg'>
            <div id='map' style={{ width: "100%", height: "400px" }}></div>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default Guide;
