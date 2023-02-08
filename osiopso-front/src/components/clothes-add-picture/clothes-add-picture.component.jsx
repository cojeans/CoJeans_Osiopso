import {
  AddPictureBody,
  PrevUploadImg,
  ExampleContainer,
  ExampleBox,
  ImageInput,
} from "./clothes-add-picture.styles";

import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload, checkLocal } from "../../store/clothes/clothes.reducer";
import { useNavigate } from "react-router";
import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import axios from "axios";
import { resetCloset } from "../../store/closet/closet.reducer";

const ClothesAddPicture = () => {
  // const [isGallery, setGallery] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    navigate("camera/");
    // setGallery(false);
  };
  const onNavigateHandler2 = () => navigate("selectbox/");
  const [rawData, setRawData] = useState("");
  const [imgData, setImgData] = useState("");
  // useEffect(() => {
  // 	callAxios()
  // }, [rawData])
  //////////////////////////////////////////////////////////////
  // const saveData = useSelector(selectClothes)
  const isGallery = useSelector(localPhoto);
  //////////////////////////////////////////////////////////////
  const imgRef = useRef();

  // useEffect(() => {
  // 	dispatch(upload('https://pixlr.com/images/index/remove-bg.webp'))
  // }, [])

  // 이미지 업로드 input의 onChange
  // const saveData = useSelector(selectClothes)
  const saveData = useSelector(selectClothes);
const getImageFile = () => {

	const saveImgFile = () => {
		// dispatch(upload(''))
		
		// dispatch(checkLocal(true));
		// setGallery(false);
		
		
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		// console.log(reader.readAsDataURL(file))
		// navigate("after_add")
		
		reader.onloadend = () =>{
			// console.log(reader.result)
			// result = reader.result
			// setRawData(reader.result)
			dispatch(upload(reader.result));
		}
	
	
	
		// console.log(rawData)
		// console.log(mydata)
		// console.log(reader.result)
		// reader.onloadend = () => {
	// 	window.a = reader.result
	
    //   dispatch(upload(reader.result));
    //   setRawData(reader.result)
    // };
	// console.log(saveData)
	// console.log(window.a)
	// console.log(rawData)
    // setGallery(true);
    // console.log('success')
    // setImgData('')
    // callAxios()
	
    // console.log(imgData)
    // console.log(saveData)
    
// callAxios(rawData);
// dispatch(upload(imgData));
// console.log("receive success", saveData);
// console.log(imgData, 'imgData')

// console.log(saveData)
// console.log(imgData, 'imgData')
};

// console.log(rawData)

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
		"X-Api-Key": "xCJE6CPZJE3bM8DeC8CpUcrb",
	},
	  responseType: "blob",
	  encoding: null,
	})
	  .then((response) => {
		  // console.log('success')
		// setImgData(URL.createObjectURL(response.data));
		// setGallery(true);
		dispatch(upload(URL.createObjectURL(response.data)));
	})
	.catch((e) => console.log(e, "something missing"));
	//   console.log("success");
};

saveImgFile()
// callAxios()
// console.log(rawData)

console.log(saveData)

}  


// const saveData = useSelector(selectClothes);
  // const saveData2 = useSelector(selectClothes)

  return (
    <AddPictureBody>
      <p>등록하고 싶은 옷을 업로드해주세요</p>
      <PrevUploadImg>
        { saveData && <img src={saveData} alt="https://pixlr.com/images/index/remove-bg.webp" />}
        {/* { isGallery && imgData && <img src={imgData} alt="https://pixlr.com/images/index/remove-bg.webp" />} */}
        {/* {rawData && (
          <img
            src={rawData}
            alt="https://pixlr.com/images/index/remove-bg.webp"
          />
        )} */}
        {/* {isGallery? (<img src={imgData} alt="https://pixlr.com/images/index/remove-bg.webp" />) :(<img src={saveData} alt="https://pixlr.com/images/index/remove-bg.webp" />)} */}
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
        <ExampleBox onClick={onNavigateHandler}>
          <img src={require("../../assets/upload-camera.png")} alt="" />
          <span>사진 촬영</span>
        </ExampleBox>
        {/* <ExampleBox onClick={callAxios}>
          <span>배경 제거</span>
        </ExampleBox> */}
      </ExampleContainer>
      <Button onClick={onNavigateHandler2}>선택 완료</Button>
    </AddPictureBody>
  );
};

export default ClothesAddPicture;
