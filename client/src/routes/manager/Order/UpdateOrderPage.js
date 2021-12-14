import Modal from "@mui/material/Modal";
import InfoBlock from "components/Block/InfoBlock";
import PopupPostCodeBlock from "components/Block/PopupPostCodeBlock";
import Switch from "@mui/material/Switch";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import Subtitle from "components/Subtitle";
import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { setRefreshOrder } from "reducers/common";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import InputBox from "components/Box/InputBox";
import PageLayout from "components/Layout/PageLayout";

const UpdateOrderPage = ({ match }) => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [orderList, setOrderList] = useState([]);
	const modalMenuRef = useRef();
	const [change, setChange] = useState(false);
	const [info, setInfo] = useState({});

	const editOrder = async () => {};

	// for update order

	const nameRef = useRef();
	const phone1Ref = useRef();
	const phone2Ref = useRef();
	const phone3Ref = useRef();
	const check1Ref = useRef();
	const check2Ref = useRef();
	const check3Ref = useRef();
	const countRef = useRef();
	const requestRef = useRef();
	const address1Ref = useRef();
	const address2Ref = useRef();
	const addressBtnRef = useRef();
	const clickAddress = (address) => {
		const cp = { ...info };
		cp["address1"] = address;
		setInfo(cp);
	};

	const changeInfo = (e, type) => {
		if (type === "date" || type === "delivery") {
			if (type === "date") {
				let prev = new Date();
				prev.setDate(prev.getDate() + 1);
				var selected = dayjs(
					e.getFullYear() + "-" + e.getMonth() + "-" + e.getDate()
				).add(1, "month");
				if (
					!selected.isAfter(dayjs().add(1, "day")) ||
					!selected.isBefore(dayjs().add(2, "month"))
				) {
					alert("현재일 기준 이틀 뒤부터 2개월 이내까지 선택 가능합니다.");
					let init = dayjs().add(2, "day");
					let newDate = new Date(
						init.get("year"),
						init.get("month"),
						init.get("date"),
						14,
						0,
						0
					);
					const cp = { ...info };
					cp[type] = newDate;
					setInfo(cp);
					return;
				} else if (e.getHours() < 9 || e.getHours() > 22) {
					alert("오전 9시 ~ 오후 10시 사이에만 가능합니다.");
					selected.set("hour", 14);
					let newDate = new Date(
						selected.get("year"),
						selected.get("month"),
						selected.get("date"),
						14,
						0,
						0
					);
					const cp = { ...info };
					cp[type] = newDate;
					setInfo(cp);
					return;
				}
			}
			const cp = { ...info };
			cp[type] = e;
			setInfo(cp);
		} else {
			const cp = { ...info };
			cp[type] = e.target.value;
			setInfo(cp);
		}
	};

	const updateOrder = async () => {
		await axios
			.post(
				"/api/order/update/" + info._id,
				{
					key: process.env.REACT_APP_API_KEY,
				},
				{
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((response) => {
				// toggleChange();
				// alert("삭제되었습니다.");
				// if (refresh_order === "delete") {
				// 	dispatch(setRefreshOrder("redelete"));
				// } else dispatch(setRefreshOrder("delete"));
				// handleClose();
			})
			.catch((response) => {
				console.log("Error!");
			});
	};

	const dateToString = (date) => {
		return (
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1).toString().padStart(2, "0") +
			"-" +
			date.getDate().toString().padStart(2, "0") +
			" " +
			date.getHours().toString().padStart(2, "0") +
			":" +
			date.getMinutes().toString().padStart(2, "0")
		);
	};
	const DateInput = ({ value, onClick }) => {
		return (
			<div
				onClick={onClick}
				class="w-full h-full flex justify-center items-center cursor-pointer"
			>
				<AiTwotoneCalendar size={24} />
			</div>
		);
	};
	return (
		<PageLayout>
			<div class={"w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 "}>
				<div class="w-full flex flex-col justify-between items-start mb-4">
					<div class="inline-flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-6">
						<Subtitle subtitle={"예약 수정하기"} />
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default UpdateOrderPage;
