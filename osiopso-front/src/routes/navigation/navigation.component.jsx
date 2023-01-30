import { Fragment } from "react"
import { Outlet } from "react-router-dom"
// import { Link } from 'react-router-dom'

import {
	NavigationContainer,
	LogoContainer,
	BodyContainer
} from "./navigation.styles"

import TopBar from "../../components/top-bar/top-bar.component"

import { ReactComponent as HomeLogo } from '../../assets/home.svg'
import { ReactComponent as Hand } from '../../assets/hand.svg'
import { ReactComponent as OOTD } from '../../assets/ootd.svg'
import { ReactComponent as Category } from '../../assets/category.svg'
import { ReactComponent as User } from '../../assets/user.svg'

const Navigation = () => {
	return (
		<Fragment>
			<TopBar />
			<BodyContainer>
				<Outlet />
			</BodyContainer>
			<NavigationContainer>
				<LogoContainer
					to='/'
				>
					<Category />
					<span>카테고리</span>
				</LogoContainer>
				<LogoContainer to='/join'>
					<Hand />
					<span>훈수</span>
				</LogoContainer>
				<LogoContainer to='/login'>
					<HomeLogo />
					<span>홈</span>
				</LogoContainer>
				<LogoContainer to='/mypage'>
					<OOTD />
					<span>OOTD</span>
				</LogoContainer>
				<LogoContainer to='/mypage'>
					<User />
					<span>마이페이지</span>
				</LogoContainer>
				{/* <Link to='/login'>Login</Link> 
				<Link to='/join'>Join</Link>
				<Link to='/mypage'>My page</Link> */}
			</NavigationContainer>
		</Fragment>
	)
}

export default Navigation

