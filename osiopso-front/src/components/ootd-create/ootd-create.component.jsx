import axios from 'axios'

import {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  Xcontainer,
  TopContainer,
  BottomContainer,
  MarginDiv,
  OotdInput,
  OotdImgContainer,
  StyleTagButton
} from "./ootd-create.styles";



const OotdCreate = () => {

  const [ootdImg, setOotdImg] = useState('')

  const imgRef = useRef();

  	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
      reader.onloadend = () => {
      setOotdImg(reader.result)
		};
	};

  return (
    <div>
      <TopContainer>
        <Xcontainer>
          <img src={require("../../assets/X.png")} alt="" />
        </Xcontainer>
        <h3>새 게시물</h3>
      </TopContainer>
      <BottomContainer>
        <OotdImgContainer>
          <label htmlFor="profileImg">
            <OotdImgContainer>
            {
              ootdImg 
                ? <img src={ootdImg} alt="" />
                : <span>+</span>
            }
            </OotdImgContainer>
          </label>
          <OotdInput
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </OotdImgContainer>
        <MarginDiv>
          <StyleTagButton>+ 스타일 태그 추가하기</StyleTagButton>
        </MarginDiv>
        <MarginDiv>
          <textarea name="" id="" cols="30" rows="10" placeholder='문구를 입력하세요.'>
          </textarea>
        </MarginDiv>
        <button>저장하기</button>
      </BottomContainer>
    </div>
  );
};

export default OotdCreate;
