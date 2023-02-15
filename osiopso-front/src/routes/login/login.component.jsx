import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { SignInContainer, ButtonsContainer, Osiopso, Bodoni, FindIdPassword, IdPasswordBox, MarginBox, ContentBox, ChangeFontColor  } from './login.stlyes'
import { useDispatch } from 'react-redux'
import './login.stlyes'
import axios from 'axios';
import { login } from '../../store/user/user.reducer'
import Swal from 'sweetalert2';
  
const defaultFormFields = {
  email: '',
  password: '',
};

  const loginAlert = () => {
    Swal.fire({
      title:'신고',
      text: "해당 훈수를 신고하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '신고하기'    
    }).then((result)=>{
      if (result.isConfirmed) {
        Swal.fire(
          "신고하였습니다."
        )
      }
    })
  }

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  
  const navigate = useNavigate()
  const LoginFunc = (e) => {
    // e.preventDefault();
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
        alert('이메일이나 비밀번호를 확인해주세요.')
        navigate("/login")
      })
  }

  const SignUp = ()=>{
    navigate('/join')
  }

  const goToFindPage = ()=> {
    navigate('/find')
    
  }

  const onKeyPress = (e)=> {
    if(e.key === 'Enter') {
      LoginFunc();
    }
  }
  return (
    <SignInContainer>

      <hr />
      {/* <h2>Already have an account?</h2> */}
      {/* <span>이메일과 비밀번호를 입력하세요.</span> */}
      <Osiopso>
        <Bodoni>Osiopso</Bodoni>
        &nbsp;내 옷장을 앱속으로
        </Osiopso>

        <ContentBox>
        <IdPasswordBox>
          <div>
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
            onKeyPress = {onKeyPress}
          />
          </div>
          <FindIdPassword onClick={goToFindPage}>아이디 / 비밀번호 찾기  </FindIdPassword>
        </IdPasswordBox>

        <MarginBox>
        <ButtonsContainer>
        <Button
          type='submit'
          size={'md'}
          variant={ 'success'}
          onClick={LoginFunc}
          ><ChangeFontColor>Sign In</ChangeFontColor></Button>

        <Button
          type='submit'
          size={'md'}
          variant={ 'success'}
          onClick={SignUp}
          ><ChangeFontColor>Join</ChangeFontColor></Button>
        
        </ButtonsContainer>
        </MarginBox>
        </ContentBox>
    </SignInContainer>
  );
};

export default Login;