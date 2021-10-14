import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";
import InfoBlock from "components/Block/InfoBlock";
import InputBox from "components/Box/InputBox";
import SubmitButton from "components/Button/SubmitButton";
import CateringMenuBlock from "components/Block/CateringMenuBlock";
import orderList from "routes/order/catering/data/orderList";
import OrderListLayout from "components/Layout/OrderListLayout";

const OrderStep2 = () => {
	return (
		<div class="w-full flex flex-col justify-center items-center">
			<form class="w-full">
				{[0, 1, 2].map((element, index) => {
					return (
						<OrderListLayout
							key={orderList[element]}
							info={orderList[element]}
							col={5}
						/>
					);
				})}{" "}
				{/* <InfoBlock title={"메인메뉴 (택 4)"}>
					{<OrderListLayout subtitle={"메인메뉴 (택 4)"}></OrderListLayout>}
				</InfoBlock>
				<InfoBlock title={"식사메뉴 (택 4)"}></InfoBlock>
				<InfoBlock title={"국 (택 1)"}></InfoBlock>
				<InfoBlock title={"디저트 (택 5)"}></InfoBlock> */}
			</form>
		</div>
	);
};

export default OrderStep2;
