import React from 'react';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import { signup } from '../../utils/APIUtils';
import kakaoLogo from '../../assets/kakao-logo.png';
import googleLogo from '../../assets/google-logo.png';
import githubLogo from '../../assets/github-logo.png';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'

import axios from 'axios';
import './join.stlyes'
// import './join.css';

// import Alert from 'react-s-alert';
import { useDispatch } from "react-redux";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import Swal from "sweetalert2";


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

  // const handleSubmit = async (event) => {
  // 	event.preventDefault();

  // if (password !== confirmPassword) {
  //   alert('passwords do not match');
  //   return;
  // }
  const onLoading = ()=> {
    

  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  // const dispatch = useDispatch();
  const JoinFunc = (e) => {
    // onLoading()
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_AXIOS_URL}user/signUp`,
      data: {
        email: email,
        name: displayName,
        password: password,
      },
    })

    let timerInterval
    Swal.fire({
      title: '회원가입을 진행중입니다!',
      html: ' 천 분의 <b></b>초 후에 닫힙니다.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })    

      // onLoading()
      .then((res) => {
        console.log(res);
        // localStorage.clear()
        // localStorage.setItem('token', res.data.accessToken)
        // localStorage.setItem('email', email)

        // const value = {email, token: res.data.accessToken}
        // dispatch(login(value))

        Swal.fire({
          icon: 'success',
          confirmButtonColor:"#000000",
          html: `
          회원가입이 완료되었습니다.`,     
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
          label="아이디"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="이메일"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
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
      <TextContainer>간편 회원가입</TextContainer>
					<SocialSignup>
						<a href={GOOGLE_AUTH_URL}><img src={googleLogo} alt="Google" /> </a>
						<a href={KAKAO_AUTH_URL}><img src={kakaoLogo} alt="Kakao" /> </a>
						<a href={GITHUB_AUTH_URL}><img src={githubLogo} alt="Github" /> </a>
					</SocialSignup>
				
		</SignUpContainer>
  );
};

export default Join;
