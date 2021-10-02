import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "routes/Home";
import Navbar from "components/navs/Navbar";
import Footer from "components/footer/Footer";

const App = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</>
	);
};

export default App;
