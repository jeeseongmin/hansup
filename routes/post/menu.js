// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Menu = require("../../models/menu.model");
const API_KEY = require("../../keyconfig");

// 완전 삭제와 isDeleted true로 체크한 것은 다르다.

// Create menu
router.route("/create").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			category: req.body.category,
			type: req.body.type,
			name: req.body.name,
			price: req.body.price,
			imgList: req.body.imgList,
			isDeleted: false,
		};

		const newOne = new Menu(one);

		newOne
			.save()
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read all menu
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read specific menu
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.find()
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/search/:category").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.find({
			$and: [{ category: { $regex: req.params.category, $options: "i" } }],
		})
			.sort({ createdAt: 1 })
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

router.route("/payed/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.findById(req.params.id)
			.then((one) => {
				one.payed = req.body.payed;

				one
					.save()
					.then(() => res.json("Menu updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Update menu
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.findById(req.params.id)
			.then((one) => {
				one.category = req.body.category;
				one.type = req.body.type;
				one.name = req.body.name;
				one.price = req.body.price;
				one.imgList = req.body.imgList;
				one.isDeleted = false;

				one
					.save()
					.then((all) => res.json(all))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/deletecheck/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.findById(req.params.id)
			.then((one) => {
				one.isDeleted = true;

				one
					.save()
					.then((all) => res.json(all))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Menu.findByIdAndDelete(req.params.id)
			.then(() => res.json("Menu deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

module.exports = router;
