import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Fragment } from "react"
import {
	TopBarContainer,
	TopBarContent,
	ButtonContainer,
	CategoryContainer
} from "./top-bar.styles"

import { SideBar } from "../side-bar/side-bar.component"
import { MdArrowBackIosNew } from "react-icons/md";

import { BiSearch } from "react-icons/bi";


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
			case '/ootd/create':
				setTopName('OOTD 등록')
				break
			case '/advice/create':
				setTopName('훈수 등록')
				break
			case '/advice/ootdCommentCreate':
			setTopName('훈수 등록')
				break
			case '/advice':
			setTopName('훈수')
				break
			default:
				setTopName('Osiopso')
		}
		if (location.pathname.includes('ootd/detail')) {
			setTopName('OOTD 게시글')
		} else if (location.pathname.includes('profile')) {
			setTopName('Profile')
		}
}, [location ])

	return (
		<Fragment>
		{
				topName ==='Osiopso' || topName==='훈수'?
		<TopBarContainer page={'two'}>
			<div>
			</div>
			<TopBarContent>
				{ topName }
						</TopBarContent>
						<CategoryContainer >
						<BiSearch/>	
						</CategoryContainer>
		</TopBarContainer>
					: topName === 'Profile'
				?				<TopBarContainer>
									<ButtonContainer onClick={() =>{
										navigate(-1)
									}}>
								<MdArrowBackIosNew color='white' />
									</ButtonContainer>	

									<TopBarContent>
										{ topName }
									</TopBarContent>
									<CategoryContainer >
												<SideBar/>
									</CategoryContainer>
								</TopBarContainer>
						:	<TopBarContainer>
									<ButtonContainer onClick={() =>{
										navigate(-1)
									}}>
										<MdArrowBackIosNew color='white' />
									</ButtonContainer>	

									<TopBarContent>
										{ topName }
									</TopBarContent>
									<div></div>
								</TopBarContainer>
					
	
	}</Fragment>
	)
}

export default TopBar
