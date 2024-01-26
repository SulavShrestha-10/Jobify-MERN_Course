import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
	const token = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: process.env.EXPIRES_IN,
	});
	return token;
};
export const verifyJWT = (token) => {
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	return decoded;
};
