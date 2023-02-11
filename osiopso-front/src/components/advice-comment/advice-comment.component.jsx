import { selectUser } from "../../store/user/user.selector"
import { useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react"

import axios from "axios"

import SimpleSlider from "../closet-slick/closet-slick.component"
//style
import {
	CreatAdvicePage,
	ClosetContainer,
	ItemDropContainer,
	InputContainer,
	SliderContainer
} from "./advice-component.styles"

//style



const AdviectComment = () => {
	const Token = useSelector(selectUser)
	const [closetList, setClosetList] = useState([])
	
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
	useEffect(() => {
		getUserCloset()
	},[])
	return (
		<div>
			<SliderContainer>
				<SimpleSlider
					closetList={ closetList}
				/>
			</SliderContainer>
		</div>
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
		// 	<InputContainer>
		// 	</InputContainer>
		
		// </CreatAdvicePage>
	)
}

export default AdviectComment