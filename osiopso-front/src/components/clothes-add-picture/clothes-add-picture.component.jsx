import {
	AddPictureBody,
	PrevUploadImg,
	ExampleContainer,
	ExampleBox,
	ImageInput
} from './clothes-add-picture.styles'

import Button from '../button/button.component'
import {  useRef, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { upload } from '../../store/clothes/clothes.reducer';

const ClothesAddPicture = () => {

	const [imgFile, setImgFile] = useState("");
	const imgRef = useRef();

	const dispatch = useDispatch()

	// 이미지 업로드 input의 onChange
	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImgFile(reader.result);
			dispatch(upload(reader.result))
		};
	};
	return (
		<	AddPictureBody>
			<p>등록하고 싶은 옷을 업로드해주세요</p>
			<PrevUploadImg>
				<img src={imgFile ? imgFile :`https://pixlr.com/images/index/remove-bg.webp`} alt="" />
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
				<ExampleBox>
					<img src={require('../../assets/upload-camera.png')} alt="" />
					<span>사진 촬영</span>
				</ExampleBox>
			</ExampleContainer>
				<Button>선택 완료</Button>
		</AddPictureBody>
	)
}

export default ClothesAddPicture