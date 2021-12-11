// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Voice = require("../../models/voice.model");
const API_KEY = require("../../keyconfig");

// Create voice
router.route("/create").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			status: req.body.status,
			title: req.body.title,
			content: req.body.content,
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			isDeleted: false,
		};

		const newOne = new Voice(one);

		newOne
			.save()
			.then(() => res.json("Voice created!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read all voice
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read voice (type)
router.route("/type/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		if (req.params.type === "all") {
			Voice.find({
				$and: [{ isDeleted: false }],
			})
				.sort({ createdAt: -1 })
				.then((all) => res.json(all))
				.catch((err) => res.status(400).json("Error: " + err));
		} else {
			Voice.find({
				$and: [
					{ isDeleted: false },
					{
						$or: [{ status: { $regex: req.params.type, $options: "i" } }],
					},
				],
			})
				.sort({ createdAt: -1 })
				.then((all) => res.json(all))
				.catch((err) => res.status(400).json("Error: " + err));
		}
	} else return res.status(400).json("Error");
});

// Read specific voice
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// router.route("/search/:page").post((req, res) => {
// 	if (req.body.key === API_KEY) {
// 		let search = req.body.text;
// 		Voice.find({
// 			$or: [
// 				{ email: { $regex: search, $options: "i" } },
// 				{ title: { $regex: search, $options: "i" } },
// 				{ content: { $regex: search, $options: "i" } },
// 			],
// 		})
// 			.sort({ createdAt: -1 })
// 			.skip((req.params.page - 1) * 10)
// 			.limit(10)
// 			.then((all) => res.json(all))
// 			.catch((err) => res.status(400).json("Error: " + err));
// 	} else return res.status(400).json("Error");
// });

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.find()
			.sort({ createdAt: -1, status: 1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// paging
router.route("/page/:page/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		if (req.params.type === "all") {
			Voice.find({
				$and: [{ isDeleted: false }],
			})
				.sort({ createdAt: -1, status: 1 })
				.skip((req.params.page - 1) * 10)
				.limit(10)
				.then((all) => res.json(all))
				.catch((err) => res.status(400).json("Error: " + err));
		} else {
			Voice.find({
				$and: [
					{ isDeleted: false },
					{
						$or: [{ status: { $regex: req.params.type, $options: "i" } }],
					},
				],
			})
				.sort({ createdAt: -1, status: 1 })
				.skip((req.params.page - 1) * 10)
				.limit(10)
				.then((all) => res.json(all))
				.catch((err) => res.status(400).json("Error: " + err));
		}
	} else return res.status(400).json("Error");
});

// Respond voice
router.route("/read/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.findById(req.params.id)
			.then((one) => {
				one.status = "readcheck";

				one
					.save()
					.then(() => res.json("Voice read!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Update voice
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.findById(req.params.id)
			.then((one) => {
				one.status = req.body.status;
				one.title = req.body.title;
				one.content = req.body.content;
				one.name = req.body.name;
				one.phone = req.body.phone;
				one.email = req.body.email;

				one
					.save()
					.then(() => res.json("Voice updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.findByIdAndDelete(req.params.id)
			.then(() => res.json("Voice deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/deletecheck/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Voice.findById(req.params.id)
			.then((one) => {
				one.isDeleted = true;

				one
					.save()
					.then(() => res.json("Voice updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

module.exports = router;
