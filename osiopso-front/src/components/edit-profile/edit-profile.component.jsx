import {
	EditContainer,
} from "./edit-profile.styles"
import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	TextField,
	InputLabel 
} from '@material-ui/core';
import { useState } from "react";

const EditProfile = () => {
	const [value, setValue] = useState('')
	const handleChange = event => {
    setValue(event.target.value);
  };

	return (
		<EditContainer>
			<TextField label="이름" sx={{"& label": {color: "secondary.main"}}}/>
			<div>나이 <TextField/></div>
		<FormControl component="fieldset" >
		<FormLabel     component="legend">Gender</FormLabel>
			<RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
			<FormControlLabel value="male" control={<Radio />} label="남자" />
			<FormControlLabel value="female" control={<Radio />} label="여자" />
			<FormControlLabel value="other" control={<Radio />} label="기타" />
			</RadioGroup>
		</FormControl>
			<div>자기소개</div>
		</EditContainer>
	)
}

export default EditProfile