import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";
dotenv.config();

const app = express();

// * Middlewares
// * For accepting json data
app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// * Local Data for testing api
let jobs = [
	{ id: nanoid(), company: "apple", position: "front-end" },
	{ id: nanoid(), company: "samsung", position: "back-end" },
];

// * App routes
app.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

app.post("/", (req, res) => {
	res.json({ message: "Data received", data: req.body });
});

// ! This is not the final api code for CRUD operations
// * ------------------CRUD Operations for Jobify----------------------
// * The CRUD operations are currently done using the local data above

// * Get all jobs
app.get("/api/v1/jobs", (req, res) => {
	res.status(200).json({ jobs });
});

// * Create job
app.post("/api/v1/jobs", (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(400).json({ message: "Please provide both company and position!" });
	}
	const id = nanoid(10);
	const job = { id, company, position };
	jobs.push(job);
	res.status(200).json({ job });
});

// * Get single job
app.get("/api/v1/jobs/:id", (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		throw new Error(`No job found with id: ${id}!`);
		// return res.status(404).json({ message: `No job found with id: ${id}!` });
	}
	res.status(200).json({ job });
});

// * Edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(400).json({ message: "Please provide both company and position!" });
	}
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ message: `No job found with id ${id}!` });
	}
	job.company = company;
	job.position = position;
	res.status(200).json({ message: "Job updated!", job });
});

// * Delete job
app.delete("/api/v1/jobs/:id", (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ message: `No job found with id: ${id}!` });
	}
	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;
	res.status(200).json({ message: "Job Deleted!" });
});

// * Error Page Route
app.use("*", (req, res) => {
	res.status(404).json({ message: "Page Not Found!" });
});

// * Error Middleware
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("Server running on", port);
});
