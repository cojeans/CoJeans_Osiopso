import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { SideBar } from "../side-bar/side-bar.component"

import { Fragment } from "react"

import {
	TopBarContainer,
	TopBarContent,
	ButtonContainer,
	CategoryContainer
} from "./top-bar.styles"

import { MdArrowBackIosNew } from "react-icons/md";

import { BiSearch } from "react-icons/bi";


const TopBar = () => {
	const navigate = useNavigate();

	const [topName, setTopName] = useState('Osiopso')
	const location = useLocation()

	const searchHandler = () => {
		navigate('/search')
	}
	
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
				setTopName('Advice 요청')
				break
			case '/advice/ootdCommentCreate':
			setTopName('Advice 등록')
				break
			case '/advice':
			setTopName('Advice 요청')
				break
			default:
				setTopName('Osiopso')
		}
		if (location.pathname.includes('ootd/detail')) {
			setTopName('OOTD 게시글')
		} else if (location.pathname.includes('profile')) {
			setTopName('Profile')
		} else if (location.pathname.includes('advice/detail')) {
			setTopName('Advice 게시글')
		} else if (location.pathname.includes('commentlist')) {
			setTopName('Advice 목록')
		}else if (location.pathname.includes('camera')) {
			setTopName('옷 등록')
		}
		else if (location.pathname.includes('selectbox')) {
			setTopName('옷 등록')
		}
}, [location ])

	return (
		<Fragment>
		{
				topName ==='Osiopso' || topName==='Advice'?
		<TopBarContainer page={'two'}>
			<div>
			</div>
			<TopBarContent className={topName==='Osiopso'?'osiopso':''}>
				{ topName }
			</TopBarContent>
						<CategoryContainer >
						<BiSearch onClick={searchHandler}/>	
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
			}

		</Fragment>
	)
}

export default TopBar
