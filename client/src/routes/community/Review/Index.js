import PageLayout from "components/Layout/PageLayout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateReview from "routes/community/Review/CreateReview";
import ReviewList from "routes/community/Review/ReviewList";

const Index = () => {
	return (
		<PageLayout>
			<Switch>
				<Route exact path="/community/review/create" component={CreateReview} />
				<Route exact path="/community/review/list" component={ReviewList} />
			</Switch>
			{/* <ContentLayout subtitle={"리뷰"}></ContentLayout> */}
		</PageLayout>
	);
};

export default Index;
