import NoticeListBlock from "components/Block/NoticeListBlock";
import ContentLayout from "components/Layout/ContentLayout";
import PageLayout from "components/Layout/PageLayout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateNotice from "routes/community/Notice/CreateNotice";
import NoticeList from "routes/community/Notice/NoticeList";

const Index = () => {
	return (
		<PageLayout>
			<Switch>
				<Route exact path="/community/notice/create" component={CreateNotice} />
				<Route exact path="/community/notice/list" component={NoticeList} />
			</Switch>
		</PageLayout>
	);
};

export default Index;
