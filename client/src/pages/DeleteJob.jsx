import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const deleteJob =
	(queryClient) =>
	async ({ params }) => {
		try {
			await customFetch.delete(`/jobs/${params.id}`);
			queryClient.invalidateQueries(["jobs"]);
			toast.success("Job deleted successfully");
		} catch (error) {
			toast.error(error.response.data.message);
		}
		return redirect("/dashboard/all-jobs");
	};
