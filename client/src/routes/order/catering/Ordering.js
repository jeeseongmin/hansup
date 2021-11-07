import StepBox from "components/Box/StepBox";
import PageLayout from "components/Layout/PageLayout";
import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import OrderStep1 from "routes/order/catering/OrderStep1";
import OrderStep2 from "routes/order/catering/OrderStep2";
import OrderStep3 from "routes/order/catering/OrderStep3";
import OrderFinal from "routes/order/catering/OrderFinal";
import axios from "axios";

const Ordering = () => {
	const [step, setStep] = useState(1);
	const [info, setInfo] = useState({
		name: "",
		phone1: "",
		phone2: "",
		phone3: "",
		count: "",
		request: "",
		date: new Date(),
		delivery: "delivery",
		address1: "",
		address2: "",
		mainMenu: [],
		subMenu: [],
		soup: [],
		dessert: [],
		payment: "card",
		cashReceipt: {
			status: false,
			type: "personal",
			number: "",
		},
		payed: false,
	});

	const [menuList, setMenuList] = useState([]);
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
		console.log("getList");
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
				console.log(Response.data);
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
				setMenuList(tmpList);
				setListLoading(true);
			})
			.catch((Error) => {
				console.log(Error);
			});
	};
	useEffect(() => {
		getList();
	}, []);

	const changeInfo = (e, type) => {
		if (type === "date" || type === "delivery") {
			const cp = { ...info };
			cp[type] = e;
			setInfo(cp);
		} else {
			const cp = { ...info };
			cp[type] = e.target.value;
			setInfo(cp);
		}
	};
	return (
		<PageLayout>
			<div class="z-30 w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 ">
				<div class="grid-cols-3 gap-8 mb-8 hidden lg:grid">
					<StepBox
						step={step}
						current={1}
						text={"1. 예약정보 입력"}
						setStep={setStep}
					/>
					<StepBox
						step={step}
						current={2}
						text={"2. 메뉴 선택"}
						setStep={setStep}
					/>
					<StepBox step={step} current={3} text={"3. 결제"} setStep={setStep} />
				</div>
				<div class="grid grid-cols-1 gap-8 mb-8 lg:hidden">
					{step === 1 && (
						<StepBox
							step={step}
							current={1}
							text={"1. 예약정보 입력"}
							setStep={setStep}
						/>
					)}
					{step === 2 && (
						<StepBox
							step={step}
							current={2}
							text={"2. 메뉴 선택"}
							setStep={setStep}
						/>
					)}
					{step === 3 && (
						<StepBox
							step={step}
							current={3}
							text={"3. 결제"}
							setStep={setStep}
						/>
					)}
				</div>
				<div class="w-full relative border-b border-hansupBrown mb-16">
					<div class="absolute w-full left-0 -bottom-2 grid grid-cols-3 gap-8">
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +
									(step === 0
										? "bg-none"
										: step === 1
										? "bg-hansupBrown"
										: "bg-white border border-hansupBrown")
								}
							>
								{step !== 0 && step !== 1 && (
									<AiOutlineCheck class="w-3/4 h-3/4" />
								)}
							</div>
						</div>
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +
									(step === 1
										? "bg-none"
										: step === 2
										? "bg-hansupBrown"
										: "bg-white border border-hansupBrown")
								}
							>
								{step !== 1 && step !== 2 && (
									<AiOutlineCheck class="w-3/4 h-3/4" />
								)}
							</div>
						</div>
						<div class="flex justify-center items-center">
							<div
								class={
									"rounded-full transition delay-50 duration-100 h-4 w-4 flex justify-center items-center " +
									(step === 1 || step === 2
										? "bg-none"
										: step === 3
										? "bg-hansupBrown"
										: "bg-white border border-hansupBrown")
								}
							>
								{step !== 1 && step !== 2 && step !== 3 && (
									<AiOutlineCheck class="w-3/4 h-3/4" />
								)}
							</div>
						</div>
					</div>
				</div>
				{step === 1 && (
					<OrderStep1
						info={info}
						setInfo={setInfo}
						setStep={setStep}
						changeInfo={changeInfo}
					/>
				)}
				{step === 2 && (
					<OrderStep2
						info={info}
						setInfo={setInfo}
						setStep={setStep}
						menuList={menuList}
						listLoading={listLoading}
					/>
				)}
				{step === 3 && (
					<OrderStep3
						info={info}
						setInfo={setInfo}
						setStep={setStep}
						changeInfo={changeInfo}
						allMenuList={allMenuList}
					/>
				)}
				{step === 4 && (
					<OrderFinal
						info={info}
						allMenuList={allMenuList}
					/>
				)}
			</div>
		</PageLayout>
	);
};

export default Ordering;
