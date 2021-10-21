// import { v4 as uuidv4 } from "uuid";
const router = require("express").Router();
let User = require("../models/user.model");
// const bcrypt = require("bcrypt");

const API_KEY = require("../keyconfig");

// Create
router.route("/add").post((req, res) => {
	if (req.body.key === API_KEY) {
		const newUser = new User({
			type: req.body.type,
			email: req.body.email,
			password: req.body.password,
		});
		newUser
			.save()
			.then(() => res.json("User added!"))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.json({ message: "fail" });

	// bcrypt.hash(req.body.password, 10, (err, encryptedPassowrd) => {});
});

// Read
router.route("/").post((req, res) => {
	if (req.body.key === API_KEY) {
		User.find()
			.then((all) => res.json(all))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.json({ message: "fail" });
});

router.route("/page/:page").post((req, res) => {
	if (req.body.key === API_KEY) {
		User.find({ email: req.body.email })
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// Read specific notice
router.route("/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		User.findById(req.params.id)
			.then((one) => res.json(one))
			.catch((err) => res.status(400).json("Error: ") + err);
	} else return res.status(400).json("Error");
});

// Password Update
router.route("/update/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		User.findById(req.params.id)
			.then((one) => {
				one.password = req.body.password;
				one
					.save()
					.then(() => res.json("User Email & Password updated!"))
					.catch((err) => res.status(400).json("Error: " + err));
			})
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

router.route("/delete/:id").post((req, res) => {
	if (req.body.key === API_KEY) {
		User.findByIdAndDelete(req.params.id)
			.then(() => res.json("User deleted."))
			.catch((err) => res.status(400).json("Error: " + err));
	} else return res.status(400).json("Error");
});

module.exports = router;
