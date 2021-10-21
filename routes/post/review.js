// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Review = require("../../models/review.model");
const API_KEY = require("../../keyconfig");

// Create review
router.route("/add").post((req, res) => {
	if (req.body.key === API_KEY) {
		const newOne = new Review({
			content: req.body.content,
			email: req.body.email,
			password: req.body.password,
			response: req.body.response,
			imgList: req.body.imgList,
		});
		console.log(req.body.key, API_KEY);
		console.log(newOne);
		newOne
			.save()
			.then(() => res.json("Review added!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read all review
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Review.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read specific review
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Review.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Review.find()
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 6)
			.limit(6)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/search/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		let search = req.body.text;
		Review.find({
			$or: [
				{ title: { $regex: search, $options: "i" } },
				{ content: { $regex: search, $options: "i" } },
			],
		})
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Update review
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Review.findById(req.params.id)
			.then((one) => {
				one.content = req.body.content;
				one.email = req.body.email;
				one.password = req.body.password;
				one.response = req.body.response;
				one.imgList = req.body.imgList;

				one
					.save()
					.then(() => res.json("Review updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Review.findByIdAndDelete(req.params.id)
			.then(() => res.json("Review deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

module.exports = router;
