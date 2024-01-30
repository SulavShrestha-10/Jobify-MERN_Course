import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const register = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/auth/register", data);
		toast.success("Registration successful!");
		return redirect("/login");
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.message);
		return error;
	}
};

const Register = () => {
	return (
		<Wrapper>
			<Form method="POST" className="form">
				<Logo />
				<h4>Register</h4>
				<FormRow type="text" name="name" defaultValue="ram" />
				<FormRow type="text" name="lastName" defaultValue="shah" labelText="last name" />
				<FormRow type="text" name="location" defaultValue="Kathmandu" />
				<FormRow type="email" name="email" defaultValue="ram@gmail.com" />
				<FormRow type="password" name="password" defaultValue="Test@123" />

				<SubmitBtn text="Register" />
				<p>
					Already a member?
					<Link to="/login" className="member-btn">
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default Register;
