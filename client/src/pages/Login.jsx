import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
const Login = () => {
	return (
		<Wrapper>
			<form className="form">
				<Logo />
				<h4>Login</h4>
				<FormRow type="email" name="email" defaultValue="ram@gmail.com" />
				<FormRow type="password" name="password" defaultValue="Test@123" />
				<button className="btn btn-block" type="submit">
					submit
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
			</form>
		</Wrapper>
	);
};
export default Login;
