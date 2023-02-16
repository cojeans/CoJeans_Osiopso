import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Box,
  PasswordBoxMessage,
  UpperBox,
  CloseInput,
  UpperInput,
  UpperCloseInputbox,
  AlertMessage,
  ButtonBox,
  ButtonsContainer
} from "./passwordcheck.styles";

import Button from '../../components/button/button.component'
import axios from "axios";
import { selectUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';


const PasswordCheck = ({setConfirm}) => {
  const Token = useSelector(selectUser)
  const [inputPassword, setInputPassword] = useState('')
  // const [confirm, setConfirm] = useState(false)
  const handleInput = (event) => {
    const {value} = event.target
    setInputPassword(value)
    console.log(value)
  }
  const checkFunc = (password)=> {
    console.log(password)
    axios({
      method: 'post',
      url:`${process.env.REACT_APP_AXIOS_URL}user/checkPassword`,
      data: {
        "success": true,
        "message": password,
        // confirmPassword: password,
        // responseData:{
        //   confirmPassword : password,
        // }
      },
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
    })
    .then((res)=> {
      console.log(res)  
      setConfirm(true)    
      
    })
    .catch((er)=> {
      console.log(er)
      Swal.fire({
        icon: 'error',
        title: '비밀번호가 다릅니다.',
        text: '비밀번호를 확인해주세요!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      // alert('비밀번호가 다릅니다. 비밀번호를 확인해주세요.')
    })
  }

  const onKeyPress = (inputPassword)=>{
    if(inputPassword.key == 'Enter') {
      console.log(inputPassword)
      checkFunc(inputPassword);
      // setConfirm(true)
    }
  }



  return (
    <div>
      <UpperBox>
        <h3>비밀번호 확인</h3>
      </UpperBox>

      <UpperBox>
        <Box>
          <PasswordBoxMessage>
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한 번 더
            확인해주세요.
          </PasswordBoxMessage>
          <UpperInput>
            <p>비밀번호: </p>
            <UpperCloseInputbox>
              <CloseInput type="password" onKeyPress={()=>onKeyPress(inputPassword)} onChange={handleInput} value={inputPassword}/>
              {/* { 
                inputPassword.length >1 && inputPassword.length< 8
                ? <AlertMessage>비밀번호는 8자 이상이어야합니다.</AlertMessage>
                : ''
              } */}
            </UpperCloseInputbox>
          </UpperInput>
        </Box>
      </UpperBox>
      <ButtonsContainer>
        <Button 
        type='submit'
        size={'md'}
        variant={'success'}
        value={inputPassword}
        onClick={()=>checkFunc(inputPassword)}
        >확인</Button>
      </ButtonsContainer>

    </div>
  );
};

export default PasswordCheck;
