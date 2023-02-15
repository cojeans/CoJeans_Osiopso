import { selectUser } from "../../store/user/user.selector"
import { useSelector } from "react-redux"
import {  useEffect, useState } from "react"


import axios from "axios"
import html2canvas from "html2canvas";

import SimpleSlider from "../closet-slick/closet-slick.component"
import DropArea from "../advice-comment-item-drop/advice-comment-item-drop.component"
import Button from "../button/button.component";

// slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
//

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
	//slick
	const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
			slidesToScroll: 1,
		variableWidth: true,
	};
	//slick

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
			{/* <div className="closet">옷장</div> */}
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
						selectCloset.length ?
						<Slider {...settings}>
						{
							selectCloset.map((cloth, idx) => {
								return <ImageContainer key={idx} >
									<img src={cloth.imageUrl} alt="" onClick={() => setTargetItem([...targetItem, cloth.imageUrl])} />
								</ImageContainer> 
							})
						}
							</Slider>
					: <div className="gray">옷장을 선택해 주세요</div>
				}
				</ClothesContainer>
			</ClothesBox>
			<ItemDropContainer>
				{/* 저장될 영역 */}
				{
					!targetItem.length ?	
					<img className='imageExample' src={ require('../../assets/example_advice.jpg')} alt="" />
				:
					<div id='dropArea'>
						<DropArea
							targetItem={targetItem}
						/>
					</div>
				}
			</ItemDropContainer>
			<InputContainer>
				<AdcivceCommentInput
					type="text"
					value={content}
					onChange={inputHandler}
					placeholder='훈수 댓글을 작성해 주세요.😊'
				/>
				<Button onClick={onCapture}>
					제출
				</Button>
			</InputContainer>
		</CreatAdvicePage>
	)
}

export default AdviectComment