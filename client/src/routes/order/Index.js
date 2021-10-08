import React from "react";
import { Route } from "react-router-dom";
import CateringIntro from "routes/order/catering/Intro";
import CateringMenu from "routes/order/catering/Menu";
import CateringOrdering from "routes/order/catering/Ordering";

const Index = () => {
	return (
		<div class="w-full h-full">
			<switch>
				<Route exact path="/order/catering/menu" component={CateringMenu} />
				<Route exact path="/order/catering/intro" component={CateringIntro} />
				<Route
					exact
					path="/order/catering/ordering"
					component={CateringOrdering}
				/>
			</switch>
		</div>
	);
};

export default Index;
