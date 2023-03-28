import React from "react";
import { Route } from "react-router-dom";
import CateringIntro from "routes/order/catering/Intro";
import CateringMenu from "routes/order/catering/Menu";

const Index = () => {
  return (
    <div class="w-full h-auto">
      <switch>
        <Route exact path="/order/catering/menu" component={CateringMenu} />
        <Route exact path="/order/catering/intro" component={CateringIntro} />
        {/*<Route exact path="/order/catering/orderMain" component={OrderMain} />*/}
        {/*<Route*/}
        {/*	exact*/}
        {/*	path="/order/catering/ordering"*/}
        {/*	component={CateringOrdering}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*	exact*/}
        {/*	path="/order/catering/orderCheck"*/}
        {/*	component={CateringCheck}*/}
        {/*/>*/}
      </switch>
    </div>
  );
};

export default Index;
