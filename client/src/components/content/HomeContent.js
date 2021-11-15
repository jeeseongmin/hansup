import React from "react";
import HomeButton from "components/Button/HomeButton";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeContent = ({ image, title, text, color, reverse }) => {
	return (
		<div class="mb-16 py-20 h-96 relative">
			<div
				class={`flex ${
					reverse === "true" ? "flex-row-reverse" : ""
				} bg-${color} `}
			>
				<div class="flex-col w-1/2 py-14 px-40">
					<h2 class="text-3xl text-hansupBrown my-4">{title}</h2>
					<p class="my-6"> {text} </p>
					<div class="relative pb-4">
						<div class="absolute top-10 w-96">
							<div class="text-xs md:text-base h-12 md:h-16 flex flex-row justify-between items-center cursor-pointer px-2 lg:px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown">
								<span class="hidden md:block">자세히보기</span>
								<span class="block md:hidden">자세히</span>
								<div class="">
									<FontAwesomeIcon
										icon={faArrowRight}
										className="float-right"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class={`w-1/2 pl-28 absolute ${
						reverse === "true" ? "left-0" : "right-0"
					} top-8`}
				>
					<img class="h-96 object-cover" src={image} alt="food" />
				</div>
			</div>
		</div>
	);
};

export default HomeContent;
