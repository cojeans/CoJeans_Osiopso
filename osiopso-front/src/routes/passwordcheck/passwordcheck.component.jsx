import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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


const PasswordCheck = ({setConfirm}) => {
   
  const [inputPassword, setInputPassword] = useState('')
  const handleInput = (event) => {
    const {value} = event.target
    setInputPassword(value)
    console.log(value)
  }

  // const checkFunc = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "post",
  //     data: {
  //         "message": value
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)

  //   })
  // }

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
              <CloseInput type="password" onChange={handleInput} value={inputPassword}/>
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
        <Button onClick={()=>setConfirm(true)}>
          확인
        </Button>
      </ButtonsContainer>

    </div>
  );
};

export default PasswordCheck;
