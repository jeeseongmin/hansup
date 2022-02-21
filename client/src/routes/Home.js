import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ReviewBlock from "components/Block/ReviewBlock";
import Forest from "image/bg-forest.png";
import Catering from "image/homeCatering.png";
import Emoji from "image/homeEmoji.png";
import Lunchbox from "image/homeLunchbox.png";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RestaurantImg from "image/intro-story-img3.jpg";
import useTitle from "hooks/useTitle";
const Home = () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("한숲푸드"), 1000);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  const goPage = (url) => {
    history.push(url);
    window.scrollTo(0, 0);
    document.getElementById("scrollRef").scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .post(
        "/api/review",
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        // console.log(Response);
        setLoading(true);
        setReviewList(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div class='w-full h-full flex flex-col'>
      <div class='w-full relative'>
        {/* HomeBanner */}
        <div class='w-full relative'>
          {/* bannerImage */}
          <img src={Forest} alt='' class='object-cover w-full h-full' />
          {/* bannerContents */}
          <div class='absolute w-full h-full left-0 top-0'>
            {/* bannerInner */}
            <div class='h-full flex flex-col lg:flex-row justify-center px-4 md:px-8 lg:px-24'>
              {/* bannerLeft */}
              <div class='h-auto lg:h-full w-full lg:w-3/5 flex flex-col justify-end'>
                {/* bannerLogo */}
                <img
                  src={Emoji}
                  class='hidden lg:block h-24 lg:h-48 w-48 object-cover'
                  alt=''
                />
                {/* bannerText */}
                <div class='text-xs md:text-xl lg:text-3xl text-white pt-2 lg:pt-8 mb-4 sm:mb-8 lg:mb-16'>
                  <h2>다양한 나무들이 모여 하나의 숲을 만들 듯,</h2>
                  <h2>청각장애인과 비장애인들이 모여 우리만의</h2>
                  <h2>특색있는 숲을 만들고자 합니다.</h2>
                </div>
              </div>
              {/* bannerRight */}
              <div class='h-12 md:h-16 lg:h-full flex-none lg:flex-1 grid grid-cols-3 gap-8 lg:gap-0 lg:flex flex-row lg:flex-col justify-end pl-0 lg:pl-24'>
                {/* bannerButton */}
                <button
                  id='shortcut'
                  onClick={() => goPage("/intro/introduction")}
                  class='text-xs md:text-base h-8 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 lg:px-8 mb-0 md:mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                  {/* mainButton */}
                  <span class='hidden md:block'>한숲의 인사말</span>
                  {/* ResponsiveButton */}
                  <span class='block md:hidden'>인사말</span>
                  <div class=''>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className='float-right'
                    />
                  </div>
                </button>
                {/* bannerButton */}
                <button
                  onClick={() => goPage("/intro/story")}
                  class='text-xs md:text-base h-8 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 lg:px-8 mb-0 md:mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                  {/* mainButton */}
                  <span class='hidden md:block'>한숲 스토리</span>
                  {/* ResponsiveButton */}
                  <span class='block md:hidden'>이야기</span>
                  <div class=''>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className='float-right'
                    />
                  </div>
                </button>
                <button
                  onClick={() => alert("준비중입니다.")}
                  class='text-xs md:text-base h-8 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 lg:px-8 mb-0 md:mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                  {/* mainButton */}
                  <span class='hidden md:block'>한숲은 꿈꿔요</span>
                  {/* ResponsiveButton */}
                  <span class='block md:hidden'>꿈꿔요</span>
                  <div class=''>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className='float-right'
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* homeMiddleTextBlock */}
      <div class='text-center py-8 lg:py-14 text-base lg:text-2xl text-hansupBrown'>
        <h2>특색을 담은 맛있는 음식으로</h2>
        <h2>고객님들께 착하고 즐거운 맛을 제공하겠습니다.</h2>
      </div>
      <div class='grid grid-row-3 gap-8'>
        {/* Homecontent */}
        <div class='w-full h-72 lg:h-96 py-12 relative'>
          {/* BackgroundDiv */}
          <div class='w-full h-full bg-homePink'></div>
          {/* ContentLayout */}
          <div class='absolute left-0 top-0 w-full h-72 lg:h-96 grid grid-cols-2'>
            {/* ContentImageBox */}
            <div class='w-full h-72 lg:h-96 px-4 md:px-8 lg:px-24 flex flex-col justify-center'>
              {/* ImageBox */}
              <img
                src={RestaurantImg}
                alt=''
                class='object-cover w-full h-48 md:h-96'
              />
            </div>
            {/* ContentTextBox */}
            <div class='w-full h-72 lg:h-96 px-4 md:px-8 lg:px-24 flex flex-col justify-center'>
              {/* TextBlock  */}
              <div class='h-auto w-full'>
                {/* TitleText */}
                <h2 class='text-xl md:text-3xl text-hansupBrown my-4'>
                  수화식당
                </h2>
                {/* ContentText */}
                <p class='my-6 text-sm md:text-base'>
                  수화식당은 국내 최초 청각장애인 레스토랑으로, 한식과 양식을
                  판매하는 식당입니다.
                </p>
                {/* ButtonLayout */}
                <div class='relative pb-4'>
                  {/* ButtonLayoutInner */}
                  <div class='absolute top-0 lg:top-10 w-full md:w-2/3 max-w-xl '>
                    {/* ButtonBlock */}
                    <button
                      onClick={() => goPage("/business/restaurant")}
                      class='text-xs md:text-base h-10 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 md:px-4 lg:px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                      {/* MainButton */}
                      <span class='hidden md:block'>자세히보기</span>
                      {/* ResponsiveButton */}
                      <span class='block md:hidden'>자세히</span>
                      <div class=''>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='float-right'
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='w-full h-72 lg:h-96 py-12 relative'>
          <div class='w-full h-full bg-homePink'></div>
          <div class='absolute left-0 top-0 w-full h-72 lg:h-96 grid grid-cols-2'>
            <div class='w-full h-72 lg:h-96 px-4 md:px-8 lg:px-24 flex flex-col justify-center'>
              <div class='h-auto w-full'>
                <h2 class='text-xl md:text-3xl text-hansupBrown my-4'>
                  케이터링 및 출장뷔페
                </h2>
                <p class='my-6 text-sm md:text-base'>
                  행사, 기념일에 고객님께서 더 풍성하고 행복하게 보내도록 맛난
                  케이터링 서비스를 제공합니다!
                </p>
                <div class='relative pb-4'>
                  <div class='absolute top-0 lg:top-10 w-full md:w-2/3 max-w-xl '>
                    <button
                      onClick={() => goPage("/business/catering")}
                      class='text-xs md:text-base h-10 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 md:px-4 lg:px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                      <span class='hidden md:block'>자세히보기</span>
                      <span class='block md:hidden'>자세히</span>
                      <div class=''>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='float-right'
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class='w-full h-72 lg:h-96 px-4 md:px-8 lg:px-24 flex flex-col justify-center'>
              <img
                src={Catering}
                alt=''
                class='object-cover w-full h-48 md:h-96'
              />
            </div>
          </div>
        </div>
        <div class='w-full h-72 lg:h-96 py-12 relative'>
          <div class='w-full h-full bg-homePink'></div>
          <div class='absolute left-0 top-0 w-full h-72 lg:h-96 grid grid-cols-2'>
            <div class='w-full h-72 lg:h-96 px-4 md:px-8 lg:px-24 flex flex-col justify-center'>
              <img
                src={Lunchbox}
                alt=''
                class='object-cover w-full h-48 md:h-96'
              />
            </div>
            <div class='w-full h-72 lg:h-96 px-4 md:px-8 lg:px-24 flex flex-col justify-center'>
              <div class='h-auto w-full'>
                <h2 class='text-xl md:text-3xl text-hansupBrown my-4'>
                  도시락
                </h2>
                <p class='my-6 text-sm md:text-base'>
                  한숲 도시락은 대상 맞춤형 음식들을 풍성하게 담아 합리적인
                  가격으로 제공합니다.
                </p>
                <div class='relative pb-4'>
                  <div class='absolute top-0 lg:top-10 w-full md:w-2/3 max-w-xl '>
                    <button
                      onClick={() => goPage("/business/box")}
                      class='text-xs md:text-base h-10 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 md:px-4 lg:px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                      <span class='hidden md:block'>자세히보기</span>
                      <span class='block md:hidden'>자세히</span>
                      <div class=''>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='float-right'
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='px-4 md:px-8 lg:px-24 py-20'>
        <div class='pb-8 text-hansupBrown flex justify-between'>
          <p class='hidden md:block text-md lg:text-xl font-bold '>
            한숲푸드의 여러 후기들
          </p>
          <p class='block md:hidden text-md lg:text-xl font-bold '>
            한숲푸드의 후기들
          </p>
          <button
            class='text-sm lg:text-md ml-auto cursor-pointer hover:opacity-50 flex items-center'
            onClick={() => goPage("/community/review/list")}>
            <span class='hidden md:block mr-2'>다른 후기 보러가기</span>
            <span class='block md:hidden mr-2'>더보기</span>
            <FontAwesomeIcon icon={faArrowRight} className='float-right' />
          </button>
        </div>
        {loading ? (
          reviewList.length === 0 ? (
            <div class='w-full h-24 flex justify-center items-center'>
              <p>리뷰가 없습니다.</p>
            </div>
          ) : (
            <div class='grid grid-cols-2 md:grid-cols-3 gap-8'>
              {reviewList.map((element, index) => {
                if (0 <= index && index <= 2) {
                  return <ReviewBlock review={element} key={element} />;
                }
              })}{" "}
            </div>
          )
        ) : (
          <div class='w-full h-24 flex justify-center items-center'>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
