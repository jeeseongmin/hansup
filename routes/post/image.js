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

// create storage engine
var storage = new GridFsStorage({
	url: db,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const ext = path.extname(file.originalname);
				const filename =
					path.basename(file.originalname, ext) + Date.now() + ext;
				const fileInfo = {
					filename: filename,
					bucketName: "uploads",
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });

// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post("/upload", upload.single("file"), (req, res) => {
	res.json({ filename: `${req.file.filename}`, id: `${req.file.id}` });
});

router.get("/delete/:id", (req, res) => {
	gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
		if (err) {
			return res.status(404).json({ err: err });
		}

		res.status(200).json({
			success: true,
			message: `File with ID ${req.params.id} is deleted`,
		});
	});
});

router.route("/:url").get((req, res) => {
	fs.readFile("uploads/" + req.params.url, function (error, data) {
		res.writeHead(200, { "Content-Type": "text/html" });
		// console.log(data);
		// return res.json(data);
		res.end(data, "utf-8");
	});
});

router.route("/view/:filename").get((req, res, next) => {
	gfs.find({ filename: req.params.filename }).toArray((err, files) => {
		if (!files[0] || files.length === 0) {
			return res.status(200).json({
				success: false,
				message: "No files available",
			});
		}

		if (
			files[0].contentType === "image/jpeg" ||
			files[0].contentType === "image/png" ||
			files[0].contentType === "image/svg+xml"
		) {
			// render image to browser
			gfs.openDownloadStreamByName(req.params.filename).pipe(res);
		} else {
			res.status(404).json({
				err: "Not an image",
			});
		}
	});
});

module.exports = router;
