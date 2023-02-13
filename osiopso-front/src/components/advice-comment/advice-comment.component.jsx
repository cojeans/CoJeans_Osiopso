import { selectUser } from "../../store/user/user.selector"
import { useSelector } from "react-redux"
import {  useEffect, useState } from "react"

import axios from "axios"
import html2canvas from "html2canvas";

import SimpleSlider from "../closet-slick/closet-slick.component"
import DropArea from "../advice-comment-item-drop/advice-comment-item-drop.component"

//style
import {
	ClothesContainer,
	SliderContainer,
	ImageContainer,
	ItemDropContainer,
	InputContainer,
	CreatAdvicePage,
	AdcivceCommentInput,
	ClothesBox,
	CategoryBox
} from "./advice-component.styles"

//style


const AdviectComment = () => {
	const Token = useSelector(selectUser)
	const [closetList, setClosetList] = useState([])
	const [selectCloset, setSelectCloset] = useState([])
	const [targetItem, setTargetItem] = useState([])
	const [content, setContent] = useState('')
	const [imgUrl, setImgUrl] = useState('')

	const inputHandler = (e) => {

		setContent(e.target.value)
	}
	
	const getUserCloset = () => {
		axios({
			method: "post",
			url: `${process.env.REACT_APP_AXIOS_URL}closet/list?userId=7`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
			},

		}).then((res) => {
			console.log(res)
			setClosetList(res.data)
		}).catch((err) => {
			console.log(err)
		})
	}
const onCapture = () => {
    console.log("onCapture");
	html2canvas(document.getElementById("dropArea")).then((canvas) => {
		const captureImg = canvas.toDataURL("image/png")
		setImgUrl(captureImg)
		// onSaveAs(canvas.toDataURL('image/png'), 'image-download/png')
	})

	submitCommentCreate()
	
}
	const submitCommentCreate = () => {
		console.log('통신보냄	')
		axios({
			method: "post",
			url: `${process.env.REACT_APP_AXIOS_URL}comment/8`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			},
			data: {
				"content": content,
				 "imageUrl":imgUrl,
			}
		}).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
}
	useEffect(() => {
		getUserCloset()
	}, [])

	return (
		<CreatAdvicePage>
			<SliderContainer>
				<SimpleSlider
					closetList={closetList}
					setSelectCloset={ setSelectCloset }
				/>
			</SliderContainer>
			<ClothesBox>
				<CategoryBox>
					전체
				</CategoryBox>
				<ClothesContainer>
					{
						selectCloset.map((cloth, idx) => {
							return <ImageContainer key={idx} >
								<img src={cloth.imageUrl} alt="" onClick={() => setTargetItem([...targetItem, cloth.imageUrl])} />
							</ImageContainer> 
						})
					}
				</ClothesContainer>
			</ClothesBox>
			<ItemDropContainer>
				{/* 저장될 영역 */}
				<div id='dropArea'>
					<DropArea
						targetItem={targetItem}
					/>
				</div>
			</ItemDropContainer>
			<InputContainer>
				<AdcivceCommentInput
					type="text"
					value={content}
					onChange={inputHandler}
				/>
				<button onClick={onCapture}>
					제출
				</button>
			</InputContainer>
		</CreatAdvicePage>
		// <CreatAdvicePage>
		// 		{/* 옷장이 올 자리입니다.  */}
		// 		{/* <>
		// 		<SimpleSlider/>
		// 	</> */}

		// 		{/* 옷 아이템이 올 자리입니다.  */}
		// 	<ClosetContainer>
		// 	</ClosetContainer>

		// 		{/* 옷 아이템이 드랍될 자리입니다.  */}
		// 	<ItemDropContainer>
		// 	</ItemDropContainer>

		// 		{/* 입력창이 있을 자리입니다.  */}

		
		// </CreatAdvicePage>
	)
}

export default AdviectComment