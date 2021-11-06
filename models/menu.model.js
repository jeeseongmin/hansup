const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
	{
		category: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		imgList: {
			type: [Object],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
