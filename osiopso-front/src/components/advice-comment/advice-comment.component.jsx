import { selectUser } from "../../store/user/user.selector"
import { useSelector } from "react-redux"
import { Fragment, useEffect } from "react"

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
	const getUserCloset = () => {
		axios({
			method: "post",
			url: `https://www.osiopso.site/api/closet/list?userId=5`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log(res)
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
				<SimpleSlider/>
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