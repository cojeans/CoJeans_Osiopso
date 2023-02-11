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
  StyleTagButton,
  TagBox
} from "./ootd-create.styles";

import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"
import Modal from '../modal/modal.component';

import { ref as fref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/utils';

const defaultOotdForm = {
  content: '',
  imageUrl: '',
  tags :[]
}


const OotdCreate = () => {
  const Token = useSelector(selectUser)
  
  const [ootdImg, setOotdImg] = useState('')
  const [ootdFormData, setOotdFormData] = useState(defaultOotdForm)

  const { content, imageUrl, tags }= ootdFormData
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
        setOotdImg(reader.result)
      };
      const file_url = await getDownloadURL(uploaded_file.ref)
      console.log(file_url)
      setOotdFormData({...ootdFormData, imageUrl:file_url})

  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setOotdFormData({...ootdFormData, [name]:value})
  }
  
  const ootdTags = useSelector(selectorOotdCategory)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToMain = ()=>{
    navigate("/")
  }


  const submitOotdCreate = (e) => {
    e.preventDefault();
    const ootd = {
      tags: ootdTags,
      content,
      urls: [
        {imageUrl}
      ]
    }
    console.log(ootd)

  //formdata형식의 value는 무조건 스트링으로 변환된다.
  // blob객체와 텍스트 형식 데이터만 append할 수 있는 것 같다. (File도 blob객체에 속합)
  // 그렇기에 formdata 타입으로 json타입 데이터를 보낼 때에는 blob함수로 감싸고, 두번째 인자로type: 'application/json'을 같이 넣어줘야 한다.
    console.log(ootd.tags)

    axios({
      method: "post",
      url: "https://www.osiopso.site/api/feed/ootd",
      data: {
        tags: ootd.tags,
        content: ootd.content,
        urls: ootd.urls
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
    AlertCreateOotd()
  }

  const AlertCreateOotd = () => {

  Swal.fire({
    icon: 'success',
    confirmButtonColor: "#DD6B55", 
    html: `
      OOTD 게시물이 작성되었습니다.
    `,
		showCancelButton: false,
		confirmButtonText: "확인",
  }).then(() => {
    navigate('/#OOTD')
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
          <img src={require("../../assets/X.png")} alt="" onClick={goToMain}/>
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
          <TagBox>
            {
              ootdTags.map((tag) => {
                return <div>#{tag.type}</div>
              })
            }
          </TagBox>
        </MarginDiv>
        <MarginDiv>
          <textarea
            name="content"
            value={ content }
            id=""
            cols="30"
            rows="10" 
            placeholder='#코딩이 #힘들다'
            onChange={handleChange}
          >
          </textarea>
        </MarginDiv>
        <button onClick={submitOotdCreate}>저장</button>
      </BottomContainer>
      {
        modalOpen && <Modal page={ 2} setModalOpen={setModalOpen} openScroll={openScroll}ootdFormData={ ootdFormData } setOotdFormData = {setOotdFormData} />
			}
    </div>
  );
};

export default OotdCreate;
