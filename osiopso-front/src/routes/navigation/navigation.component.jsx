import { Outlet } from "react-router-dom"

import { useState } from "react"
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"
import { useLocation } from "react-router-dom"

import {
	NavigationContainer,
	LogoContainer,
	BodyContainer,
	Container,
	PlusContainer,
	HashLinkContainer
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
	 let location = useLocation();


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
				<HashLinkContainer
					smooth
					to="/#top"
					className={`${location.pathname}${location.hash}` === '/#top' ? "active" : ""}
				>	
					<TfiHome />
					<span>홈</span>
				</HashLinkContainer>	
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
				<HashLinkContainer
					smooth
					to="/#OOTD"
				 className={`${location.pathname}${location.hash}` === '/#OOTD' ? "active" : ""}
				>
					<GiMirrorMirror />
					<span>OOTD</span>
				</HashLinkContainer>
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
				// page == 1 일 때 네비게이션 모달
				modalOpen && <Modal setModalOpen={setModalOpen} openScroll={openScroll} page={ 1 } />
			}
		</Container>
	)
}

export default Navigation

