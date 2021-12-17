import React from "react";
import { Route } from "react-router-dom";
import Menu from "routes/manager/Menu";
import Voice from "routes/manager/Voice";
import Schedule from "routes/manager/Schedule";
import Order from "routes/manager/Order";
import VoiceDetailBlock from "components/Block/VoiceDetailBlock";
import UpdateOrderPage from "routes/manager/Order/UpdateOrderPage";
import CreateOrderPage from "routes/manager/Order/CreateOrderPage";

const Index = () => {
	return (
		<div class="w-full h-auto">
			<switch>
				<Route exact path="/manager/order/list/:type" component={Order} />
				<Route
					exact
					path="/manager/order/update/:id"
					component={UpdateOrderPage}
				/>
				<Route exact path="/manager/order/create" component={CreateOrderPage} />
				<Route exact path="/manager/order/calendar" component={Schedule} />
				<Route exact path="/manager/menu/:type" component={Menu} />
				<Route exact path="/manager/voice/:type" component={Voice} />
				<Route
					exact
					path="/manager/voicedetail/:id"
					component={VoiceDetailBlock}
				/>
			</switch>
		</div>
	);
};

export default Index;
