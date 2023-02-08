import {
	AddPictureBody,
	PrevUploadImg,
	ExampleContainer,
	ExampleBox,
	ImageInput
} from './clothes-add-picture.styles'

import Button from '../button/button.component'
import {  useEffect, useRef,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../store/clothes/clothes.reducer';
import { useNavigate } from 'react-router';
import { selectClothes } from '../../store/clothes/clothes.selector';

const ClothesAddPicture = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onNavigateHandler = () => navigate(
		'camera/'
	)
	const onNavigateHandler2 = () => navigate(
		'selectbox/'
	)
	//////////////////////////////////////////////////////////////
	const saveData = useSelector(selectClothes)
	//////////////////////////////////////////////////////////////
	const imgRef = useRef();

	useEffect(() => {
		dispatch(upload('https://pixlr.com/images/index/remove-bg.webp'))	
	}, [])
	
	// 이미지 업로드 input의 onChange
	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			dispatch(upload(reader.result))
		};
	};


	return (
		<	AddPictureBody>
			<p>등록하고 싶은 옷을 업로드해주세요</p>
			<PrevUploadImg>
				<img src={saveData} alt="" />
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