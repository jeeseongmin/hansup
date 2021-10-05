import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "routes/Home";
import Navbar from "components/navs/Navbar";
import Footer from "components/footer/Footer";
import Intro from "routes/Intro";
import Business from "routes/Business";
import Community from "routes/Community";
import Order from "routes/Order";
import Organization from "routes/Organization";

const App = () => {
	return (
		<div class="h-full w-full flex flex-col">
			<Navbar />
			<div class="pt-16 h-full w-full">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/intro" component={Intro} />
					<Route exact path="/business" component={Business} />
					<Route exact path="/community" component={Community} />
					<Route exact path="/order" component={Order} />
					<Route exact path="/organization" component={Organization} />
				</Switch>
			</div>
			<Footer />
		</div>
	);
};

export default App;
