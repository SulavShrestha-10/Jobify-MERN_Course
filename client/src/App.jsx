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
import { getStats } from "./pages/Stats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorElement } from "./components";

const checkDefaultTheme = () => {
	const isDarkTheme = localStorage.getItem("dark") === "true";
	document.body.classList.toggle("dark-theme", isDarkTheme);
	return isDarkTheme;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});
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
				action: login(queryClient),
			},
			{
				path: "dashboard",
				element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
				loader: loader(queryClient),
				children: [
					{
						index: true,
						element: <AddJob />,
						action: addJob(queryClient),
					},
					{
						path: "stats",
						element: <Stats />,
						loader: getStats(queryClient),
						errorElement: <ErrorElement />,
					},
					{
						path: "all-jobs",
						element: <AllJobs />,
						loader: getJobs(queryClient),
						errorElement: <ErrorElement />,
					},
					{
						path: "admin",
						element: <Admin />,
						loader: getAppStats,
					},
					{
						path: "edit-job/:id",
						element: <EditJob />,
						loader: loadJob(queryClient),
						action: editJob(queryClient),
					},
					{ path: "delete-job/:id", action: deleteJob(queryClient) },
					{
						path: "profile",
						element: <Profile />,
						action: updateUser(queryClient),
					},
				],
			},
		],
	},
]);
const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
