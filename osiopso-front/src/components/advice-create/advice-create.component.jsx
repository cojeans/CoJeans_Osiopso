import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetOotdCategory } from '../../store/ootd/ootd.reducer';

import { selectUser } from '../../store/user/user.selector';
import { selectorOotdCategory } from '../../store/ootd/ootd.selector';
import { SlExclamation } from "react-icons/sl";

import Swal from "sweetalert2";

import {
  useState,
  useRef,
} from 'react';

import {
  Xcontainer,
  TopContainer,
  BottomContainer,
  MarginDiv,
  OotdInput,
  OotdImgContainer,
  NoteBox,
  CautionBox,
  TextBox,
  Note,
} from "./advice-create.styles";

import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"
import Modal from '../modal/modal.component';

import { ref as fref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/utils';


const defaultAdviceForm = {
  content: '',
  imageUrl: '',
  tags :[]
}
const AdviceCreate = ()=> {

    const Token = useSelector(selectUser)
  
    const [adviceImg, setAdviceImg] = useState('')
    const [adviceFormData, setAdviceFormData] = useState(defaultAdviceForm)
  
    const { content, imageUrl, tags }= adviceFormData
    const imgRef = useRef();
  
        const saveImgFile = async () => {
    const file = imgRef.current.files[0];
    const uploaded_file = await uploadBytes(
                fref(storage, `images/${file.name}`),
                file,
      );
    console.log(uploaded_file ,'testing')
		const reader = new FileReader();
		reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAdviceImg(reader.result)
      };
      const file_url = await getDownloadURL(uploaded_file.ref)
      console.log(file_url)
      setAdviceFormData({...adviceFormData, imageUrl:file_url})

  };
    const handleChange = (e) => {
      const { name, value } = e.target
      setAdviceFormData({...adviceFormData, [name]:value})
    }
    
    const adviceTags = useSelector(selectorOotdCategory)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToHome = ()=> {
        navigate('/')
    }

  
    const submitAdviceCreate = (e) => {
      e.preventDefault();
      console.log(adviceTags)
      // const formData = new FormData()
      const advice = {
        tags: adviceTags,
        content,
        urls: [
          {imageUrl}
        ]
      }

      const ootd = {
        tags:adviceTags
        , content
      }
      console.log(ootd)
  
    //formdata형식의 value는 무조건 스트링으로 변환된다.
    // blob객체와 텍스트 형식 데이터만 append할 수 있는 것 같다. (File도 blob객체에 속합)
    // 그렇기에 formdata 타입으로 json타입 데이터를 보낼 때에는 blob함수로 감싸고, 두번째 인자로type: 'application/json'을 같이 넣어줘야 한다.
      // const json = JSON.stringify(ootd)
      // const blob = new Blob([json], { type: "application/json" })
      
      // formData.append("picture", picture)
      // formData.append("advice", blob)
  
      console.log(advice)
      axios({
        method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}feed/advice`,
        data: {
          tags: advice.tags,
          content: advice.content,
          urls: advice.urls
        },
        headers: {
          Authorization: `Bearer ${Token.token}`,
              },
      })
        .then((res) => {
           console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
      dispatch(resetOotdCategory())
      AlertCreateAdvice()
    }

    const CautionMessage = ()=> {
      alert("회원들이 전체적인 스타일을 확인할 수 있도록 전신사진을 꼭 포함해주세요.")
    }
  
    const AlertCreateAdvice = () => {
  
    Swal.fire({
      icon: 'success',
      confirmButtonColor: "#DD6B55", 
      html: `
        훈수 게시물이 작성되었습니다.
      `,
          showCancelButton: false,
          confirmButtonText: "확인",
    }).then(() => {
      navigate('/advice')
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
        <BottomContainer>
          <OotdImgContainer>
            <label htmlFor="profileImg">
              <OotdImgContainer>
              {
                adviceImg 
                    ? <img src={adviceImg} alt="" />
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
          <NoteBox>
          <Note>
            <CautionBox onClick={CautionMessage}>
              <SlExclamation />
              <TextBox>작성 시 유의사항</TextBox>
            </CautionBox>
          </Note>
        </NoteBox>
          {/* <NoteBox>
          <Note>
            <ExclamationMark>
              <SlExclamation />
            </ExclamationMark>
            <div onClick={CautionMessage}>
              작성 시 유의사항
            </div>
          </Note>
        </NoteBox> */}
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
          <button onClick={submitAdviceCreate}>저장</button>
        </BottomContainer>
        {
          modalOpen && <Modal page={ 3} setModalOpen={setModalOpen} openScroll={openScroll}adviceFormData={ adviceFormData} setAdviceFormData = {setAdviceFormData} />
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
