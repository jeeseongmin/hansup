import React, { useState, useEffect, useRef } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import MenuListLayout from "components/Layout/MenuListLayout";
import orderList from "routes/order/catering/data/orderList";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Menu = () => {
	const history = useHistory();
	const [modalMenu, setModalMenu] = useState(false);
	const onToggleMenu = () => {
		setModalMenu(!modalMenu);
	};
	const onChangeMenu = (name) => {
		const cp = { ...newMenu };
		cp.type = name;
		setNewMenu(cp);
		onToggleMenu();
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const modalRef = useRef();
	const clickRef = useRef();
	const nameRef = useRef();
	const modalMenuRef = useRef();

	// image
	const [includeImg, setIncludeImg] = useState(false);
	const [isImageUpload, setIsImageUpload] = useState(true);
	const [loading, setLoading] = useState(true);
	const buttonRef = useRef(null);
	const onChangeImg = async (e) => {
		if (newMenu.imgList.length > 0) {
			console.log("이미 있습니다.");
			console.log("before menu", newMenu);
			await removeImg(0);
		}
		setLoading(false);
		const formData = new FormData();
		formData.append("file", e.target.files[0]);

		// 서버의 upload API 호출
		const res = await axios.post("/api/image/upload", formData);
		const cp = [...newMenu.imgList];
		await cp.push({ filename: res.data.filename, id: res.data.id });
		await onChange(cp, "imgList");
		setLoading(true);
		setIsImageUpload(true);
		console.log("change menu", newMenu);
	};
	const buttonClick = () => {
		buttonRef.current.click();
	};

	const removeImg = async () => {
		const cp = [...newMenu.imgList];
		const id = cp[0].id;
		onChange([], "imgList");
		await axios.get("/api/image/delete/" + id);

		if (newMenu.imgList.length === 0) {
			setIsImageUpload(false);
		}
	};

	const [newMenu, setNewMenu] = useState({
		category: "Catering",
		type: "mainMenu",
		name: "",
		price: "",
		imgList: [],
	});
	const onChange = (e, type) => {
		if (type === "imgList") {
			const cp = { ...newMenu };
			cp[type] = e;
			setNewMenu(cp);
		} else {
			const cp = { ...newMenu };
			cp[type] = e.target.value;
			setNewMenu(cp);
		}
	};

	useEffect(() => {
		setNewMenu({
			category: "Catering",
			type: "mainMenu",
			name: "",
			price: "",
			imgList: [],
		});
	}, []);

	//  메뉴 추가 모달
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

	// 메뉴 추가 시 카테고리 선택 드롭다운
	useEffect(() => {
		if (!modalMenu) return;
		function handleClick(e) {
			if (modalMenuRef.current === null) {
				return;
			} else if (!modalMenuRef.current.contains(e.target)) {
				setModalMenu(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [modalMenu]);

	const submit = () => {
		if (newMenu.name === "") {
			alert("메뉴명을 입력해주세요.");
			nameRef.current.focus();
		} else if (includeImg && newMenu.imgList.length === 0) {
			alert("이미지를 업로드 해주세요.");
		} else {
			axios
				.post(
					"/api/menu/create",
					{
						key: process.env.REACT_APP_API_KEY,
						category: newMenu.category,
						name: newMenu.name,
						imgList: newMenu.imgList,
					},
					{
						headers: {
							"content-type": "application/json",
							Accept: "application/json",
						},
					}
				)
				.then((response) => {
					alert("업로드 되었습니다.");
					// history.push("/community/notice/list");
					document.getElementById("scrollRef").scrollTo(0, 0);
				})
				.catch((response) => {
					console.log("Error!");
				});
		}
	};

	return (
		<>
			<PageLayout>
				<ContentLayout subtitle={""}>
					<div class="flex flex-col">
						<div class="w-full h-12 text-lg font-semibold flex flex-row justify-center items-center mb-2">
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
							class="select-none bg-white w-full md:w-2/3 lg:w-1/2 max-h-full overflow-auto h-auto px-8 py-6"
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
								<div
									ref={modalMenuRef}
									class="w-full h-auto py-6 border-b-2 border-t-2 border-hansupBrown my-2"
								>
									<div class="relative cursor-pointer w-full h-12 mb-4 border-2 border-hansupBrown">
										<div
											onClick={onToggleMenu}
											class="w-full h-full flex justify-between items-center text-hansupBrown font-bold"
										>
											<div class=" w-12 h-full"></div>
											{newMenu.type === "mainMenu" && <p>메인메뉴</p>}
											{newMenu.type === "subMenu" && <p>식사메뉴</p>}
											{newMenu.type === "soup" && <p>국</p>}
											{newMenu.type === "dessert" && <p>디저트</p>}

											<div class=" w-12 h-full flex justify-center items-center">
												<IoIosArrowDown size={28} />
												{/* <IoIosArrowUp size={28} /> */}
											</div>
										</div>
										<div
											class={
												"absolute shadow-xl font-bold w-full h-48 left-0 top-12 border-l-2 border-r-2 border-t-2 border-hansupBrown grid-rows-4 " +
												(modalMenu ? "grid" : "hidden")
											}
										>
											<div
												onClick={() => onChangeMenu("mainMenu")}
												class={
													"flex justify-center items-center border-b-2 border-hansupBrown " +
													(newMenu.type === "mainMenu"
														? "bg-hansupBrown text-white"
														: "bg-white text-hansupBrown")
												}
											>
												메인메뉴
											</div>
											<div
												onClick={() => onChangeMenu("subMenu")}
												class={
													"flex justify-center items-center border-b-2 border-hansupBrown " +
													(newMenu.type === "subMenu"
														? "bg-hansupBrown text-white"
														: "bg-white text-hansupBrown")
												}
											>
												{" "}
												식사메뉴
											</div>
											<div
												onClick={() => onChangeMenu("soup")}
												class={
													"flex justify-center items-center border-b-2 border-hansupBrown " +
													(newMenu.type === "soup"
														? "bg-hansupBrown text-white"
														: "bg-white text-hansupBrown")
												}
											>
												{" "}
												국
											</div>
											<div
												onClick={() => onChangeMenu("dessert")}
												class={
													"flex justify-center items-center border-b-2 border-hansupBrown " +
													(newMenu.type === "dessert"
														? "bg-hansupBrown text-white"
														: "bg-white text-hansupBrown")
												}
											>
												{" "}
												디저트
											</div>
										</div>
									</div>
									<input
										placeholder="음식 이름 입력"
										value={newMenu.name}
										onChange={(e) => onChange(e, "name")}
										ref={nameRef}
										class={
											"h-12 mb-4 w-full border-2 border-gray-300 focus:border-hansupBrown focus:text-hansupBrown transition delay-50 duration-150 flex justify-center items-center font-bold text-center " +
											(newMenu.name === ""
												? "border-gray-300 text-gray-300"
												: "border-hansupBrown text-hansupBrown")
										}
									/>

									{newMenu.imgList.length === 0 && loading ? (
										<div
											onClick={buttonClick}
											class="cursor-pointer w-full h-12 mb-4 border-2 border-gray-300 flex justify-center items-center text-gray-400 font-bold"
										>
											음식 사진 첨부
										</div>
									) : loading ? (
										<div class="w-full h-48 border-2 border-hansupBrown flex justify-center mb-4">
											<img
												onClick={buttonClick}
												class="h-full object-contain"
												src={
													window.location.origin +
													"/api/image/view/" +
													newMenu.imgList[0].filename
												}
												alt="MenuImg"
											/>
										</div>
									) : (
										<div class="w-full h-24 my-2 py-4 flex justify-center items-center text-center">
											<CircularProgress />
										</div>
									)}
								</div>
								<input
									ref={buttonRef}
									type="file"
									class="hidden"
									name="img"
									onChange={onChangeImg}
								/>
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
