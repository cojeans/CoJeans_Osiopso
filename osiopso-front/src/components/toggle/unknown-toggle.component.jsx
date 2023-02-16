import React, { Fragment, useState } from "react";

import { Toggle } from "react-toggle-component";

import { Label, Sample } from "./toggle.styles";

const UnknownToggle = ({ setCheck, setChecked, checked, check}) => {
	

	
	
	const checkHandler = () => {
		setCheck(checked)
		setChecked(check)
	}

	return (
		<Fragment>
			<Sample>
				<Label htmlFor="toggle-1">
					<Toggle
						name="toggle-1"
						checked={checked}
						onChange={checkHandler}
					/>
					<span>{checked ? "on" : "off"}</span>
				</Label>
			</Sample>
		</Fragment>
	)
}

export default UnknownToggle