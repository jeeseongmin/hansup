// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Gallery = require("../../models/gallery.model");
const API_KEY = require("../../keyconfig");

// Read all gallery
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

// Read specific gallery
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// Read specific type gallery
// org1, org2, org3, org4, participation
router.route("/type/:type/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.find({ type: req.params.type })
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 8)
			.limit(8)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// Read specific type notice
// org1, org2, org3, org4, participation
router.route("/type/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.find({ type: req.params.type })
			.sort({ createdAt: -1 })
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.find()
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

// Create gallery
router.route("/add/:type").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			type: req.params.type,
			title: req.body.title,
			content: req.body.content,
			imgList: req.body.imgList,
		};

		const newOne = new Gallery(one);

		newOne
			.save()
			.then(() => res.json("Gallery added!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

// Update gallery
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.findById(req.params.id)
			.then((one) => {
				one.title = req.body.title;
				one.content = req.body.content;
				one.imgList = req.body.imgList;

				one
					.save()
					.then(() => res.json("Gallery updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Gallery.findByIdAndDelete(req.params.id)
			.then(() => res.json("Gallery deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else res.status(400).json("Error");
});

module.exports = router;
