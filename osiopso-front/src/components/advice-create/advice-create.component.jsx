
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetOotdCategory } from '../../store/ootd/ootd.reducer';

import { selectUser } from '../../store/user/user.selector';
import { selectorOotdCategory } from '../../store/ootd/ootd.selector';

import Swal from "sweetalert2";

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
} from "./advice-create.styles";

import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"
import Modal from '../modal/modal.component';


const defaultOotdForm = {
  content: '',
  picture: '',
  tags :[]
}
const AdviceCreate = ()=> {

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
    
    const ootdTags = useSelector(selectorOotdCategory)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToHome = ()=> {
        navigate('/')
    }
  
    const submitOotdCreate = (e) => {
      e.preventDefault();
      const formData = new FormData()
      const ootd = {
        tags:ootdTags
        , content
      }
      console.log(ootd)
  
    //formdata형식의 value는 무조건 스트링으로 변환된다.
    // blob객체와 텍스트 형식 데이터만 append할 수 있는 것 같다. (File도 blob객체에 속합)
    // 그렇기에 formdata 타입으로 json타입 데이터를 보낼 때에는 blob함수로 감싸고, 두번째 인자로type: 'application/json'을 같이 넣어줘야 한다.
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
      dispatch(resetOotdCategory())
      AlertCreateOotd()
    }
  
    const AlertCreateOotd = () => {
  
    Swal.fire({
      icon: 'success',
      confirmButtonColor: "#DD6B55", 
      html: `
        훈수 게시물이 작성되었습니다.
      `,
          showCancelButton: false,
          confirmButtonText: "확인",
    }).then(() => {
      navigate('/advice/commentlist')
    })
  }
  
  
    const [modalOpen, setModalOpen] = useState(false);
      const { lockScroll, openScroll } = useBodyScrollLock()
  
      const showModal = () => {
      window.scrollTo(0, 0);
      setModalOpen(true);
      lockScroll();
      };
  
    return (
        <div>
        <TopContainer>
          <Xcontainer>
            <img src={require("../../assets/X.png")} alt="" onClick={goToHome}/>
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
                  : <div><span>+</span></div>
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
            <StyleTagButton onClick={showModal} >Add Tag</StyleTagButton>
          </MarginDiv>
          <MarginDiv>
            <textarea
              name="content"
              value={ content }
              id=""
              cols="30"
              rows="10" 
              placeholder='글을 작성해주세요'
              onChange={handleChange}
            >
            </textarea>
          </MarginDiv>
          <button onClick={submitOotdCreate}>저장</button>
        </BottomContainer>
        {
          modalOpen && <Modal page={ false} setModalOpen={setModalOpen} openScroll={openScroll}ootdFormData={ ootdFormData} setOotdFormData = {setOotdFormData} />
              }
      </div>
        // <div>
        //     <h1>훈수생성페이지</h1>
        //     <AdviceImageCreate><img src={require("../../assets/leo.avif")} alt="" /></AdviceImageCreate>
        //     <SaveButton><button>저장</button></SaveButton>
        // </div>
    )
}

export default AdviceCreate