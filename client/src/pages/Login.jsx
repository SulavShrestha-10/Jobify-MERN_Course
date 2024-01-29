import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const login = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/auth/login", data);
		toast.success("Login successful!");
		return redirect("/dashboard");
	} catch (error) {
		toast.error(error?.response?.data?.message);
		return error;
	}
};

const Login = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<Wrapper>
			<Form method="POST" className="form">
				<Logo />
				<h4>Login</h4>
				<FormRow type="email" name="email" defaultValue="ram@gmail.com" />
				<FormRow type="password" name="password" defaultValue="Test@123" />
				<button className="btn btn-block" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Loading..." : "Login"}
				</button>
				<button className="btn btn-block" type="button">
					explore the app
				</button>
				<p>
					Don't have a account?
					<Link to="/register" className="member-btn">
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default Login;
