import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import OrderCheckBlock from "components/Block/OrderCheckBlock";

const OrderBox = ({ dayOrder, toggleChange }) => {
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

	return (
		<>
			<div
				onClick={handleOpen}
				ref={clickRef}
				class="cursor-pointer rounded-xl transition delay-50 duration-150 hover:border-2 border border-gray-200 hover:border-hansupBrown flex flex-col justify-center items-center py-4 px-5"
			>
				<p class="w-full text-2xl font-bold pb-2 border-b border-gray-200">
					{dayOrder.name}
				</p>
				<div class="pt-2 w-full grid grid-cols-3 gap-2">
					<p class="text-lg ">
						{dayOrder.date.substr(11, 2)}:{dayOrder.date.substr(14, 2)}
					</p>
					<p class="text-lg text-center">{dayOrder.count}인분</p>
					<p class="text-lg text-center">
						{dayOrder.delivery === "delivery" ? "배달" : "직접"}
					</p>
				</div>
			</div>
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
							class="select-none bg-white w-full md:w-2/3 lg:w-1/2 max-h-full overflow-auto h-full p-8"
						>
							<OrderCheckBlock
								info={dayOrder}
								handleClose={handleClose}
								toggleChange={toggleChange}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default OrderBox;
