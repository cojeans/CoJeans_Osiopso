import {
	AddPictureBody,
	ExampleBox,
	ExampleContainer,
} from "../clothes-add-body/clothes-add-body.styles"


const ClothesAddPicture = () => {
	return (
		<	AddPictureBody>
			<p>등록하고 싶은 옷을 업로드해주세요</p>
			<ExampleContainer>
				<ExampleBox>
					<img src={require('../../assets/upload-img.jpg')} alt="" />
					<span>앨범에서 선택</span>
				</ExampleBox>
				<ExampleBox>
					<img src="" alt="" />
					<span></span>
				</ExampleBox>
			</ExampleContainer>
		</AddPictureBody>
	)
}

export default ClothesAddPicture