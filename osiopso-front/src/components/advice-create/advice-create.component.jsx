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

  
    //formdata????????? value??? ????????? ??????????????? ????????????.
    // blob????????? ????????? ?????? ???????????? append??? ??? ?????? ??? ??????. (File??? blob????????? ??????)
    // ???????????? formdata ???????????? json?????? ???????????? ?????? ????????? blob????????? ?????????, ????????? ?????????type: 'application/json'??? ?????? ???????????? ??????.
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
              imageUrl:adviceFormData.imageUrl
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
      AlertCreateAdvice()
    }

    const CautionMessage = ()=> {
      alert("???????????? ???????????? ???????????? ????????? ??? ????????? ??????????????? ??? ??????????????????.")
    }
  
    const AlertCreateAdvice = () => {
  
    Swal.fire({
      icon: 'success',
      confirmButtonColor: "#DD6B55", 
      html: `
        Advice ????????? ?????????????????????.
      `,
          showCancelButton: false,
          confirmButtonText: "??????",
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
                  : <div className='imgBox'><img src={require("../../assets/plus.png")}/></div>
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
              <TextBox>?????? ??? ????????????</TextBox>
            </CautionBox>
          </Note>
        </NoteBox>
          <MarginDiv>
            <Input
              placeholder="????????? ??????????????????."
              value={subject}
              name='subject'
              onChange={handleChange}
              style={{width:320}}
            />
            <Input
              name="content"
              value={ content }
              placeholder='?????? ??????????????????'
              onChange={handleChange}
              style={{height:100, width:320}}
            >
            </Input>
            <div className='toggleLine'>
              <ToggleContainer>
                <p>?????? ??????</p>
                <UnknownToggle
                  setCheck={setCheck}
                  setChecked={setChecked}
                  checked={checked}
                  check={ check}
                />
              </ToggleContainer>
            </div>
          </MarginDiv>
          <Button onClick={submitAdviceCreate}>??????</Button>
        </BottomContainer>
        {
          modalOpen && <Modal page={ 3} setModalOpen={setModalOpen} openScroll={openScroll}adviceFormData={ adviceFormData} setAdviceFormData = {setAdviceFormData} />
              }
      </div>
        // <div>
        //     <h1>?????????????????????</h1>
        //     <AdviceImageCreate><img src={require("../../assets/leo.avif")} alt="" /></AdviceImageCreate>
        //     <SaveButton><button>??????</button></SaveButton>
        // </div>
    )
}

export default AdviceCreate
