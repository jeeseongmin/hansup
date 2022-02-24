import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.button`
  display: flex;
  flex-direction: column;
  color: #6c4d3f;
  width: 100%;
  cursor: pointer;
`;

const OrderMenuBlock = ({
  menu,
  url,
  title,
  price,
  setMenu,
  type,
  menuList,
}) => {
  const [selected, setSelected] = useState(false);

  // 모든 메뉴 선택하도록 할 경우
  // const onToggle = () => {
  // 	const cp = { ...menuList };
  // 	if (menuList[type].includes(menu._id)) {
  // 		let arr = [...menuList[type]].filter(function (element, i) {
  // 			return element !== menu._id;
  // 		});
  // 		cp[type] = arr;
  // 		setMenu(cp);
  // 	} else {
  // 		if (type === "mainMenu" && menuList[type].length >= 4) {
  // 			alert("메인 메뉴는 4개까지 선택가능합니다.");
  // 		} else if (type === "subMenu" && menuList[type].length >= 4) {
  // 			alert("식사 메뉴는 4개까지 선택가능합니다.");
  // 		} else if (type === "soup" && menuList[type].length >= 1) {
  // 			alert("국 메뉴는 1개까지 선택가능합니다.");
  // 		} else if (type === "dessert" && menuList[type].length >= 5) {
  // 			alert("디저트 메뉴는 5개까지 선택가능합니다.");
  // 		} else {
  // 			let arr = [...menuList[type], menu._id];
  // 			cp[type] = arr;
  // 			setMenu(cp);
  // 		}
  // 	}
  // };

  // 국만 선택가능할 경우
  const onToggle = () => {
    const cp = { ...menuList };
    if (type === "soup") {
      if (menuList[type].includes(menu._id)) {
        let arr = [...menuList[type]].filter(function (element, i) {
          return element !== menu._id;
        });
        cp[type] = arr;
        setMenu(cp);
      } else {
        if (type === "soup" && menuList[type].length >= 1) {
          alert("국 메뉴는 1개만 선택가능합니다.");
        } else {
          let arr = [...menuList[type], menu._id];
          cp[type] = arr;
          setMenu(cp);
        }
      }
    }
  };

  return (
    <Container
      onClick={onToggle}
      title={menuList[type].includes(menu._id) ? "선택됨" : ""}>
      <div class='h-48 mb-2 relative'>
        <img
          src={
            "http://hansupfood.com/api/image/view/" + menu.imgList[0].filename
          }
          class='h-full w-full object-cover shadow-lg'
          alt={menu.name}
        />
        <div
          class={
            "w-full h-full border-4 border-hansupBrown absolute left-0 bottom-0 flex justify-center items-center " +
            (menuList[type].includes(menu._id) ? "block" : "hidden")
          }>
          <div class='z-10 bg-hansupBrown w-full h-full opacity-60 flex justify-center items-center text-gray-200 relative'></div>
          <div class='absolute w-full h-full left-0 top-0 flex justify-center items-center'>
            <AiOutlineCheck class='z-20 w-3/4 h-3/4 text-white' />
          </div>
        </div>
      </div>
      <div class='text-lg mb-2'>{menu.name}</div>
      {/* <div class="">{price}</div> */}
      {menu.category === "restaurant" && (
        <div class='text-lg mb-2'>{menu.price.toLocaleString()}원</div>
      )}
    </Container>
  );
};

export default OrderMenuBlock;
