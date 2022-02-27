import FoodMenuBlock from "components/Block/FoodMenuBlock";
import ManageMenuBlock from "components/Block/ManageMenuBlock";
import Example from "image/example.png";
import React from "react";
import styled from "styled-components";
import Ready from "image/ready.png";

const MenuTitle = styled.div`
  color: #6c4d3f;
  font-size: 1.5rem;
`;

const Line = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  border-top: 1px solid #6c4d3f;
`;
const MenuListLayout = ({ info, col, type, use, updateMenu, deleteMenu }) => {
  const colStyle = "grid-cols-" + col;
  const readyBox = {};
  return info.menu.length !== 0 ? (
    <>
      <div class='mb-16'>
        <MenuTitle>{info.title}</MenuTitle>
        <Line></Line>
        {type === "manager" && (
          <div class={"w-full grid grid-cols-2 gap-5 lg:grid-cols-5"}>
            {info.menu.map((element, index) => {
              return (
                <ManageMenuBlock
                  menu={element}
                  key={index}
                  use={use}
                  updateMenu={updateMenu}
                  deleteMenu={deleteMenu}
                />
              );
            })}
          </div>
        )}
        {type === "view" && (
          <div class={"w-full grid grid-cols-2 gap-5 lg:grid-cols-5"}>
            {info.menu.map((element, index) => {
              return <FoodMenuBlock menu={element} />;
            })}
          </div>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default MenuListLayout;
