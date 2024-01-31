import { Link, Form, redirect, useNavigation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
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
	const navigate = useNavigate();

	const demoLogin = async () => {
		const data = {
			email: "test@test.com",
			password: "secret123",
		};
		try {
			await customFetch.post("/auth/login", data);
			toast.success("Test the application!");
			navigate("/dashboard");
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};
	return (
		<Wrapper>
			<Form method="POST" className="form">
				<Logo />
				<h4>Login</h4>
				<FormRow type="email" name="email" />
				<FormRow type="password" name="password" />
				<SubmitBtn text="Login" />
				<button className="btn btn-block" type="button" onClick={demoLogin}>
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
