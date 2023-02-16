import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetOotdCategory } from '../../store/ootd/ootd.reducer';

import { selectUser } from '../../store/user/user.selector';
import { SlExclamation } from "react-icons/sl";
import Button from '../button/button.component';

import Swal from "sweetalert2";

import Input from '@mui/material/Input';

import {
  useState,
  useRef,
} from 'react';

import { ToggleContainer } from '../closet-create-modal/closet-create-modal.styles';

import {
  BottomContainer,
  MarginDiv,
  NoteBox,
  CautionBox,
  TextBox,
} from "./advice-create.styles";

import {
  OotdImgContainer,
  Note,
  OotdInput

} from '../ootd-create/ootd-create.styles';

import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"
import Modal from '../modal/modal.component';
import UnknownToggle from '../toggle/unknown-toggle.component';

import { ref as fref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/utils';


const defaultAdviceForm = {
  content: '',
  imageUrl: '',
  subject: '',
}
const AdviceCreate = ()=> {
    const Token = useSelector(selectUser)
    
    const [check, setCheck] = useState(true)
    const [checked, setChecked] = useState(false)
    const [adviceImg, setAdviceImg] = useState('')
    const [adviceFormData, setAdviceFormData] = useState(defaultAdviceForm)
    const { content, subject }= adviceFormData
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
      setAdviceFormData({ ...adviceFormData, [name]: value })
      console.log(name, value)
    }
      
    const dispatch = useDispatch()
    const navigate = useNavigate()

  
    const submitAdviceCreate = (e) => {
      e.preventDefault();

  
    //formdata형식의 value는 무조건 스트링으로 변환된다.
    // blob객체와 텍스트 형식 데이터만 append할 수 있는 것 같다. (File도 blob객체에 속합)
    // 그렇기에 formdata 타입으로 json타입 데이터를 보낼 때에는 blob함수로 감싸고, 두번째 인자로type: 'application/json'을 같이 넣어줘야 한다.
      // const json = JSON.stringify(ootd)
      // const blob = new Blob([json], { type: "application/json" })
      
      // formData.append("picture", picture)
      // formData.append("advice", blob)
  
      console.log(adviceFormData, 'check:', checked)
      axios({
        method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}feed/advice`,
        data: {
          subject: adviceFormData.subject,
          selected:checked,
          content: adviceFormData.content,
          urls: [
            {
              imageUrl:adviceFormData.urls
            }]
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
      // AlertCreateAdvice()
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
                  : <div><img src={require("../../assets/plus.png")}/></div>
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
          <MarginDiv>
            <Input
              placeholder="제목을 작성해주세요."
              value={subject}
              name='subject'
              onChange={handleChange}
              style={{width:320}}
            />
            <Input
              name="content"
              value={ content }
              placeholder='글을 작성해주세요'
              onChange={handleChange}
              style={{height:100, width:320}}
            >
            </Input>
            <div className='toggleLine'>
              <ToggleContainer>
                <p>익명 설정</p>
                <UnknownToggle
                  setCheck={setCheck}
                  setChecked={setChecked}
                  checked={checked}
                  check={ check}
                />
              </ToggleContainer>
            </div>
          </MarginDiv>
          <Button onClick={submitAdviceCreate}>저장</Button>
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
