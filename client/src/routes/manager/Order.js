import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import MenuListLayout from "components/Layout/MenuListLayout";
import orderList from "routes/order/catering/data/orderList";

const Order = () => {
	return (
		<PageLayout>
			<ContentLayout subtitle={"예약관리"}>
				<div class="flex flex-col">
					<p class="text-hansupBrown text-lg mb-8 font-semibold">
						확정된 예약과 미확정 예약을 보여줍니다. (default 미확정 예약)
					</p>
					{[0, 1, 2, 3].map((element, index) => {
						return (
							<MenuListLayout
								key={index}
								info={orderList[element]}
								col={5}
								type={"select"}
							/>
						);
					})}{" "}
				</div>
			</ContentLayout>
		</PageLayout>
	);
};

export default Order;
