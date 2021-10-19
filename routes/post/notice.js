// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Notice = require("../../models/notice.model");
const API_KEY = require("../../keyconfig");

// Read all notice
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

// Read specific notice
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// Read specific type notice
// org1, org2, org3, org4, participation
router.route("/type/:type/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.find({ type: req.params.type })
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// Read specific type notice
// org1, org2, org3, org4, participation
router.route("/type/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.find({ type: req.params.type })
			.sort({ createdAt: -1 })
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// { $text: { $search: req.params.text } }
router.route("/search/:type/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		let search = req.body.text;
		Notice.find({
			$and: [
				{ type: req.params.type },
				{
					$or: [
						{ title: { $regex: search, $options: "i" } },
						{ content: { $regex: search, $options: "i" } },
					],
				},
			],
		})
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// Read specific type notice
// org1, org2, org3, org4, participation
router.route("/search/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		let search = req.body.text;
		Notice.find({
			$and: [
				{ type: req.params.type },
				{
					$or: [
						{ title: { $regex: search, $options: "i" } },
						{ content: { $regex: search, $options: "i" } },
					],
				},
			],
		})
			.sort({ createdAt: -1 })
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.find()
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

// Create notice
router.route("/add/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			type: req.params.type,
			title: req.body.title,
			content: req.body.content,
		};

		const newOne = new Notice(one);

		newOne
			.save()
			.then(() => res.json("Notice added!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

// Update notice
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.findById(req.params.id)
			.then((one) => {
				one.title = req.body.title;
				one.content = req.body.content;

				one
					.save()
					.then(() => res.json("Notice updated!"))
					.catch((err) => res.status(400).json("Error: " + req));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Notice.findByIdAndDelete(req.params.id)
			.then(() => res.json("Notice deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

module.exports = router;
