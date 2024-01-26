import mongoose from "mongoose";
import { USER_TYPE } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: "lastName",
	},
	location: {
		type: String,
		default: "Kathmandu",
	},
	role: {
		type: String,
		enum: Object.values(USER_TYPE),
		default: USER_TYPE.USER,
	},
});

export default mongoose.model("User", userSchema);
