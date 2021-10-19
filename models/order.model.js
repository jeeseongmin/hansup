const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		serving: {
			type: String,
			required: true,
		},
		request: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		delivery: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		mainMenu: {
			type: Array,
			required: true,
		},
		SubMenu: {
			type: Array,
			required: true,
		},
		soup: {
			type: Array,
			required: true,
		},
		dessert: {
			type: Array,
			required: true,
		},
		payment: {
			type: String,
			required: true,
		},
		cashReceipt: {
			type: Object,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
