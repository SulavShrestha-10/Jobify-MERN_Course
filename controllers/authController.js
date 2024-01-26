import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const register = async (req, res) => {
	const isFirstAccount = (await User.countDocuments()) === 0;
	req.body.role = isFirstAccount ? "admin" : "user";
	const hashedPassword = await hashPassword(req.body.password);
	req.body.password = hashedPassword;
	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ user });
};
export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const isValidUser = user && (await comparePassword(password, user?.password));
	if (!isValidUser) throw new UnauthenticatedError("Invalid credentials!");
	res.json({ message: "Login Request" });
};
