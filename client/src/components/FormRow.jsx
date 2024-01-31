import React from "react";

const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
				type={type}
				className="form-input"
				name={name}
				id={name}
				onChange={onChange}
				defaultValue={defaultValue}
				required
			/>
		</div>
	);
};

export default FormRow;
