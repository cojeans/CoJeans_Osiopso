import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import { 
	SignUpContainer,
	Osiopso,
	Bodoni,
  ButtonContainer,
  Loading,
  SocialSignup,
	TextContainer
} from "./join.stlyes";
import axios from "axios";
import Swal from "sweetalert2";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
// import { signup } from '../../utils/APIUtils';
import kakaoLogo from '../../assets/kakao-logo.png';
import googleLogo from '../../assets/google-logo.png';
import githubLogo from '../../assets/github-logo.png';
import './join.stlyes'
// import './join.css';

import { Audio } from  'react-loader-spinner'
import {
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
// import isEmail from 'validator/lib/isEmail';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from './join.stlyes'

// const FormHelperTexts = styled(FormHelperText)`
// width: 100%;
// padding-left: 16px;
// font-weight: 700 !important;
// color: #d32f2f !important;
// `


const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Join = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultformFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [isCheckEmailFirst, setIsCheckEmailFirst] = useState(false);
  // const [email, setEmail] = useState<string>('')

   //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState('')

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false)


  // const goToSignUp = (e)=> {
  //   e.preventDefault()
  //   if (isCheckEmailFirst) {
  //     fetch()
  //   }
  // const handleSubmit = async (event) => {
  // 	event.preventDefault();

  // if (password !== confirmPassword) {
  //   alert('passwords do not match');
  //   return;
  // }

  // 이메일
  // const onChangeEmail = (e) => {
  //   const emailRegex =
  //     /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  //   const emailCurrent = e.target.value
  //   const { name, value } = e.target;
  //   setFormFields({ ...formFields, [name]: value });

  //   if (!emailRegex.test(emailCurrent)) {
  //     setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
  //     setIsEmail(false)
  //   } else {
  //     setEmailMessage('올바른 이메일 형식이에요 : )')
  //     setIsEmail(true)
  //   }
  // }



  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };


  const JoinFunc = (e) => {

    e.preventDefault();


  Swal.fire({

  html: '회원가입 진행 중 입니다.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    axios({
    method: "post",
    url: `${process.env.REACT_APP_AXIOS_URL}user/signUp`,
    data: {
      email: email,
      name: displayName,
      password: password,
    },
    }).then((res) => {
      console.log(res)
      Swal("Success", "Request sent successfully.", "success")
    }).catch((err) => {
      console.log(err)
  })
  },
    willClose: () => {
    navigate('/login')
  }
})    // onLoading()
      .then((res) => {
        console.log(res);
        // localStorage.clear()
        // localStorage.setItem('token', res.data.accessToken)
        // localStorage.setItem('email', email)

        // const value = {email, token: res.data.accessToken}
        // dispatch(login(value))

        Swal.fire({
          icon: 'success',
          confirmButtonColor:"#7272ba",
          html: `
          회원가입이 완료되었습니다.
          이메일 인증을 진행해주세요.`,     
          showCancelButton: false,
          confirmButtonText: "확인",
          
          // navigate("/")
        })
       

      })
      .catch((err) => {
        console.log(err);
        navigate("/join");
      });
  };


  return (
    <SignUpContainer>
      <Osiopso>
        <Bodoni>Osiopso</Bodoni>
        &nbsp;내 옷장을 앱속으로
      </Osiopso>
      {/* <img src={require("../../assets/The_Great_Gatsby.gif")} alt="" /> */}
      <form>

        <FormInput
          label="이메일"
          type="email"
          required
          onChange={handleChange}
          // onChange={onChangeEmail}
          name="email"
          value={email}
        />
        {/* {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>} */}
          <FormInput
          label="닉네임"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="비밀번호"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="비밀번호 확인"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <ButtonContainer>
          <Button
          type='submit'
          size={'md'}
          variant={ 'success' }
          onClick={JoinFunc}>가입하기</Button>
        </ButtonContainer>
      </form>
		</SignUpContainer>
	)
}

export default Join;
