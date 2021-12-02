const express = require("express");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const crypto = require("crypto");
const router = express.Router();
const API_KEY = require("../../keyconfig");
const db = require("../../dbconfig");
var mime = require("mime");
var getDownloadFilename =
	require("./lib/getDownloadFilename").getDownloadFilename;

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(__dirname, "..", "..", "uploads"));
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}_${file.originalname}`);
	},
});
const uploader = multer({ storage: storage }).single("file");

const uri = db;
const connect = mongoose.createConnection(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
	gfs = new mongoose.mongo.GridFSBucket(connect.db, {
		bucketName: "uploads",
	});
});

router.get("/delete/:filename", (req, res) => {
	console.log(req.params.filename);
	fs.unlink(`uploads/` + req.params.filename, (err) => {
		res.end();
	});
	return res.json(req.params.filename);
});

// 10MB 이하로 제한하기.
router.route("/upload_page").post((req, res, next) => {
	var dir = path.join(__dirname, "..", "..", "uploads");
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	uploader(req, res, (err) => {
		if (err) {
			return res.json({ success: false });
		}
		return res.json({
			success: true,
			file: res.req.file,
		});
	});
});

module.exports = router;
