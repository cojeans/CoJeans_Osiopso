import {
	AddPictureBody,
	PrevUploadImg,
	ExampleContainer,
	ExampleBox,
	ImageInput
} from './clothes-add-picture.styles'

import Button from '../button/button.component'
import {  useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../store/clothes/clothes.reducer';
import { useNavigate } from 'react-router';
import { selectClothes } from '../../store/clothes/clothes.selector';
import axios from "axios";

const ClothesAddPicture = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onNavigateHandler = () => navigate(
		'camera/'
	)
	const onNavigateHandler2 = () => navigate(
		'selectbox/'
	)
	const [imgData, setImgData] = useState("");
	const [isGallery, setGallery] = useState(false);
	//////////////////////////////////////////////////////////////
	const saveData = useSelector(selectClothes)
	//////////////////////////////////////////////////////////////
	const imgRef = useRef();

	// useEffect(() => {
	// 	dispatch(upload('https://pixlr.com/images/index/remove-bg.webp'))	
	// }, [])
	
	// 이미지 업로드 input의 onChange
	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			dispatch(upload(reader.result))
		};
		callAxios()
		console.log('succes')
	};
	const callAxios = () => {

		axios({
			// url: `${process.env.REACT_APP_BASE_URL}/v1.0/removebg`,
			url: "https://api.remove.bg/v1.0/removebg",
			method: "post",
			data: {
				// image_url: imgUrl,
				image_file_b64: saveData,
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
				"X-Api-Key":  'N4HypXxuuvgLNFWQcgtbBK8s'
			},
	  responseType: "blob",
	  encoding: null,
	})
	.then((response) => {
		setImgData(URL.createObjectURL(response.data));
		setGallery(true);
		// dispatch(upload(URL.createObjectURL(response.data)));
		
		
	})
	.catch((e) => console.log(e, "something missing"));
	// console.log(imgData, 'imgData')
}
	// callAxios()
	return (
		<AddPictureBody>
			<p>등록하고 싶은 옷을 업로드해주세요</p>
			<PrevUploadImg>
				{/* {saveData && <img src={saveData} alt="https://pixlr.com/images/index/remove-bg.webp" />} */}
				{/* {imgData && <img src={imgData} alt="https://pixlr.com/images/index/remove-bg.webp" />} */}
				{isGallery? (<img src={imgData} alt="https://pixlr.com/images/index/remove-bg.webp" />) :( <img src={saveData} alt="https://pixlr.com/images/index/remove-bg.webp" />)}
			</PrevUploadImg>
			<ExampleContainer>
				<ExampleBox>
					<label htmlFor="profileImg">
						<img src={require('../../assets/upload-image.png')} alt="" />
						<span>사진 선택</span>
					</label>
					<ImageInput
					type="file"
					accept="image/*"
					id="profileImg"
					onChange={saveImgFile}
					ref={imgRef}
					/>
				</ExampleBox>
				<ExampleBox onClick={onNavigateHandler}>
					<img src={require('../../assets/upload-camera.png')} alt="" />
					<span>사진 촬영</span>
				</ExampleBox>
			</ExampleContainer>
				<Button onClick={onNavigateHandler2}>선택 완료</Button>	
		</AddPictureBody>
	)
}

export default ClothesAddPicture