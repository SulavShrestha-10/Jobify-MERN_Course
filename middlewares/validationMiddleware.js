import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";

const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		async (req, res, next) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				const errMessages = errors.array().map((err) => err.msg);
				if (errMessages[0].startsWith("No job")) {
					throw new NotFoundError(errMessages);
				}
				throw new BadRequestError(errMessages);
			}
			next();
		},
	];
};

export const validateJobInput = withValidationErrors([
	body("company").notEmpty().withMessage("Company name is required!"),
	body("position").notEmpty().withMessage("Position is required!"),
	body("jobLocation").notEmpty().withMessage("Job location is required!"),
	body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid status value"),
	body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid type value"),
]);

export const validateIdParam = withValidationErrors([
	param("id").custom(async (val) => {
		const isValidId = mongoose.Types.ObjectId.isValid(val);
		if (!isValidId) {
			throw new BadRequestError("Invalid MongoDB ID!");
		}

		const job = await Job.findById(val);
		if (!job) {
			throw new NotFoundError(`No job found with id ${val}!`);
		}
	}),
]);
