const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voiceSchema = new Schema(
	{
		status: {
			type: String,
			required: true,
			default: "unread",
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
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

const Voice = mongoose.model("Voice", voiceSchema);

module.exports = Voice;
