import React from "react";
import { Route } from "react-router-dom";
import Hansup from "routes/enterprise/Hansup";

const Index = () => {
	return (
		<div class="w-full h-auto">
			<switch>
				<Route exact path="/enterprise/hansup" component={Hansup} />
			</switch>
		</div>
	);
};

export default Index;
