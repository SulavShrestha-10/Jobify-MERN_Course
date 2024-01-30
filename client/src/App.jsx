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
	EditJob,
} from "./pages";
import { register } from "./pages/Register";
import { login } from "./pages/Login";
import { loader } from "./pages/DashboardLayout";
import { addJob } from "./pages/AddJob";
import { getJobs } from "./pages/AllJobs";
import { editJob, loadJob } from "./pages/EditJob";
import { deleteJob } from "./pages/DeleteJob";
import { getAppStats } from "./pages/Admin";
import { updateUser } from "./pages/Profile";

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
						action: addJob,
					},
					{
						path: "stats",
						element: <Stats />,
					},
					{
						path: "all-jobs",
						element: <AllJobs />,
						loader: getJobs,
					},
					{
						path: "admin",
						element: <Admin />,
						loader: getAppStats,
					},
					{
						path: "edit-job/:id",
						element: <EditJob />,
						loader: loadJob,
						action: editJob,
					},
					{ path: "delete-job/:id", action: deleteJob },
					{
						path: "profile",
						element: <Profile />,
						action: updateUser,
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
