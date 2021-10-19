// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Counseling = require("../../models/voice.model");
const API_KEY = require("../../keyconfig");

// Read all counseling
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});
router.route("/search").post((req, res) => {
	if (req.body.key === API_KEY) {
		let search = req.body.text;
		Counseling.find({
			$or: [
				{ title: { $regex: search, $options: "i" } },
				{ content: { $regex: search, $options: "i" } },
			],
		})
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read specific counseling
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.find()
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/search/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		let search = req.body.text;
		Counseling.find({
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

// Create counseling
router.route("/add/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			status: req.params.type,
			title: req.body.title,
			content: req.body.content,
			writer: req.body.writer,
			password: req.body.password,
			response: req.body.response,
		};

		const newOne = new Counseling(one);

		newOne
			.save()
			.then(() => res.json("Counseling added!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Update counseling
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.findById(req.params.id)
			.then((one) => {
				// 작성자와 일치하는지
				one.title = req.body.title;
				one.content = req.body.content;

				one
					.save()
					.then(() => res.json("Counseling updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Respond counseling
router.route("/read/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.findById(req.params.id)
			.then((one) => {
				one.status = req.body.status;

				one
					.save()
					.then(() => res.json("Counseling read!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Respond counseling
router.route("/respond/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.findById(req.params.id)
			.then((one) => {
				one.status = req.body.status;
				one.response = req.body.response;

				one
					.save()
					.then(() => res.json("Counseling responded!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Counseling.findByIdAndDelete(req.params.id)
			.then(() => res.json("Counseling deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

module.exports = router;
