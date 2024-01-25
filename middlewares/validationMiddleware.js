import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";

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

export const validateTest = withValidationErrors([
	body("name")
		.notEmpty()
		.withMessage("name is required")
		.isLength({ min: 5 })
		.withMessage("Name length must be at least 5"),
]);
