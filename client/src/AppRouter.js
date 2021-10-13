import Layout from "components/Layout/Layout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Business from "routes/business/Index";
import Community from "routes/community/Index";
import Enterprise from "routes/enterprise/Index";
import Home from "routes/Home";
import Intro from "routes/intro/Index";
import Manager from "routes/manager/Index";
import Order from "routes/order/Index";

const App = () => {
	return (
		<div
			id="scrollRef"
			class="h-screen select-none w-full flex flex-col overflow-y-scroll scrollbar-hide relative"
		>
			<>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/intro/:submenu" component={Intro} />
						<Route path="/business/:submenu" component={Business} />
						<Route path="/community/:submenu" component={Community} />
						<Route path="/order/:type/:submenu" component={Order} />
						<Route path="/enterprise/:submenu" component={Enterprise} />
						<Route path="/manager/:submenu" component={Manager} />
					</Switch>
				</Layout>
			</>
		</div>
	);
};

export default App;
