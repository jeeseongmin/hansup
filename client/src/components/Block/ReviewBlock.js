import React, { useState, useEffect, useRef } from "react";
import Example from "image/example.png";
import Skeleton from "@mui/material/Skeleton";
import Modal from "@mui/material/Modal";
import Close from "image/close.png";

const ReviewBlock = ({ review }) => {
	const [isHover, setIsHover] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const modalRef = useRef();
	const clickRef = useRef();

	useEffect(() => {
		if (!open) return;
		function handleClick(e) {
			if (clickRef && clickRef.current.contains(e.target)) handleOpen();
			else if (modalRef.current === null) {
				return;
			} else if (!modalRef.current.contains(e.target)) {
				handleClose();
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [open]);

	useEffect(() => {
		setTimeout(function () {
			setLoading(true);
		}, 1000);
	}, []);

	const dataToText = (date) => {
		let year = date.substring(2, 4);
		let month = date.substring(5, 7);
		let day = date.substring(8, 10);
		return year + "." + month + "." + day;
	};

	return (
		<>
			{loading ? (
				<div
					onMouseOver={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onClick={handleOpen}
					ref={clickRef}
					class="w-full h-48 lg:h-72 relative cursor-pointer"
				>
					<img
						class="w-full h-full object-cover"
						src={
							"http://hansup.cafe24app.com/api/image/view/" +
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
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div class="h-full">
					<div class="w-full h-full flex flex-col justify-center items-center py-16 px-4 lg:px-16">
						<div
							ref={modalRef}
							class="select-none bg-white w-full md:w-2/3 lg:w-2/3 max-h-full overflow-hidden h-96 p-8 flex flex-col lg:flex-row relative"
						>
							<div class="w-full lg:w-1/2 h-full">
								<img
									class="w-full h-full object-cover"
									src={
										"http://hansup.cafe24app.com/api/image/view/" +
										review.imgList[0].filename
									}
									alt="imgList"
								/>
							</div>
							<div class="w-full lg:w-1/2 flex-1 flex flex-col px-4 overflow-y-scroll scrollbar-hide">
								<div class="h-auto w-full border-b-2 border-hansupBrown flex flex-row justify-between items-center py-2">
									<p class="w-3/4 h-auto break-words text-base overflow-ellipsis resize-none">
										{review.email}
									</p>
									<div class="w-1/4  text-gray-400 text-md text-right">
										{dataToText(review.createdAt)}
									</div>
								</div>
								<div class="w-full h-full my-2">
									<p class="w-full h-full break-words text-base overflow-ellipsis resize-none">
										{review.content}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ReviewBlock;
