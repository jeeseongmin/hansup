const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noticeSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		fileList: {
			type: [Object],
			required: false,
		},
		read: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
