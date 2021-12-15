import React, { useState, useEffect, useRef } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import CateringMenu from "image/order-catering-img1.png";
import orderList from "routes/order/catering/data/orderList";
import ImageLabel from "components/ImageLabel";
import CateringImg2 from "image/order-catering-img2.png";
import CateringImg3 from "image/order-catering-img3.png";
import OrderListLayout from "components/Layout/OrderListLayout";
import axios from "axios";

const Menu = () => {
	const [menuList, setMenuList] = useState([]);
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

	return (
		<PageLayout>
			<ContentLayout subtitle={"메뉴 구성"}>
				<div class="flex flex-col">
					<p class="text-hansupBrown text-lg mb-8 font-semibold">
						케이터링의 메뉴 구성은 메인메뉴 5개, 식사메뉴 5개, 디저트 5개로,
						달마다 구성이 조금씩 달라집니다.
					</p>
					<img src={CateringMenu} alt="img1" class="w-full object-cover" />
				</div>
			</ContentLayout>
			<ContentLayout subtitle={"케이터링 이달의 메뉴"}>
				{listLoading &&
					menuList.map((element, index) => {
						return (
							<OrderListLayout
								key={element}
								info={element}
								col={5}
								type={"view"}
							/>
						);
					})}{" "}
			</ContentLayout>
			<div class="px-8 lg:px-40 w-full flex flex-col mb-8">
				<ImageLabel
					text={"케이터링 안내"}
					imgUrl={CateringImg2}
					url={"/order/catering/intro"}
				/>
				<ImageLabel
					text={"케이터링 주문"}
					imgUrl={CateringImg3}
					url={"/order/catering/ordering"}
				/>
			</div>
		</PageLayout>
	);
};

export default Menu;
