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
	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div class="w-full flex flex-col justify-center items-center">
			<form class="w-full mb-8" onSubmit={onSubmit}>
				{[0, 1, 2, 3].map((element, index) => {
					return (
						<OrderListLayout
							key={orderList[element]}
							info={orderList[element]}
							col={5}
							type={"select"}
						/>
					);
				})}{" "}
				<div class="w-full flex justify-center items-center">
					<div class="w-full md:w-2/3 lg:w-1/2 h-12">
						<SubmitButton text={"다음"} onSubmit={(e) => onSubmit(e)} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default OrderStep2;
