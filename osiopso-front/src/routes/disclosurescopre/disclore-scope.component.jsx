import { Box, TopBox, Words } from "./disclosure-scope.styles";
import { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  // margin-top: 8rem;
  left: -40%;
  cursor: pointer;

  .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  .toggle--checked {
    background-color: rgb(0, 200, 102);
    transition: 0.5s;
  }
  .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }
  .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

const Desc = styled.div`
  // 설명 부분의 CSS를 구현
  text-align: center;
  margin: 20px;
`;

const DisclosureScope = () => {
  const [myCloset, setMyCloset] = useState(false);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setMyCloset(!myCloset);
  };

  const [myProfile, setMyProfile] = useState(false);
  const profileHandler = ()=> {
    setMyProfile(!myProfile)
  }


  return (
    
      <TopBox>
        <Box>
          <Words>내 옷장</Words>
          <div>
            <ToggleContainer
              // 클릭하면 토글이 켜진 상태(myCloset)를 boolean 타입으로 변경하는 메소드가 실행
              onClick={toggleHandler}
            >
              {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
              {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
              <div
                className={`toggle-container ${
                  myCloset ? "toggle--checked" : null
                }`}
              />
              <div
                className={`toggle-circle ${myCloset ? "toggle--checked" : null}`}
              />
            </ToggleContainer>
            {/* Desc 컴포넌트를 활용*/}
            {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
            {/* {isOn === false ?
      <Desc><div className='OFF'>FEJIGU Toggle Switch OFF</div></Desc> :
      <Desc><div className='ON'></div>FEJIGU Toggle Switch ON</Desc>} */}
          </div>
        </Box>

        <Box>
          <Words>내 프로필</Words>
          <div>
            <ToggleContainer onClick={profileHandler}>
              <div
                className={`toggle-container ${
                  myProfile ? "toggle--checked" : null
                }`}
              />
              <div
                className={`toggle-circle ${myProfile ? "toggle--checked" : null}`}
              />
            </ToggleContainer>
          </div>
        </Box>

        {/* <Box>
          <span>내 옷장</span>
          <div>
            <ToggleContainer onClick={toggleHandler}>
              <div
                className={`toggle-container ${
                  isOn ? "toggle--checked" : null
                }`}
              />
              <div
                className={`toggle-circle ${isOn ? "toggle--checked" : null}`}
              />
            </ToggleContainer>
          </div>
        </Box>

        <Box>
          <span>내 옷장</span>
          <div>
            <ToggleContainer onClick={toggleHandler}>
              <div
                className={`toggle-container ${
                  isOn ? "toggle--checked" : null
                }`}
              />
              <div
                className={`toggle-circle ${isOn ? "toggle--checked" : null}`}
              />
            </ToggleContainer>
          </div>
        </Box> */}
      </TopBox>
  
  );
};

export default DisclosureScope;
