import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { createCloset } from '../../store/closet/closet.reducer';
import { selectCloset } from '../../store/closet/closet.selector';

import { Toggle } from "react-toggle-component";

import { Label, Sample } from "./toggle.styles";

const ToggleButton2 = () => {
	
	const [check, setCheck] = useState(true)
	const [checked, setChecked] = useState(false)
	
	const closetData  = useSelector(selectCloset)
	const dispatch = useDispatch()

	
	const checkHandler = () => {
		setCheck(checked)
		setChecked(check)

		const payload = { ...closetData.closet }
		payload.isSelected = check

		dispatch(createCloset(payload))
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

export default ToggleButton2