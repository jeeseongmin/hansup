// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let Order = require("../../models/order.model");
const API_KEY = require("../../keyconfig");

// Create order
router.route("/add").post((req, res) => {
	if (req.body.key === API_KEY) {
		const one = {
			name: req.params.name,
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
		};

		const newOne = new Order(one);

		newOne
			.save()
			.then(() => res.json("Order added!"))
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
