const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		response: {
			type: String,
			required: false,
		},
		password: {
			type: String,
			required: true,
		},
		imgList: {
			type: [Object],
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
