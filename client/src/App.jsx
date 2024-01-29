import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	HomeLayout,
	Landing,
	Register,
	Login,
	DashboardLayout,
	Error,
	AllJobs,
	Stats,
	AddJob,
	Admin,
	Profile,
} from "./pages";
import { register } from "./pages/Register";
import { login } from "./pages/Login";
import { loader } from "./pages/DashboardLayout";

const checkDefaultTheme = () => {
	const isDarkTheme = localStorage.getItem("dark") === "true";
	document.body.classList.toggle("dark-theme", isDarkTheme);
	return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "register",
				element: <Register />,
				action: register,
			},
			{
				path: "login",
				element: <Login />,
				action: login,
			},
			{
				path: "dashboard",
				element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
				loader: loader,
				children: [
					{
						index: true,
						element: <AddJob />,
					},
					{
						path: "stats",
						element: <Stats />,
					},
					{
						path: "all-jobs",
						element: <AllJobs />,
					},
					{
						path: "admin",
						element: <Admin />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
				],
			},
		],
	},
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
