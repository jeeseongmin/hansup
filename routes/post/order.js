// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Order = require("../../models/order.model");
const API_KEY = require("../../keyconfig");

// Create order
router.route("/create").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			name: req.body.name,
			phone: req.body.phone,
			count: req.body.count,
			request: req.body.request,
			date: req.body.date,
			delivery: req.body.delivery,
			address: req.body.address,
			mainMenu: req.body.mainMenu,
			subMenu: req.body.subMenu,
			soup: req.body.soup,
			dessert: req.body.dessert,
			payment: req.body.payment,
			cashReceipt: req.body.cashReceipt,
			payed: false,
		};

		const newOne = new Order(one);

		newOne
			.save()
			.then(() => res.json("Order created!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read all order
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		Order.find()
			.sort({ createdAt: -1 })
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Read specific order
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Order.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// paging
router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		Order.find()
			.sort({ createdAt: -1 })
			.skip((req.params.page - 1) * 10)
			.limit(10)
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/get/date").post((req, res) => {
	if (req.body.key === API_KEY) {
		let searchYear = req.body.year;
		let searchMonth = req.body.month;

		Order.find({
			$and: [
				{
					date: {
						$gte: new Date(searchYear, searchMonth, 1, 0, 0, 0),
						$lte: new Date(searchYear, searchMonth + 1, 1, 0, 0, 0),
					},
				},
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

		Order.find({
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
		Order.findById(req.params.id)
			.then((one) => {
				one.payed = req.body.payed;

				one
					.save()
					.then(() => res.json("Order updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

// Update order
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Order.findById(req.params.id)
			.then((one) => {
				one.name = req.body.name;
				one.phone = req.body.phone;
				one.count = req.body.count;
				one.request = req.body.request;
				one.date = req.body.date;
				one.delivery = req.body.delivery;
				one.address = req.body.address;
				one.mainMenu = req.body.mainMenu;
				one.subMenu = req.body.subMenu;
				one.soup = req.body.soup;
				one.dessert = req.body.dessert;
				one.payment = req.body.payment;
				one.cashReceipt = req.body.cashReceipt;
				one.payed = req.body.payed;

				one
					.save()
					.then(() => res.json("Order updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		Order.findByIdAndDelete(req.params.id)
			.then(() => res.json("Order deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

module.exports = router;
