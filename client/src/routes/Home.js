import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
	const [data, setData] = useState({});
	useEffect(() => {
		console.log("Home");
		axios
			.get("/data")
			.then((result) => {
				setData(result);
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			{data.lastname} {data.firstname}
		</div>
	);
};

export default Home;
