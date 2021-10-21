import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import ContentLayout from "components/Layout/ContentLayout";
import CircularProgress from "@mui/material/CircularProgress";

const NoticeDetailBlock = ({ match }) => {
	const [loading, setLoading] = useState(false);
	const [imgLoading, setImgLoading] = useState(false);
	const [notice, setNotice] = useState({});

	useEffect(() => {
		axios
			.post(
				"/api/notice/" + match.params.id,
				{ key: process.env.REACT_APP_API_KEY },
				{
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
				}
			)
			.then((Response) => {
				// console.log(Response);
				setNotice(Response.data);
				setLoading(true);
				setTimeout(function () {
					setImgLoading(true);
				}, 1000);
			})
			.catch((Error) => {
				console.log(Error);
			});
	}, []);

	return loading ? (
		<>
			<ContentLayout subtitle={"자세히보기"}>
				<div class="flex flex-col w-full h-full border-t-2 border-b-2 border-hansupBrown mb-8 ">
					<div class="min-h-full lg:min-h-14 h-auto py-4 flex flex-col lg:flex-row px-4 lg:px-8 border-b-2 border-gray-200 jutsify-start lg:justify-between items-start lg:items-center">
						<div class="flex-1 pr-4 mb-4 lg:mb-0 font-bold ">
							<p class="w-full break-all">{notice.title}</p>
						</div>
						<div class="w-full lg:w-36">
							{notice.createdAt &&
								notice.createdAt.substr(2, 8).replace(/[-]/g, ".")}
						</div>
					</div>
					<div
						class={
							"w-full px-2 lg:px-8 py-4  flex-col justify-end items-center border-t border-gray-300 " +
							(notice.imgList.length === 0 ? "hidden" : "flex")
						}
					>
						{!loading ? (
							<CircularProgress />
						) : (
							notice.imgList.map((element, index) => {
								return (
									<div class="w-2/3 lg:w-1/2 flex justify-center items-center my-4">
										{/* <img
											class="w-full object-cover"
											src={
												window.location.origin +
												"/api/image/view/" +
												element.filename
											}
											alt="img"
										/> */}
										{imgLoading ? (
											<img
												class="w-full object-cover"
												src={
													"http://localhost:5000/api/image/view/" +
													element.filename
												}
												alt="img"
											/>
										) : (
											<Skeleton variant="rectangular" height={150} />
										)}
									</div>
								);
							})
						)}
					</div>
					<div
						class={
							"w-full py-8 px-4 lg:px-8 border-t overflow-y-auto border-gray-300 " +
							(notice.imgList.length === 0 ? "h-96" : "h-auto")
						}
					>
						<p class="w-full break-all">{notice.content}</p>
					</div>
				</div>
				<div class="flex justify-between items-center flex-col md:flex-row">
					<Link
						class="mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
						to={"/community/notice/list"}
						onClick={() => window.scrollTo(0, 0)}
					>
						뒤로 가기
					</Link>
					{/* <button
							onClick={submit}
							class="outline-none w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
						>
							제출하기
						</button> */}
				</div>
			</ContentLayout>
		</>
	) : (
		<>
			<ContentLayout subtitle={"자세히보기"}>
				<div class="flex flex-col w-full h-full border-t-2 border-b-2 border-hansupBrown mb-8">
					<div class="min-h-14 h-auto py-4 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center">
						<div class="flex-1 pr-4 ">
							<Skeleton animation="wave" height={35} />
						</div>
						<div class="w-36">
							<Skeleton animation="wave" height={35} />
						</div>
					</div>

					<div class="w-full py-8 h-96 px-8 border-b-2 border-gray-200">
						<Skeleton animation="wave" height={35} />
					</div>
				</div>
				<div class="flex justify-between items-center flex-col md:flex-row">
					<Link
						class="mb-4 md:mb-0 w-full md:w-auto  cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
						to={"/community/notice/list"}
						onClick={() => window.scrollTo(0, 0)}
					>
						뒤로 가기
					</Link>
					{/* <button
							onClick={submit}
							class="outline-none w-full md:w-auto cursor-pointer px-0 md:px-16 py-2 justify-center border border-hansupBrown text-hansupBrown flex flex-row items-center hover:bg-hansupBrown hover:text-white hover:font-bold"
						>
							제출하기
						</button> */}
				</div>
			</ContentLayout>
		</>
	);
};

export default NoticeDetailBlock;
