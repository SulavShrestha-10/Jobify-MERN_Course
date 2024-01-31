import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import jobRouter from "./routes/jobRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// * Middlewares
app.use(helmet());
app.use(mongoSanitize());
// * For accepting json data
app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
// *  For parsing cookies
app.use(cookieParser());

// * App routes
app.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

app.get("/api/v1/test", (req, res) => {
	res.json({ msg: "test route" });
});

// * Using job routes in the app
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

// * Error Page Route
app.use("*", (req, res) => {
	res.status(404).json({ message: "Page Not Found!" });
});

// * Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log("Server running on", port);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
