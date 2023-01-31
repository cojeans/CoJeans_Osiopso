import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import {
	TopBarContainer,
	TopBarContent,
	ButtonContainer,
	CategoryContainer
} from "./top-bar.styles"

import { ReactComponent as BackButton } from '../../assets/back.svg'
import { ReactComponent as Category } from '../../assets/category.svg'


const TopBar = () => {
	const navigate = useNavigate();

	const [topName, setTopName] = useState('Osiopso')
	const location = useLocation()
	useEffect(() => {
		switch (location.pathname) {
			case '/join':
				setTopName('회원가입')
				break
			case '/login':
				setTopName('로그인')
				break
			case '/mypage/closet-create':
				setTopName('옷장 추가')
				break
			default:
				setTopName('Osiopso')
		}
}, [location ])

	return (
		<TopBarContainer>
			<ButtonContainer onClick={() => navigate(-1)}>
				<BackButton />
			</ButtonContainer>	
			<TopBarContent>
				{ topName }
			</TopBarContent>
			<CategoryContainer >
				<Category />
			</CategoryContainer>
		</TopBarContainer>
	)
}

export default TopBar