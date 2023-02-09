import { Outlet } from "react-router-dom"
// import { Link } from 'react-router-dom'
import { HashLink, NavHashLink  } from 'react-router-hash-link';

import { useState } from "react"
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"

import {
	NavigationContainer,
	LogoContainer,
	BodyContainer,
	Container,
	PlusContainer,
	HashContainer
} from "./navigation.styles"

import TopBar from "../../components/top-bar/top-bar.component"
import Modal from "../../components/modal/modal.component"

import { GiMirrorMirror } from "react-icons/gi";
import { IoHandRightOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TfiHome } from "react-icons/tfi";

import { ReactComponent as Plus } from '../../assets/plusNav.svg'


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
				<HashLink className="hash" smooth to="/#top">	
					<TfiHome />
					<span>홈</span>
				</HashLink>	
				<LogoContainer to='/advice'>
					<IoHandRightOutline/>
					<span>훈수</span>
				</LogoContainer>
				<PlusContainer
					// to='mypage/add-clothes'
					onClick={showModal}
				>
					<Plus />
				</PlusContainer>
				{/* <LogoContainer to='/ootd'> */}
				<HashLink className="hash" smooth to="/#OOTD">
					<GiMirrorMirror />
					<span>OOTD</span>
				</HashLink>
				{/* </LogoContainer> */}
				<LogoContainer  to='/mypage'>
					<FaUserCircle />
					<span>프로필</span>
				</LogoContainer>
				{/* <Link to='/login'>Login</Link> 
				<Link to='/join'>Join</Link>
				<Link to='/mypage'>My page</Link> */}
			</NavigationContainer>
			{
				modalOpen && <Modal setModalOpen={setModalOpen} openScroll={openScroll} page={ true } />
			}
		</Container>
	)
}

export default Navigation

