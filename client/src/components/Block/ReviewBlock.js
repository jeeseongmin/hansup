import React, { useState, useEffect } from "react";
import Example from "image/example.png";
import Skeleton from "@mui/material/Skeleton";

const ReviewBlock = ({ review }) => {
	const [isHover, setIsHover] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setTimeout(function () {
			setLoading(true);
		}, 1000);
	}, []);
	return (
		<>
			{loading ? (
				<div
					onMouseOver={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					class="w-full h-48 lg:h-72 relative cursor-pointer"
				>
					<img
						class="w-full h-full object-cover"
						src={
							"http://localhost:5000/api/image/view/" +
							review.imgList[0].filename
						}
						alt="imgList"
					/>
					<div
						class={
							"absolute w-full h-full left-0 top-0 transition delay-50 duration-200 " +
							(isHover ? "opacity-100" : "opacity-0")
						}
					>
						<div class="z-10 w-full h-full relative bg-hansupBrown left-0 top-0 flex flex-col opacity-60 justify-between text-white p-8"></div>
						<div class="absolute z-30 w-full h-full left-0 top-0 flex flex-col justify-between text-white p-4 lg:p-8">
							<p class="flex-1 text-lg w-full break-all overflow-ellipsis overflow-hidden leading-relaxed font-bold mb-2">
								{review.content}
							</p>
							<p class="h-10 flex flex-col justify-end">
								{review.createdAt.substr(0, 10).replace(/[-]/g, ".")}
							</p>
						</div>
					</div>
				</div>
			) : (
				<div class="w-full h-48 lg:h-72 relative cursor-pointer">
					<Skeleton variant="rectangular" height={250} />
				</div>
			)}
		</>
	);
};

export default ReviewBlock;
