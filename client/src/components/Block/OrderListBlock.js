// import NoticeList from "routes/community/data/voiceList";
import OrderBlock from "components/Block/OrderBlock";
import React from "react";

const OrderListBlock = ({ orderList, type, toggleChange }) => {
	return (
		<div class="flex flex-col w-full h-full">
			<div class="h-14 flex flex-row px-8 border-b-2 border-hansupBrown justify-between items-center">
				<div class="hidden md:flex flex-1">일자</div>
				<div class="w-36">주문자</div>
				<div class="w-36">개수</div>
				<div class="w-36">확정여부</div>
			</div>
			{orderList.map((element, index) => {
				return (
					<OrderBlock
						order={element}
						key={element}
						type={type}
						toggleChange={toggleChange}
					/>
				);
			})}
		</div>
	);
};

export default OrderListBlock;
