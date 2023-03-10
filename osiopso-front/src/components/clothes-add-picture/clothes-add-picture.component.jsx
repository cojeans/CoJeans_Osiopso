import {
  AddPictureBody,
  PrevUploadImg,
  ExampleContainer,
  ExampleBox,
  LinkContainer,
  ImageInput,
} from "./clothes-add-picture.styles";

import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload, checkLocal } from "../../store/clothes/clothes.reducer";
import { useNavigate, useLocation } from "react-router";
import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import axios from "axios";
import { resetCloset } from "../../store/closet/closet.reducer";

const init_img_url = 'https://pixlr.com/images/index/remove-bg.webp'
const ClothesAddPicture = () => {

  const dispatch = useDispatch();
  const [rawData, setRawData] = useState("");

  const { state } = useLocation();
  console.log(state, 'this is state')
  useEffect(() => {
    if(!state){
      dispatch(upload(init_img_url))
    }
  }, [])

  useEffect(() => {
    if(rawData) {
      console.log(rawData)
      callAxios()
    }
  }, [rawData])

  const navigate = useNavigate();
  const onNavigateHandler = () => {
    navigate("camera/");
  };



  const imgRef = useRef();


  // 이미지 업로드 input의 onChange
  // const saveData = useSelector(selectClothes)
  const saveData = useSelector(selectClothes);
  const getImageFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setRawData(reader.result);
      dispatch(upload(reader.result))
      // callAxios()
    };
  };
  const testAxios = () => {
    console.log('this is test axios')
  }
  const callAxios = () => {
    // dispatch(upload(''))
    console.log();
    axios({
      // url: `${process.env.REACT_APP_BASE_URL}/v1.0/removebg`,
      url: "https://api.remove.bg/v1.0/removebg",
      method: "post",
      data: {
        // image_url: imgUrl,
        image_file_b64: rawData,
        size: "auto",
        format: "auto",
        type: "auto",
      },
      headers: {
        // "X-Api-Key": process.env.REACT_APP_XAPIKEY,
        // "X-Api-Key":  'PnDSvC4k3ngFj8ToFfvgsEkw',
        // "X-Api-Key":  'pq1tqANSxrre5Ew6kLmHDy9z',
        // "X-Api-Key":  'PzbMyVS4F5y7n1kg9TP2eMau',
        // "X-Api-Key":  'YkXbSwfXA7wfypEVtJ1gu7fZ',
        // "X-Api-Key":  'N4HypXxuuvgLNFWQcgtbBK8s'
        // "X-Api-Key":  'RPeTWv3UMQeYg9ZSWfqdJPwC'
        // "X-Api-Key": "xCJE6CPZJE3bM8DeC8CpUcrb",
        // "X-Api-Key": "bQ9R6a8bhNRt4jSm5QG4HQmX",
        "X-Api-Key": "27evdYywqapqznMezZWC7iT9",
        
      },
      responseType: "blob",
      encoding: null,
    })
      .then((response) => {
        // console.log('success')
        // setImgData(URL.createObjectURL(response.data));
        // setGallery(true);
        setRawData('')
        dispatch(upload(URL.createObjectURL(response.data)));
      })
      .catch((e) => {
        console.log(e, "something missing");
        // setRawData('')
        dispatch(upload(rawData));
      })
        
  };


  return (
    <AddPictureBody>
      <p>등록하고 싶은 옷을 업로드해주세요</p>
      <PrevUploadImg>
        {rawData? (<img src={rawData} alt="https://pixlr.com/images/index/remove-bg.webp" />) :(<img src={saveData} alt="https://pixlr.com/images/index/remove-bg.webp" />)}
      </PrevUploadImg>
      <ExampleContainer>
        <ExampleBox>
          <label htmlFor="profileImg">
            <img src={require("../../assets/upload-image.png")} alt="" />
            <span>사진 선택</span>
          </label>
          <ImageInput
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={getImageFile}
            ref={imgRef}
          />
        </ExampleBox>
        {/* <ExampleBox onClick={callAxios}>
          <img src={require("../../assets/background.jpg")} alt="" />
          <span>배경제거</span>
        </ExampleBox> */}
        <ExampleBox onClick={onNavigateHandler}>
          <img src={require("../../assets/upload-camera.png")} alt="" />
          <span>사진 촬영</span>
        </ExampleBox>
      </ExampleContainer>
      <LinkContainer to='/selectbox'>
        {(saveData !== init_img_url) && (<Button>선택 완료</Button>)}
      </LinkContainer>
    </AddPictureBody>
  );
};

export default ClothesAddPicture;
