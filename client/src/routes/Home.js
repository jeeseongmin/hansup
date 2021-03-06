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
  setTimeout(() => updateTitle("νμ²νΈλ"), 1000);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  const goPage = (url) => {
    history.push(url);
    window.scrollTo(0, 0);
    document.getElementById("scrollRef").scrollTo(0, 0);
    document.body.scrollIntoView(true);
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
          <div id='main' class='absolute w-full h-full left-0 top-0'>
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
                  <h2>λ€μν λλ¬΄λ€μ΄ λͺ¨μ¬ νλμ μ²μ λ§λ€ λ―,</h2>
                  <h2>μ²­κ°μ₯μ μΈκ³Ό λΉμ₯μ μΈλ€μ΄ λͺ¨μ¬ μ°λ¦¬λ§μ</h2>
                  <h2>νΉμμλ μ²μ λ§λ€κ³ μ ν©λλ€.</h2>
                </div>
              </div>
              {/* bannerRight */}
              <div class='h-12 md:h-16 lg:h-full flex-none lg:flex-1 grid grid-cols-3 gap-8 lg:gap-0 lg:flex flex-row lg:flex-col justify-end pl-0 lg:pl-24'>
                {/* bannerButton */}
                <button
                  onClick={() => goPage("/intro/introduction")}
                  class='text-xs md:text-base h-8 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 lg:px-8 mb-0 md:mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                  {/* mainButton */}
                  <span class='hidden md:block'>νμ²μ μΈμ¬λ§</span>
                  {/* ResponsiveButton */}
                  <span class='block md:hidden'>μΈμ¬λ§</span>
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
                  <span class='hidden md:block'>νμ² μ€ν λ¦¬</span>
                  {/* ResponsiveButton */}
                  <span class='block md:hidden'>μ΄μΌκΈ°</span>
                  <div class=''>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className='float-right'
                    />
                  </div>
                </button>
                <button
                  onClick={() => alert("μ€λΉμ€μλλ€.")}
                  class='text-xs md:text-base h-8 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 lg:px-8 mb-0 md:mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                  {/* mainButton */}
                  <span class='hidden md:block'>νμ²μ κΏκΏμ</span>
                  {/* ResponsiveButton */}
                  <span class='block md:hidden'>κΏκΏμ</span>
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
        <h2>νΉμμ λ΄μ λ§μλ μμμΌλ‘</h2>
        <h2>κ³ κ°λλ€κ» μ°©νκ³  μ¦κ±°μ΄ λ§μ μ κ³΅νκ² μ΅λλ€.</h2>
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
                  μνμλΉ
                </h2>
                {/* ContentText */}
                <p class='my-6 text-sm md:text-base'>
                  μνμλΉμ κ΅­λ΄ μ΅μ΄ μ²­κ°μ₯μ μΈ λ μ€ν λμΌλ‘, νμκ³Ό μμμ
                  νλ§€νλ μλΉμλλ€.
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
                      <span class='hidden md:block'>μμΈνλ³΄κΈ°</span>
                      {/* ResponsiveButton */}
                      <span class='block md:hidden'>μμΈν</span>
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
                  μΌμ΄ν°λ§ λ° μΆμ₯λ·ν
                </h2>
                <p class='my-6 text-sm md:text-base'>
                  νμ¬, κΈ°λμΌμ κ³ κ°λκ»μ λ νμ±νκ³  νλ³΅νκ² λ³΄λ΄λλ‘ λ§λ
                  μΌμ΄ν°λ§ μλΉμ€λ₯Ό μ κ³΅ν©λλ€!
                </p>
                <div class='relative pb-4'>
                  <div class='absolute top-0 lg:top-10 w-full md:w-2/3 max-w-xl '>
                    <button
                      onClick={() => goPage("/business/catering")}
                      class='text-xs md:text-base h-10 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 md:px-4 lg:px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                      <span class='hidden md:block'>μμΈνλ³΄κΈ°</span>
                      <span class='block md:hidden'>μμΈν</span>
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
                  λμλ½
                </h2>
                <p class='my-6 text-sm md:text-base'>
                  νμ² λμλ½μ λμ λ§μΆ€ν μμλ€μ νμ±νκ² λ΄μ ν©λ¦¬μ μΈ
                  κ°κ²©μΌλ‘ μ κ³΅ν©λλ€.
                </p>
                <div class='relative pb-4'>
                  <div class='absolute top-0 lg:top-10 w-full md:w-2/3 max-w-xl '>
                    <button
                      onClick={() => goPage("/business/box")}
                      class='text-xs md:text-base h-10 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 md:px-4 lg:px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>
                      <span class='hidden md:block'>μμΈνλ³΄κΈ°</span>
                      <span class='block md:hidden'>μμΈν</span>
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
            νμ²νΈλμ μ¬λ¬ νκΈ°λ€
          </p>
          <p class='block md:hidden text-md lg:text-xl font-bold '>
            νμ²νΈλμ νκΈ°λ€
          </p>
          <button
            class='text-sm lg:text-md ml-auto cursor-pointer hover:opacity-50 flex items-center'
            onClick={() => goPage("/community/review/list")}>
            <span class='hidden md:block mr-2'>λ€λ₯Έ νκΈ° λ³΄λ¬κ°κΈ°</span>
            <span class='block md:hidden mr-2'>λλ³΄κΈ°</span>
            <FontAwesomeIcon icon={faArrowRight} className='float-right' />
          </button>
        </div>
        {loading ? (
          reviewList.length === 0 ? (
            <div class='w-full h-24 flex justify-center items-center'>
              <p>λ¦¬λ·°κ° μμ΅λλ€.</p>
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
