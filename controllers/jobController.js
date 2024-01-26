import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";

// * Job Route Controllers
export const getAllJobs = async (req, res) => {
	const { userId } = req.user;
	const jobs = await Job.find({ createdBy: userId });
	res.status(StatusCodes.OK).json({ jobs });
};

export const getSingleJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findById(id);
	res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
	res.status(StatusCodes.OK).json({ message: "Job updated!", job });
};

export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findByIdAndDelete(id);
	res.status(StatusCodes.OK).json({ message: "Job Deleted!", job });
};
