import React from "react";
import { Route } from "react-router-dom";
import Menu from "routes/manager/Menu";
import Schedule from "routes/manager/Schedule";
import Order from "routes/manager/Order";

const Index = () => {
	return (
		<div class="w-full h-full">
			<switch>
				<Route exact path="/manager/order" component={Order} />
				<Route exact path="/manager/schedule" component={Schedule} />
				<Route exact path="/manager/menu" component={Menu} />
			</switch>
		</div>
	);
};

export default Index;
