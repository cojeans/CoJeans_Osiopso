import { useState } from 'react'

import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { SignInContainer, ButtonsContainer  } from './login.stlyes'
import { useDispatch } from 'react-redux'
import './login.stlyes'
import axios from 'axios';
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
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const LoginFunc = (e) => {
      e.preventDefault();
      // Loading... 메세지 출력
      setMsg("Loading...");

      // API
      let body = {
          email,
          password
      }
      axios.post('http://localhost:8080/user/login', body)
      .then(res => {
          // 2순위 통신이 끝나야 작동. 통신 이후 클릭이 되도록.
          setLoading(false);
          // Loading... 메세지가 통신이 끝난 후 1.5초 이후 없어짐.
          setTimeout(() => setMsg(""), 1500);
          // code = 데이터 상태
          const code = res.data.code;
          if (code === 400) {
              // 비어있는
              alert("비어있는 내용입니다.")
          } else if (code === 401) {
              // 존재하지 않는 id
              alert("존재하지 않는 id입니다.")
          } else if (code === 402) {
              // 비밀번호가 틀렸을때
              alert("비밀번호가 일치하지 않습니다.")
          } else {
              dispatch(login(res.data.userInfo));
          }
      })
      // 1순위 로그인 버튼을 누르면 클릭이 안되도록.
      setLoading(true);
  }

  return (
    <SignInContainer>

      <hr />
      {/* <h2>Already have an account?</h2> */}
      <span>이메일과 비밀번호를 입력하세요.</span>
      <form>
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
      </form>
    </SignInContainer>
  );
};

export default Login;