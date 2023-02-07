import axios from 'axios'
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/user.selector';
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

const defaultOotdForm = {
  content: '',
  picture: '',
  tags :[]
}

const OotdCreate = () => {
  const Token = useSelector(selectUser)
  
  const [ootdImg, setOotdImg] = useState('')
  const [ootdFormData, setOotdFormData] = useState(defaultOotdForm)

  const { content, picture, tags }= ootdFormData
  const imgRef = useRef();

  	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
      reader.onloadend = () => {
        setOotdImg(reader.result)
        setOotdFormData({...ootdFormData, picture:file})
		};
  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setOotdFormData({...ootdFormData, [name]:value})
  }
  
  const submitOotdCreate = (e) => {
    e.preventDefault();
    console.log(content, picture, tags, Token)
    const formData = new FormData()
    const ootd = {
      tags,content
    }

    const json = JSON.stringify(ootd)
    const blob = new Blob([json], { type: "application/json" })
    
    formData.append("picture", picture)
    formData.append("ootd", blob)


    axios({
      method: "post",
      url: "http://localhost:8080/feed/ootd",
      data: formData,
      headers: {
        Authorization: `Bearer ${Token.token}`,
        "Content-Type": "multipart/form-data",
			},
    })
      .then((res) => {
         console.log(res.data)
      }).catch((err) => {
        console.log(err)
    })
  }

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
          <textarea
            name="content"
            value={ content }
            id=""
            cols="30"
            rows="10" 
            placeholder='문구를 입력하세요.'
            onChange={handleChange}
          >
          </textarea>
        </MarginDiv>
        <button onClick={submitOotdCreate}>저장하기</button>
      </BottomContainer>
    </div>
  );
};

export default OotdCreate;
