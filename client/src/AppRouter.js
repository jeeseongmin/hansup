import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "routes/Home";
import Navbar from "components/navs/Navbar";
import Footer from "components/footer/Footer";

const App = () => {
	return (
		<>
			<Navbar />
			<div class="pt-16 border border-black h-full w-full">
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
			<Footer />
		</>
	);
};

export default App;
