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
import { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector";
import { userInfo } from "../../store/user/user.reducer";

import axios from "axios";
import { useEffect } from "react";

import Button from "../button/button.component";

import Swal from "sweetalert2";

import { ref as fref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/utils';


const defaultData = {
	id:'',
	name: '',
	age: '',
	gender: '',
	imageUrl: '',
	bio:'',
}

const EditProfile = () => {
	const [userValue, setuserValue] = useState(defaultData)
	const dispatch = useDispatch()
	const imgRef = useRef();


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
				name: res.data.name,
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

	const [profileImg, setProfileImg] = useState('')

	const saveImgFile = async () => {
		const file = imgRef.current.files[0];
    const uploaded_file = await uploadBytes(
                fref(storage, `images/${file.name}`),
                file,
      );
    console.log(uploaded_file ,'testing')
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setProfileImg(reader.result)
		};
		const file_url = await getDownloadURL(uploaded_file.ref)
		console.log(file_url)
		setuserValue({...userValue, imageUrl:file_url})
		// setOotdFormData({...ootdFormData, imageUrl:file_url})
  };

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
				dispatch(userInfo(res.data))

			}).then(() => {
				Swal.fire({
					icon: 'success',
					confirmButtonColor: "#DD6B55",
					html: `
        회원정보가 수정되었습니다.
      `,
					showCancelButton: false,
					confirmButtonText: "확인",
				})
				
			}).catch((err) => {
					console.log(err)
				})
		}
	}
	useEffect(() => {
		userData()
	},[])

	return (
		<EditContainer>
			<UserImageBox>
				<label htmlFor="profileImg">
					{!profileImg ? <img src={userValue.imageUrl === 'UNKNOWN' || !userValue.imageUrl ? require('../../assets/defaultuser.png') : userValue.imageUrl} alt="" /> : <img src={ profileImg } />}
				<div className="edit">click</div>
				</label>

				<input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
			</UserImageBox>
			<TextField
				label="이름"
				value={userValue.name}
				size="small"
				variant="outlined"
				name="name"
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