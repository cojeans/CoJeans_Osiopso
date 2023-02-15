import {
	EditContainer,
	UserImageBox
} from "./edit-profile.styles"
import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	TextField,
} from '@material-ui/core';
import { useState } from "react";

import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector";

import axios from "axios";
import { useEffect } from "react";

import Button from "../button/button.component";

import Swal from "sweetalert2";

const defaultData = {
	id:'',
	nickName: '',
	age: '',
	gender: '',
	imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png',
	bio:'',
}

const EditProfile = () => {
	const [userValue, setuserValue] = useState(defaultData)

	const validation = () => {
		if (userValue.age < 0 || userValue.age > 120) {
			return true
		} else {
			let check = /^[0-9]+$/; 
			return !check.test(userValue.age);
		}
	}

	const handleChange = event => {
		const { name, value } = event.target;
		console.log(name, value)

		setuserValue({...userValue, [name]:value})
	
	};
	
  const Token = useSelector(selectUser);

	//현재 유저 데이터 받아오기 
	const userData = () => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}user`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
		}).then((res) => {
			const userData = {
				id : res.data.id,
				nickName: res.data.name,
				age: res.data.age,
				gender: res.data.gender,
				imageUrl: res.data.imageUrl,
				bio:res.data.bio	
			}
			setuserValue(userData)
		}).
			catch((err) => {
			console.log(err)
		})
	}

	const submitHandler = () => {
		if (!validation()) {
			console.log(userValue)
			axios({
				method: 'put',
				url: `${process.env.REACT_APP_AXIOS_URL}user`,
				data: userValue,
				headers: {
					Authorization: `Bearer ${Token.token}`,
				}
			}).then((res) => {
				console.log(res, '회원정보수정입니다.')
			}).then(() => {
				Swal.fire({
					icon: 'success',
					confirmButtonColor: "#DD6B55",
					html: `
        회원정보가 수정되었습니다.
      `,
					showCancelButton: false,
					confirmButtonText: "확인",
				}).catch((err) => {
					console.log(err)
				})
				
			})
		}
	}
	useEffect(() => {
		userData()
	},[])

	return (
		<EditContainer>
			<UserImageBox>
				<img src={ userValue.imageUrl } alt="" />
			</UserImageBox>

			<TextField
				label="이름"
				value={userValue.nickName}
				size="small"
				variant="outlined"
				name="nickName"
				onChange={handleChange} />
			<TextField
				label="나이"
				multiline
				type="number"
				value={userValue.age}
				size="small"
				variant="outlined"
				name="age"
				onChange={handleChange}
				error={validation()}
				helperText={validation() ? "정확한 나이를 입력해주세요.":""}
			/>
		<FormControl component="fieldset">
				<RadioGroup
					row
					aria-label="gender"
					name="gender"
					value={userValue.gender}
					onChange={handleChange}>
					<FormControlLabel
						value="MALE"
						control={<Radio />}
						label="남자" />
					<FormControlLabel
						value="FEMALE"
						control={<Radio />}
						label="여자" />
					<FormControlLabel
						value="UNKNOWN"
						control={<Radio />}
						label="기타" />
			</RadioGroup>
			</FormControl>
			<TextField
				name="bio"
				id="outlined-multiline-static"
				label="자기소개를 작성해 주세요."
				multiline
				variant="outlined"
				value={userValue.bio}
				onChange={handleChange}
			/>
			<Button onClick={ submitHandler }>저장</Button>
		</EditContainer>
	)
}

export default EditProfile