import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import { signup } from '../../utils/APIUtils';
import kakaoLogo from '../../assets/kakao-logo.png';
import googleLogo from '../../assets/google-logo.png';
import githubLogo from '../../assets/github-logo.png';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { SignUpContainer, SocialSignup, TextContainer } from './join.stlyes'
import axios from 'axios';
import './join.stlyes'
// import './join.css';

// import Alert from 'react-s-alert';

const defaultformFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Join = () => {
  const navigate = useNavigate();

	const [formFields, setFormFields] = useState(defaultformFields)
	const {displayName, email, password, confirmPassword} = formFields
	// class SocialSignup extends Component {
	// 	render() {
	// 		return (
				
	// 			<div className="social-signup">
	// 				<div>간편 회원가입</div>
	// 				<a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
	// 					<img src={googleLogo} alt="Google" /> </a>
	// 				<a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
	// 					<img src={kakaoLogo} alt="Kakao" /> </a>
	// 				<a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
	// 					<img src={githubLogo} alt="Github" /> </a>
	// 			</div>
	// 		);
	// 	}
	// }
	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	
		// if (password !== confirmPassword) {
		//   alert('passwords do not match');
		//   return;
		// }

	const handleChange = (event) =>{
		const {name, value} = event.target

		setFormFields({...formFields, [name]:value})
}
  // const dispatch = useDispatch();
  const JoinFunc = (e) => {
    e.preventDefault();
      axios({
        method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}user/signUp`,
        data: {
          email: email,
          name: displayName,
          password: password,
        }
      })
      .then((res)=>{
        console.log(res)
        // localStorage.clear()
        // localStorage.setItem('token', res.data.accessToken)
        // localStorage.setItem('email', email)
        
        // const value = {email, token: res.data.accessToken}
        // dispatch(login(value))
        navigate("/joincomplete")
      })
      .catch((err) => {
        console.log(err)
        navigate("/join")
      })

  }
	return (
		<SignUpContainer>
			<img src={require("../../assets/The_Great_Gatsby.gif")} alt="" />
			<form>
				<FormInput
				label="아이디" 
				type='text' 
				required 
				onChange={handleChange} 
				name="displayName" 
				value={displayName}
				/>
				
				<FormInput
				label="이메일" 
				type='email' 
				required 
				onChange={handleChange} 
				name="email" 
				value={email}/>

				<FormInput
				label="비밀번호" 
				type='password' 
				required 
				onChange={handleChange} 
				name="password" 
				value={password}/>

				<FormInput
				label="비밀번호 확인" 
				type='password' 
				required 
				onChange={handleChange}name="confirmPassword" 
				value={confirmPassword}/>
				<Button onClick={JoinFunc}>가입하기</Button>
			</form>

				
				<TextContainer>간편 회원가입</TextContainer>
					<SocialSignup>
						<a href={GOOGLE_AUTH_URL}><img src={googleLogo} alt="Google" /> </a>
						<a href={KAKAO_AUTH_URL}><img src={kakaoLogo} alt="Kakao" /> </a>
						<a href={GITHUB_AUTH_URL}><img src={githubLogo} alt="Github" /> </a>
					</SocialSignup>
				
		</SignUpContainer>
	)
}

export default Join