import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import kakaoLogo from '../../assets/kakao-logo.png';
import googleLogo from '../../assets/google-logo.png';
import githubLogo from '../../assets/github-logo.png';
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { SignInContainer, ButtonsContainer  } from './login.stlyes'
import { useDispatch } from 'react-redux'
import './login.stlyes'
import axios from 'axios';
import { login } from '../../store/user/user.reducer'
import { SocialSignup, TextContainer } from '../join/join.stlyes'
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

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

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
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const LoginFunc = (e) => {
    e.preventDefault();
      axios({
        method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}user/login`,
        data: {
          email,
          password,
        }
      })
      .then((res)=>{
        console.log(res)
        localStorage.clear()
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('email', email)
        
        const value = {email, token: res.data.accessToken}
        dispatch(login(value))
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
        navigate("/login")
      })
  

  }
  return (
    <SignInContainer>

      <hr />
      {/* <h2>Already have an account?</h2> */}
      <span>이메일과 비밀번호를 입력하세요.</span>
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
        <Button
          type='submit'
          size={'md'}
          variant={ 'success'}
          onClick={LoginFunc}
          >Sign In</Button>
        </ButtonsContainer>
        <TextContainer>간편 로그인</TextContainer>
					<SocialSignup>
						<a href={GOOGLE_AUTH_URL}><img src={googleLogo} alt="Google" /> </a>
						<a href={KAKAO_AUTH_URL}><img src={kakaoLogo} alt="Kakao" /> </a>
						<a href={GITHUB_AUTH_URL}><img src={githubLogo} alt="Github" /> </a>
					</SocialSignup>
    </SignInContainer>
  );
};

export default Login;