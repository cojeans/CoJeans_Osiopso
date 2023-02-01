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
import { SideBar } from "../side-bar/side-bar.component"

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
			case '/mypage/add-clothes':
				setTopName('옷 등록')
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
        <SideBar/>
			</CategoryContainer>
		</TopBarContainer>
	)
}

export default TopBar