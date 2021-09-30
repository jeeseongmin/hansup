import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "routes/Home";

const App = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</>
	);
};

export default App;
