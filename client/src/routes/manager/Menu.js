import React, { useState, useEffect, useRef } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import MenuListLayout from "components/Layout/MenuListLayout";
import orderList from "routes/order/catering/data/orderList";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Menu = () => {
	const [modalMenu, setModalMenu] = useState();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const modalRef = useRef();
	const clickRef = useRef();
	const newMenu = useState({
		category: "Catering",
		type: "",
		name: "",
		price: "",
		imgList: "",
	});

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
			<PageLayout>
				<ContentLayout subtitle={""}>
					<div class="flex flex-col">
						<div class="w-full h-12 text-lg font-semibold flex flex-row justify-center items-center mb-8">
							<div
								onClick={handleOpen}
								ref={clickRef}
								class="cursor-pointer w-full md:w-2/3 lg:w-1/2 h-full transition delay-50 duration-150 bg-hansupBrown hover:opacity-70 text-white flex justify-center items-center"
							>
								메뉴 추가
							</div>
						</div>
						{[0, 1, 2, 3].map((element, index) => {
							return (
								<MenuListLayout
									key={index}
									info={orderList[element]}
									col={5}
									type={"manager"}
								/>
							);
						})}{" "}
					</div>
				</ContentLayout>
			</PageLayout>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div class="h-full">
					<div class="w-full h-full flex flex-col justify-center items-center py-0 px-4 lg:px-16">
						<div
							ref={modalRef}
							class="select-none bg-white w-full md:w-2/3 lg:w-1/2 max-h-full  overflow-auto h-96 px-8 py-6"
						>
							{/* <OrderCheckBlock
								info={dayOrder}
								handleClose={handleClose}
								toggleChange={toggleChange}
							/> */}
							<div class="w-full h-full flex flex-col ">
								<div class="w-full font-bold text-hansupBrown text-2xl">
									메뉴 추가
								</div>
								<div class="w-full flex-1 py-6 border-b-2 border-t-2 border-hansupBrown grid grid-rows-3 my-2 gap-4">
									<div class="relative cursor-pointer w-full border-2 border-hansupBrown flex justify-between items-center text-hansupBrown font-bold">
										<div class=" w-12 h-full"></div>
										<p>메인메뉴</p>
										<div class=" w-12 h-full flex justify-center items-center">
											<IoIosArrowDown size={28} />
											{/* <IoIosArrowUp size={28} /> */}
										</div>
										<div class="absolute w-full h-full top-12 border-2 border-red-500"></div>
									</div>
									<input class="cursor-pointer w-full border-2 border-hansupBrown flex justify-center items-center text-hansupBrown font-bold text-center" />
									<div class="cursor-pointer w-full border-2 border-hansupBrown flex justify-center items-center text-hansupBrown font-bold">
										음식 사진 첨부
									</div>
								</div>
								<div class="w-full h-12 font-bold text-hansupBrown flex flex-row justify-end">
									<div class="w-48 h-full bg-hansupBrown text-lg text-white font-bold flex justify-center items-center">
										완료
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Menu;
