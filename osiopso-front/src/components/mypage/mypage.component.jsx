import { Fragment } from "react"
import { useState } from "react"

import Profile from "../../components/profile/profile.component"
import ProfileBody from "../../components/profile-body/profile-body.component"
import Modal from "../../components/modal/modal.component"
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"

const MypageBody = ({ id }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const { lockScroll, openScroll } = useBodyScrollLock()

	const showModal = () => {

			window.scrollTo(0, 0);
			setModalOpen(true);
				lockScroll();
	};

	return (
		<Fragment>
			<Profile id={ id } showModal={showModal}/>
			<ProfileBody id={ id }/>
			{
				// page == 1 일 때 네비게이션 모달
				modalOpen && <Modal setModalOpen={setModalOpen} openScroll={openScroll} page={ 5 } />
			}
		</Fragment>
	)
}

export default MypageBody