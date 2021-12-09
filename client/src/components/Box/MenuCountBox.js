import React, { useState, useEffect, useRef } from "react";
import orderList from "routes/order/catering/data/orderList";

const MenuCountBox = ({ type, dayOrderList, menuList, allMenuList }) => {
	const [title, setTitle] = useState({
		mainMenu: "메인메뉴",
		subMenu: "식사메뉴",
		soup: "국",
		dessert: "디저트",
	});
	const [index, setIndex] = useState({
		mainMenu: 0,
		subMenu: 1,
		soup: 2,
		dessert: 3,
	});

	const [menuInfo, setMenuInfo] = useState({});
	const [menuCount, setMenuCount] = useState({});

	const getList = async () => {
		// 맨처음 메뉴 정보 가져오기 (object)
		// 나중에는 database에서 가져올 예정
		let _menuInfo = await dayOrderList.filter(function (element, index) {
			return element[type];
		});

		let _menuInfo2 = await dayOrderList.map(function (element, index) {
			return {
				count: element.count,
				menu: element[type],
			};
		});
		setMenuInfo(_menuInfo[0]);

		// 예약 별 인원 수와 선택 메뉴 가져오기
		let arr = [];
		for (let i = 0; i < dayOrderList.length; i++) {
			arr.push({
				menu: [...dayOrderList[i][type]],
				count: dayOrderList[i]["count"],
			});
		}
		// 예약 별 인원 수와 선택된 모든 메뉴들에 대한 개수 정리
		let cp = {};
		for (let j = 0; j < arr.length; j++) {
			for (let x = 0; x < arr[j]["menu"].length; x++) {
				if (cp[arr[j]["menu"][x]]) {
					cp[arr[j]["menu"][x]] += arr[j]["count"];
				} else {
					cp[arr[j]["menu"][x]] = arr[j]["count"];
				}
			}
		}
		setMenuCount(cp);
	};

	useEffect(() => {
		getList();
	}, [dayOrderList]);

	return (
		<div class="w-full flex flex-col justify-start items-center">
			<p class="w-full py-4 border-b-2 border-hansupBrown text-hansupBrown font-extrabold text-lg text-center">
				{title[type]}
			</p>
			{menuList[index[type]] &&
				menuList[index[type]].menu.map((element, index) => {
					if (menuCount[element._id]) {
						return (
							<div class="w-full h-12 pl-12 flex flex-row justify-between items-center border-b border-gray-400">
								<p class="flex-1 text-left">
									<b>{element.name}</b>
								</p>
								<p class="w-1/3 text-center mr-8">
									{menuCount[element._id] ? menuCount[element._id] : 0}
								</p>
							</div>
						);
					}
				})}
		</div>
	);
};

export default MenuCountBox;
