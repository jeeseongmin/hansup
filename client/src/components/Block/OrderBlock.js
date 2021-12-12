import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setRefreshVoice } from "reducers/common";
import { useDispatch, useSelector } from "react-redux";

const OrderBlock = ({ order, type }) => {
	const dispatch = useDispatch();
	const history = useHistory();
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

	https: return (
		<div
			// onClick={goPage}
			class={
				"py-4 cursor-pointer transition delay-50 duration-200 h-auto min-h-14 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center " +
				(!order.payed ? "bg-gray-100 hover:bg-gray-200" : "hover:bg-gray-200")
			}
		>
			<div class="flex-1 truncate pr-4 ">{order.date.slice(0, 10)}</div>
			<div class="w-36">{order.name}</div>
			<div class="w-36">{order.count}</div>
			{order.payed ? (
				<div class="w-36 text-red-500">확정</div>
			) : (
				<div class="w-36">미확정</div>
			)}
		</div>
	);
};

export default OrderBlock;
