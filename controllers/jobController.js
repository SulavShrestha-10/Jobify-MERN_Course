import { nanoid } from "nanoid";
// * Local Data for testing api
let jobs = [
	{ id: nanoid(), company: "apple", position: "front-end" },
	{ id: nanoid(), company: "samsung", position: "back-end" },
];

// * Job Route Controllers
export const getAllJobs = async (req, res) => {
	res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		throw new Error(`No job found with id: ${id}!`);
		// return res.status(404).json({ message: `No job found with id: ${id}!` });
	}
	res.status(200).json({ job });
};

export const createJob = async (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(400).json({ message: "Please provide both company and position!" });
	}
	const id = nanoid(10);
	const job = { id, company, position };
	jobs.push(job);
	res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
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
};

export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ message: `No job found with id: ${id}!` });
	}
	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;
	res.status(200).json({ message: "Job Deleted!" });
};
