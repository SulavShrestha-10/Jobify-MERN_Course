import React from "react";
import { JOB_STATUS } from "../../../utils/constants";

const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select name={name} id={name} className="form-select" defaultValue={defaultValue}>
				{list.map((item) => {
					return (
						<option value={item} key={item}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default FormRowSelect;
