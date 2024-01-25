import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";

// * Job Route Controllers
export const getAllJobs = async (req, res) => {
	const jobs = await Job.find({});
	res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findById(id);
	if (!job) {
		return res.status(404).json({ message: `No job found with id: ${id}!` });
	}
	res.status(200).json({ job });
};

export const createJob = async (req, res) => {
	const { company, position } = req.body;
	const job = await Job.create({ company, position });
	res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
	if (!job) {
		return res.status(404).json({ message: `No job found with id ${id}!` });
	}
	res.status(200).json({ message: "Job updated!", job });
};

export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findByIdAndDelete(id);
	if (!job) {
		return res.status(404).json({ message: `No job found with id: ${id}!` });
	}
	res.status(200).json({ message: "Job Deleted!", job });
};
