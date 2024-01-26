import { body, validationResult, param } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errMessages = errors.array().map((err) => err.msg);
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
	param("id")
		.custom((val) => mongoose.Types.ObjectId.isValid(val))
		.withMessage("Invalid MongoDB ID!"),
]);
