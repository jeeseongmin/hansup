import React from "react";
import { Route } from "react-router-dom";
import Box from "routes/business/Box";
import Catering from "routes/business/Catering";
import Restaurant from "routes/business/Restaurant";

const Index = () => {
	return (
		<div class="w-full h-auto">
			<switch>
				<Route exact path="/business/restaurant" component={Restaurant} />
				<Route exact path="/business/catering" component={Catering} />
				<Route exact path="/business/box" component={Box} />
			</switch>
		</div>
	);
};

export default Index;
