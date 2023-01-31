import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
	TopBarContainer,
	TopBarContent,
	ButtonContainer
} from "./top-bar.styles"

import { ReactComponent as BackButton } from '../../assets/back.svg'


const TopBar = () => {
	const [topName, setTopName] = useState('Osiopso')
	const location = useLocation()
	useEffect(() => {
		switch (location.pathname) {
			case '/join':
				setTopName('회원가입')
				break
			case '/mypage':
				setTopName('마이페이지')
				break
			case '/login':
				setTopName('로그인')
				break
			default:
				setTopName('Osiopso')
		}
}, [location ])

	return (
		<TopBarContainer>
			<ButtonContainer>
				<BackButton/>
			</ButtonContainer>
			<TopBarContent>
				{ topName }
			</TopBarContent>
		</TopBarContainer>
	)
}

export default TopBar