import React from "react";
import { Route } from "react-router-dom";
import Menu from "routes/manager/Menu";
import Voice from "routes/manager/Voice";
import Schedule from "routes/manager/Schedule";
import Order from "routes/manager/Order";
import VoiceDetailBlock from "components/Block/VoiceDetailBlock";

const Index = () => {
	return (
		<div class="w-full h-auto">
			<switch>
				<Route exact path="/manager/order" component={Order} />
				<Route exact path="/manager/schedule" component={Schedule} />
				<Route exact path="/manager/menu" component={Menu} />
				<Route exact path="/manager/voice" component={Voice} />
				<Route exact path="/manager/voice/:id" component={VoiceDetailBlock} />
			</switch>
		</div>
	);
};

export default Index;
