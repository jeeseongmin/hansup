import PageLayout from "components/Layout/PageLayout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateVoice from "routes/community/Voice/CreateVoice";
import Main from "routes/community/Voice/Main";

const Index = () => {
	return (
		<PageLayout>
			<Switch>
				<Route exact path="/community/voice/create" component={CreateVoice} />
				<Route exact path="/community/voice/main" component={Main} />
			</Switch>
		</PageLayout>
	);
};

export default Index;
