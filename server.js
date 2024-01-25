import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

// * Middlewares
// * For accepting json data
app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// * App routes
app.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

app.post("/", (req, res) => {
	res.json({ message: "Data received", data: req.body });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("Server running on", port);
});
