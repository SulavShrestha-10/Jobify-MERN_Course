import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import mongoose from "mongoose";
import day from "dayjs";

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

export const showStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: "$jobStatus", count: { $sum: 1 } } },
	]);
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});
	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};
	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	]);
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = day()
				.month(month - 1)
				.year(year)
				.format("MMM YYYY");
			return { date, count };
		})
		.reverse();
	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
