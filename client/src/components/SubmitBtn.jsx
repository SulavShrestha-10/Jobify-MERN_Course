import React from "react";
import { useNavigation } from "react-router-dom";
const SubmitBtn = ({ formBtn, text }) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<button className={`btn btn-block ${formBtn && "form-btn"}`} type="submit" disabled={isSubmitting}>
			{isSubmitting ? "Submitting...." : text}
		</button>
	);
};

export default SubmitBtn;
