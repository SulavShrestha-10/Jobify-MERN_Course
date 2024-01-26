import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import jobRouter from "./routes/jobRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// * Middlewares
// * For accepting json data
app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
// *  For parsing cookies
app.use(cookieParser());

// * App routes
app.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

// * Using job routes in the app
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

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
