import React from "react";
import { Route } from "react-router-dom";
import CateringIntro from "routes/order/catering/Intro";
import CateringMenu from "routes/order/catering/Menu";
import CateringOrdering from "routes/order/catering/Ordering";
import CateringCheck from "routes/order/catering/OrderCheck";
import OrderMain from "routes/order/catering/OrderMain";

const Index = () => {
	return (
		<div class="w-full h-auto">
			<switch>
				<Route exact path="/order/catering/menu" component={CateringMenu} />
				<Route exact path="/order/catering/intro" component={CateringIntro} />
				<Route exact path="/order/catering/orderMain" component={OrderMain} />
				<Route
					exact
					path="/order/catering/ordering"
					component={CateringOrdering}
				/>
				<Route
					exact
					path="/order/catering/orderCheck"
					component={CateringCheck}
				/>
			</switch>
		</div>
	);
};

export default Index;
