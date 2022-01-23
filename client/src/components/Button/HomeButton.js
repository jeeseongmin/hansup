import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const HomeButton = ({ text }) => {
	return (
		<div class="flex flex-row justify-between items-center cursor-pointer px-8 mb-3 transition delay-50 duration-300 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown">
			{text}
			<div class="">
				<FontAwesomeIcon icon={faArrowRight} className="float-right" />
			</div>
		</div>
	);
};

export default HomeButton;
