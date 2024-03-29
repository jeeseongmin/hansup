import React from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import { useHistory } from "react-router-dom";
import useTitle from "hooks/useTitle";

const OrderMain = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(
    () => updateTitle("한숲푸드 - 케이터링 예약 - 케이터링 예약"),
    1000
  );

  const history = useHistory();

  const goPage = (url) => {
    history.push(url);
    document.getElementById("scrollRef").scrollTo(0, 0);
  };
  return (
    <PageLayout>
      <ContentLayout subtitle={"케이터링 예약하기"}>
        <div
          id="main"
          class="h-full w-full flex flex-col justify-center items-center"
        >
          <div class="w-full h-48 flex justify-center items-center border-b border-hansupBrown mb-8">
            <p class="text-center font-bold text-lg mb-12 leading-loose">
              케이터링 예약과 예약 내역 확인을 진행하실 수 있습니다.
              <br></br>
              예약 내역 확인은 [이름], [연락처], [예약 날짜]를 통해 조회
              가능합니다.
            </p>
          </div>
          <div class="w-full h-12 flex flex-row justify-around">
            <button
              // onClick={() => goPage("/order/catering/ordering")}
              onClick={() =>
                alert("페이지 리뉴얼중입니다. 전화로 예약 부탁드립니다.")
              }
              class="cursor-pointer w-48 h-full flex justify-center transition delay-50 duration-150 items-center border border-hansupBrown text-hansupBrown hover:bg-hansupBrown hover:text-white font-bold text-xl"
            >
              예약하기
            </button>
            <button
              onClick={() => goPage("/order/catering/orderCheck")}
              class="cursor-pointer w-48 h-full flex justify-center transition delay-50 duration-150 items-center border border-hansupBrown text-hansupBrown hover:bg-hansupBrown hover:text-white font-bold text-xl"
            >
              예약 내역 확인
            </button>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default OrderMain;
