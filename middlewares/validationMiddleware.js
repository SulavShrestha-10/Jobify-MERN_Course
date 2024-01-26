import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE, USER_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

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
				if (errMessages[0].startsWith("Not authorized")) {
					throw new UnauthorizedError(errMessages);
				}
				throw new BadRequestError(errMessages);
			}
			next();
		},
	];
};

// * Job Validations
export const validateJobInput = withValidationErrors([
	body("company").notEmpty().withMessage("Company name is required!"),
	body("position").notEmpty().withMessage("Position is required!"),
	body("jobLocation").notEmpty().withMessage("Job location is required!"),
	body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid status value"),
	body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid type value"),
]);

export const validateIdParam = withValidationErrors([
	param("id").custom(async (val, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(val);
		if (!isValidId) throw new BadRequestError("Invalid MongoDB ID!");
		const job = await Job.findById(val);
		if (!job) throw new NotFoundError(`No job found with id ${val}!`);
		const isAdmin = req.user.role === "admin";
		const isOwner = req.user.userId === job.createdBy.toString();
		if (!isAdmin && !isOwner) throw new UnauthorizedError("Not authorized to access the page!");
	}),
]);

// * User Validations
export const validateRegisterInput = withValidationErrors([
	body("name").notEmpty().withMessage("Name is required!"),
	body("lastName").notEmpty().withMessage("Last name is required!"),
	body("email")
		.notEmpty()
		.withMessage("Email is required!")
		.isEmail()
		.withMessage("Invalid email format!")
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) {
				throw new BadRequestError("Email already exists!");
			}
		}),
	body("password")
		.notEmpty()
		.withMessage("Password is required!")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long!"),
	body("location").notEmpty().withMessage("Location is required!"),
	body("role").isIn(Object.values(USER_TYPE)).withMessage("Invalid role type"),
]);

export const validateLoginInput = withValidationErrors([
	body("email").notEmpty().withMessage("Email is required!").isEmail().withMessage("Invalid email format!"),
	body("password").notEmpty().withMessage("Password is required!"),
]);

export const validateUpdateUserInput = withValidationErrors([
	body("name").notEmpty().withMessage("Name is required!"),
	body("lastName").notEmpty().withMessage("Last name is required!"),
	body("email")
		.notEmpty()
		.withMessage("Email is required!")
		.isEmail()
		.withMessage("Invalid email format!")
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError("Email already exists!");
			}
		}),
	body("location").notEmpty().withMessage("Location is required!"),
]);
