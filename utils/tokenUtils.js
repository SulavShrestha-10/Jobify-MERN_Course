import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
	const token = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: process.env.EXPIRES_IN,
	});
	return token;
};
