// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Menu = require("../../models/menu.model");
const API_KEY = require("../../keyconfig");

// Create menu
router.route("/create").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			category: req.body.category,
			type: req.body.type,
			name: req.body.name,
			price: req.body.price,
			imgList: req.body.imgList,
		};

		const newOne = new Menu(one);

		newOne
			.save()
			.then(() => res.json("Menu created!"))
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

router.route("/search/category/:category").post((req, res) => {
	if (req.body.key === API_KEY) {
		let searchType = req.body.type;

		Menu.find({
			$and: [
				{ category: { $regex: req.params.category, $options: "i" } },
				{ type: { $regex: searchType, $options: "i" } },
			],
		})
			.sort({ createdAt: -1 })
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else res.status(400).json("Error");
});

router.route("/search/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		let searchName = req.body.name;
		let searchPhone = req.body.phone;
		let searchYear = req.body.year;
		let searchMonth = req.body.month;
		let searchDate = req.body.date;

		Menu.find({
			$and: [
				{ name: { $regex: searchName, $options: "i" } },
				{ phone: { $regex: searchPhone, $options: "i" } },
				{
					date: {
						$gte: new Date(searchYear, searchMonth, searchDate, 0, 0, 0),
						$lte: new Date(searchYear, searchMonth, searchDate, 23, 59, 59),
					},
				},
			],
		})
			.sort({ createdAt: -1 })
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

				one
					.save()
					.then(() => res.json("Menu updated!"))
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
