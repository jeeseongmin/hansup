import React, { useState, useEffect } from "react";
import SlideBlock from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import box1 from "image/boxSlider-img1.jpg";
import box2 from "image/boxSlider-img2.jpg";
import box3 from "image/boxSlider-img3.jpg";
import catering1 from "image/boxslider-catering1.jpg";
import catering2 from "image/boxslider-catering2.jpg";
import catering3 from "image/boxslider-catering3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BoxSliderBlock = ({ type }) => {
	const dispatch = useDispatch();
	const imgList =
		type === "box" ? [box1, box2, box3] : [catering1, catering2, catering3];
	const [hoverBtn, setHoverBtn] = useState(false);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const goSubPage = (main, sub) => {
		window.scrollTo(0, 0);
		document.getElementById("scrollRef").scrollTo(0, 0);
	};
	return (
		<>
			<Slider {...settings}>
				{imgList.map((element, index) => {
					return (
						<div class="h-96 w-full flex items-center justify-center">
							<img
								src={element}
								class="w-full h-full object-contain"
								alt={
									type === "catering"
										? "케이터링 대표 음식 사진"
										: "도시락 대표 음식 사진"
								}
							/>{" "}
						</div>
					);
				})}
			</Slider>
		</>
	);
};

export default BoxSliderBlock;
