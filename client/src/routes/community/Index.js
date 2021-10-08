import React from "react";
import { Route } from "react-router-dom";
import Notice from "routes/community/Notice";
import Review from "routes/community/Review";
import Voice from "routes/community/Voice";

const Index = () => {
	return (
		<div class="w-full h-full">
			<switch>
				<Route exact path="/community/notice" component={Notice} />
				<Route exact path="/community/review" component={Review} />
				<Route exact path="/community/voice" component={Voice} />
			</switch>
		</div>
	);
};

export default Index;
