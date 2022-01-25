import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppRouter from "AppRouter";
import { BrowserRouter } from "react-router-dom";
import "index.css";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import configureStore from "app/store";
const { store, persistor } = configureStore();

if (
	navigator.userAgent.indexOf("MSIE") !== -1 ||
	!!document.documentMode === true
) {
	console.log("Internet Explorer");
} else console.log("navigator.userAgent", navigator.userAgent);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<AppRouter />
			</PersistGate>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
