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
		count: {
			type: Number,
			required: true,
		},
		request: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
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
		subMenu: {
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
		payed: {
			type: Boolean,
			required: true,
		},
		isDeleted: {
			type: Boolean,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
