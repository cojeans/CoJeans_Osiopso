import { useState } from "react";
import PasswordCheck from "../passwordcheck/passwordcheck.component";
import {
  UpperBox,
  Box,
  PasswordBoxMessage,
  UpperInput,
  CloseInput,
  UpperCloseInputbox,
  AlertMessage,
  ButtonBox,
  TextBox,
} from "./changepassword.styles";

const ChangePassword = () => {
  const [inputPassword1, setInputPassword1] = useState("");
  const [inputPassword2, setInputPassword2] = useState("");
  const handleInput1 = (event) => {
    const { value } = event.target;
    setInputPassword1(value);
    console.log(value);
  };
  const handleInput2 = (event) => {
    const { value } = event.target;
    setInputPassword2(value);
  };

  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      {!confirm ? (
        <PasswordCheck setConfirm={setConfirm} />
      ) : (
        <div>
          <UpperBox>
            <h3>비밀번호 변경페이지</h3>
          </UpperBox>

          <UpperBox>
            <Box>
              <PasswordBoxMessage>
                회원님의 개인정보를 안전하게 보호하기 위해 90일 이상 비밀번호를
                변경하지 않은 경우 비밀번호 변경을 권장하고 있습니다.
              </PasswordBoxMessage>
              <UpperInput>
                <TextBox>비밀번호: </TextBox>
                <UpperCloseInputbox>
                  <CloseInput
                    type="password"
                    onChange={handleInput1}
                    value={inputPassword1}
                  />
                  {inputPassword1.length > 1 && inputPassword1.length < 8 ? (
                    <AlertMessage>
                      비밀번호는 8자 이상이어야합니다.
                    </AlertMessage>
                  ) : (
                    ""
                  )}
                </UpperCloseInputbox>
              </UpperInput>

              <UpperInput>
                <p>비밀번호 확인: </p>
                <UpperCloseInputbox>
                  <CloseInput
                    type="password"
                    onChange={handleInput2}
                    value={inputPassword2}
                  />
                  {inputPassword2 > 7 && inputPassword1 !== inputPassword2 ? (
                    <AlertMessage>
                      비밀번호가 비밀번호 확인과 다릅니다.
                    </AlertMessage>
                  ) : (
                    ""
                  )}
                </UpperCloseInputbox>
              </UpperInput>
            </Box>
          </UpperBox>
          <ButtonBox>
            {inputPassword1 === inputPassword2 &&
            inputPassword1 > 7 &&
            inputPassword2 > 7 ? (
              <button>저장</button>
            ) : (
              ""
            )}
          </ButtonBox>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
