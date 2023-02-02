import { useState } from 'react'

import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { SignInContainer, ButtonsContainer  } from './login.stlyes'
import { useDispatch } from 'react-redux'
import './login.stlyes'

import { login } from '../../store/user/user.reducer'
// import {
//   signInAuthUserWithEmailAndPassword,
//   signInWithGooglePopup,
// } from '../../utils/firebase/firebase.utils';


const defaultFormFields = {
  email: '',
  password: '',
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields);
  // };

  // const signInWithGoogle = async () => {
  //   await signInWithGooglePopup();
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     await signInAuthUserWithEmailAndPassword(email, password);
  //     resetFormFields();
  //   } catch (error) {
  //     console.log('user sign in failed', error);
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  
  };
  const dispatch = useDispatch()

  return (
    <SignInContainer>
      <div>
        <button onClick={() => {
          dispatch(login({name: "내 이름", email: "email@gmail.com", password: 1234}))
        }}>Login</button>
      </div>
      <hr />
      {/* <h2>Already have an account?</h2> */}
      <span>이메일과 비밀번호를 입력하세요.</span>
      {/* <form>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>

        </ButtonsContainer>
      </form> */}
    </SignInContainer>
  );
};

export default Login;