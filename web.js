const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./dbconfig");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("uploads"));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;

mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((res) => console.log("Connected to DB"))
	.catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const reviewRouter = require("./routes/post/review");
const noticeRouter = require("./routes/post/notice");
const orderRouter = require("./routes/post/order");
const voiceRouter = require("./routes/post/voice");

const imageRouter = require("./routes/post/image");

app.use("/data", exercisesRouter);
app.use("/api/image", imageRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/voice", voiceRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);

// app.use("/api/volunteer", volunteerRouter);

// app.use(express.static(path.join(__dirname, "./build")));

// app.get("*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "./build/index.html"));
// });

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
