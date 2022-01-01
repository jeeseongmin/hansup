import dayjs from "dayjs";
import React, { useRef, useState } from "react";

const OrderBillBlock = ({
	listLoading,
	info,
	dayArr,
	printInfo,
	printMenu,
}) => {
	return (
		<div class="w-full p-8 border border-black">
			<p class="text-xl font-bold mb-1">
				케이터링 ({new Date(info.date).getMonth() + 1}/
				{new Date(info.date).getDate()},{" "}
				{dayArr[dayjs(new Date(info.date)).get("day")]})
			</p>
			<div class="flex justify-between">
				<p class="text-lg font-bold mb-1">
					<span class="text-red-500">{info.count}명</span> X{" "}
					{Number(printInfo.price).toLocaleString()}원
				</p>
				<p class="text-lg font-bold mb-2 text-blue-500">
					{new Date(info.date).getHours() +
						"시 " +
						(new Date(info.date).getMinutes() === 0
							? "00"
							: new Date(info.date).getMinutes()) +
						"분"}{" "}
				</p>
			</div>
			<div class="flex justify-between">
				<p class="text-md font-bold mb-2">{info.phone}</p>
				<p class="text-md font-bold mb-2 text-red-500">
					{info.payment === "card"
						? "카드결제"
						: info.payment === "cash"
						? "현금결제"
						: "계좌이체"}
				</p>
			</div>
			{info.payment !== "card" && info.cashReceipt.status && (
				<>
					<div class="flex flex-col justify-between border-2 border-gray-200 p-4 mb-2">
						<div class="flex flex-row justify-between">
							<p class="text-base font-bold mb-1">현금영수증 : </p>
							<p class="text-base font-bold mb-1">
								{info.cashReceipt.type === "business"
									? "사업자증빙"
									: "개인소득공제"}
							</p>
						</div>
						<p class="text-base font-bold">{info.cashReceipt.number}</p>
					</div>
				</>
			)}
			<div class="text-red-500 font-bold mb-1">
				- {info.delivery === "delivery" ? info.address : "직접 수령"}
			</div>
			<p class="text-lg font-bold mb-1">
				{info.request === "" ? "고객 요청사항 없음" : "- " + info.request}
			</p>
			{printInfo.description.length === 0 ||
			printInfo.description.filter(function (element, index) {
				return !element.isDeleted;
			}).length === 0
				? ""
				: printInfo.description
						.filter(function (element, index) {
							return !element.isDeleted;
						})
						.map((element, index) => {
							return <p class="text-lg font-bold mb-1">- {element.text}</p>;
						})}
			<div class="w-full mt-2">
				<div class="border-l border-r border-t border-black flex flex-col">
					<div
						class={
							"flex flex-row font-bold border-b border-black " +
							(info.mainMenu.concat(info.subMenu, info.soup, info.dessert)
								.length < 16
								? "h-8 text-lg"
								: "h-6 text-md")
						}
					>
						<div class="w-16 flex justify-center items-center border-r border-black">
							NO
						</div>
						<div class="flex-1 flex justify-center items-center">음식명</div>
					</div>
					{listLoading &&
						printMenu.map((element, index) => {
							return (
								<div
									class={
										"flex-row font-bold border-b border-black " +
										(printMenu.length < 16 ? "h-8 text-lg " : "h-6 text-md ") +
										(element.isDeleted ? " hidden " : " flex ")
									}
								>
									<div class="w-16 flex justify-center items-center border-r border-black">
										{index + 1}
									</div>
									<div class="flex-1 flex justify-center items-center">
										{element.name}
									</div>
								</div>
							);
						})}{" "}
				</div>
			</div>
		</div>
	);
};

export default OrderBillBlock;
