import React from "react";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

export const addJob = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/jobs", data);
		toast.success("New job added successfully!");
		return redirect("all-jobs");
	} catch (error) {
		toast.error(error?.response?.data?.message);
		return error;
	}
};

const AddJob = () => {
	const { user } = useOutletContext();

	return (
		<Wrapper>
			<Form method="POST" className="form">
				<h4 className="form-title">add job</h4>
				<div className="form-center">
					<FormRow type="text" name="position" />
					<FormRow type="text" name="company" />
					<FormRow type="text" labelText="job location" name="jobLocation" defaultValue={user?.location} />
					<FormRowSelect
						labelText="job status"
						name="jobStatus"
						defaultValue={JOB_STATUS.PENDING}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						labelText="job type"
						name="jobType"
						defaultValue={JOB_TYPE.FULL_TIME}
						list={Object.values(JOB_TYPE)}
					/>
					<SubmitBtn formBtn text="Add Job" />
				</div>
			</Form>
		</Wrapper>
	);
};

export default AddJob;
