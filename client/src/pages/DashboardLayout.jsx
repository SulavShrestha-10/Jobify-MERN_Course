import React, { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
	try {
		const response = await customFetch.get("/users/current-user");
		console.log("executing", response);
		const { data } = response;
		return data;
	} catch (error) {
		return redirect("/");
	}
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
	const { user } = useLoaderData();
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		document.body.classList.toggle("dark-theme", newDarkTheme);
		localStorage.setItem("dark", newDarkTheme);
	};
	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};
	const logoutUser = async () => {
		navigate("/");
		await customFetch("/auth/logout");
		toast.success("Logged out!");
	};
	return (
		<DashboardContext.Provider value={{ user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser }}>
			<Wrapper>
				<main className="dashboard">
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className="dashboard-page">
							<Outlet context={{ user }} />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
