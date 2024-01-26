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
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "dashboard",
				element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
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
