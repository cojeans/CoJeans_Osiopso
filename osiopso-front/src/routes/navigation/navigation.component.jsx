import { Outlet } from "react-router-dom"
// import { Link } from 'react-router-dom'
import { useState } from "react"

import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"

import {
	NavigationContainer,
	LogoContainer,
	BodyContainer,
	Container,
	PlusContainer
} from "./navigation.styles"

import TopBar from "../../components/top-bar/top-bar.component"
import Modal from "../../components/modal/modal.component"

import { ReactComponent as HomeLogo } from '../../assets/home.svg'
import { ReactComponent as Hand } from '../../assets/hand.svg'
import { ReactComponent as OOTD } from '../../assets/ootd.svg'
import { ReactComponent as Plus } from '../../assets/plusNav.svg'
import { ReactComponent as User } from '../../assets/user.svg'

const Navigation = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const { lockScroll, openScroll } = useBodyScrollLock()

	const showModal = () => {
	window.scrollTo(0, 0);
	setModalOpen(true);
	lockScroll();
	};

	return (
		<Container>
			<TopBar />
			<BodyContainer>
				<Outlet />
			</BodyContainer>
			<NavigationContainer>
				<LogoContainer to='/'>
					<HomeLogo />
					<span>홈</span>
				</LogoContainer>
				<LogoContainer to='/advice'>
					<Hand />
					<span>훈수</span>
				</LogoContainer>
				<PlusContainer
					// to='mypage/add-clothes'
					onClick={showModal}
				>
					<Plus />
				</PlusContainer>
				<LogoContainer to='/ootd'>
					<OOTD />
					<span>OOTD</span>
				</LogoContainer>
				<LogoContainer to='/mypage'>
					<User />
					<span>프로필</span>
				</LogoContainer>
				{/* <Link to='/login'>Login</Link> 
				<Link to='/join'>Join</Link>
				<Link to='/mypage'>My page</Link> */}
			</NavigationContainer>
			{
				modalOpen && <Modal setModalOpen={setModalOpen} openScroll={ openScroll} />
			}
		</Container>
	)
}

export default Navigation

