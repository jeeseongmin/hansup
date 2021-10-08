import React from "react";
import { Route } from "react-router-dom";
import Guide from "routes/intro/Guide";
import History from "routes/intro/History";
import Introduction from "routes/intro/Introduction";
import Story from "routes/intro/Story";

const Index = () => {
	return (
		<div class="w-full h-full border border-black">
			<switch>
				<Route exact path="/intro/introduction" component={Introduction} />
				<Route exact path="/intro/story" component={Story} />
				<Route exact path="/intro/history" component={History} />
				<Route exact path="/intro/guide" component={Guide} />
			</switch>
		</div>
	);
};

export default Index;
