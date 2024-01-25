import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../components";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						Job <span>tracking</span> app
					</h1>
					<p>
						Welcome to Jobify, your go-to job tracking app! With Jobify, you can effortlessly manage and keep track of
						your job applications, interviews, and career progress. Say goodbye to the hassle of organizing job-related
						information - Jobify has got you covered. Streamline your job search process and stay on top of your career
						goals with our user-friendly features.
					</p>
					<Link to="/register" className="btn register-link">
						Register
					</Link>
					<Link to="/login" className="btn">
						Login / Demo User
					</Link>
				</div>
				<img src={main} alt="Job Hunt" className="img main-img" />
			</div>
		</Wrapper>
	);
};

export default Landing;
