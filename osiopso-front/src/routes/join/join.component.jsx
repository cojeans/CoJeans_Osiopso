import { useState } from 'react'

import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { SignUpContainer } from './join.stlyes'

import './join.stlyes'

const defaultformFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Join = () => {

	const [formFields, setFormFields] = useState(defaultformFields)
	const {displayName, email, password, confirmPassword} = formFields

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	
	// 	if (password !== confirmPassword) {
	// 	  alert('passwords do not match');
	// 	  return;
	// 	}

	const handleChange = (event) =>{
		const {name, value} = event.target

		setFormFields({...formFields, [name]:value})
}

	return (
		<SignUpContainer>
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
				<Button>가입하기</Button>
			</form>
		</SignUpContainer>
	)
}

export default Join