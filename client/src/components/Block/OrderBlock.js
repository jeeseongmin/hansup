import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setRefreshVoice } from "reducers/common";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import OrderCheckBlock from "components/Block/OrderCheckBlock";

const OrderBlock = ({ order, type, toggleChange }) => {
	const dispatch = useDispatch();
	const history = useHistory();
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

	const goPage = () => {
		if (order.status === "unread") {
			readCheck();
		} else {
			history.push("/manager/voicedetail/" + order._id);
		}
	};
	const refresh_voice = useSelector((state) => state.common.refresh_voice);

	const readCheck = async () => {
		await axios
			.post(
				"/api/order/read/" + order._id,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				// console.log("refresh_voice", refresh_voice);
				if (refresh_voice === "read") {
					dispatch(setRefreshVoice("reread"));
				} else {
					dispatch(setRefreshVoice("read"));
				}
				history.push("/manager/voicedetail/" + order._id);
			})
			.catch((Error) => {
				console.log(Error);
			});
	};

	// 메뉴 리스트 불러오기
	const [allMenuList, setAllMenuList] = useState([]);
	const [listLoading, setListLoading] = useState(true);

	const typeList = [
		{ title: "메인메뉴 (택 4)", type: "mainMenu" },
		{ title: "식사메뉴 (택 4)", type: "subMenu" },
		{ title: "국 (택 1)", type: "soup" },
		{ title: "디저트 (택 5)", type: "dessert" },
	];

	const getList = async () => {
		setListLoading(false);
		await axios
			.post(
				"/api/menu/search/catering",
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				const tmpList = [];
				for (let one of typeList) {
					const cp = Response.data.filter(function (element, index) {
						return element.type === one.type;
					});
					tmpList.push({
						title: one.title,
						type: one.type,
						menu: [...cp],
					});
				}
				let cp2 = {};
				for (let i = 0; i < Response.data.length; i++) {
					cp2[Response.data[i]._id] = Response.data[i];
				}
				setAllMenuList(cp2);
				setListLoading(true);
			})
			.catch((Error) => {
				console.log(Error);
			});
	};
	useEffect(() => {
		getList();
	}, []);

	function leftPad(value) {
		if (value >= 10) {
			return value;
		}
		return `0${value}`;
	}

	function toStringByFormatting(source, delimiter = "-") {
		const year = source.getFullYear();
		const month = leftPad(source.getMonth() + 1);
		const day = leftPad(source.getDate());
		return [year, month, day].join(delimiter);
	}

	return (
		<>
			<div
				onClick={handleOpen}
				ref={clickRef}
				class={
					"py-4 cursor-pointer transition delay-50 duration-200 h-auto min-h-14 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center " +
					(!order.payed ? "bg-gray-100 hover:bg-gray-200" : "hover:bg-gray-200")
				}
			>
				<div class={"hidden md:flex flex-1 truncate pr-4 "}>
					{order.date.slice(0, 10)}
				</div>
				<div class="w-36">{order.name}</div>
				<div class="w-36">{order.count}</div>
				{order.payed ? (
					<div class="w-36 text-red-500">확정</div>
				) : (
					<div class="w-36">미확정</div>
				)}
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
								info={order}
								handleClose={handleClose}
								toggleChange={toggleChange}
								allMenuList={allMenuList}
								listLoading={listLoading}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default OrderBlock;
