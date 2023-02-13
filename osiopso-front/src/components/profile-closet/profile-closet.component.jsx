import axios from 'axios'

import Closet from "../closet/closet.component"

import { useState, useCallback, useEffect } from "react"
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/user.selector';
import { selectCloset } from '../../store/closet/closet.selector';

import ClosetCreateModal from "../closet-create-modal/closet-create-modal.component"
import {
	ClosetBodyContainer,
	LogoContainer2,
	PlusCloset
} from "./profile-closet.styles"
import { ClosetItem } from "../closet/closet.styles"
import { selectClothes } from '../../store/clothes/clothes.selector';


export function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
		document.body.style.overflow = 'hidden';
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
  }, []);

  return { lockScroll, openScroll };
}


const ProfileCloset = () => {
	const Token = useSelector(selectUser)
	const [closetList, setClosetList] = useState([])
	const check = useSelector(selectClothes)
	const getClosetList = () => {
		console.log('옷장리스트가져오기')
		axios({
					method: "post",
					url: `${process.env.REACT_APP_AXIOS_URL}closet/mylist`,
					headers: {
					Authorization: `Bearer ${Token.token}`,
					},
				})
					.then((res) => {
						setClosetList(res.data.reverse())
				})
				.catch((err) => {
					console.log(err);
				});
	}

	
	console.log(closetList)

	const [modalOpen, setModalOpen] = useState(false);
	const { lockScroll, openScroll } = useBodyScrollLock();

	const showModal = () => {
		window.scrollTo(0, 0);
		setModalOpen(true);
		lockScroll();
	};

	useEffect(() => {
		getClosetList()
	},[])

	
	return (
		<ClosetBodyContainer>
			<ClosetItem page={ 'profile'} onClick={showModal}>
				<LogoContainer2>
					<PlusCloset/>
				</LogoContainer2>
				<p> 옷장 만들기</p>
			</ClosetItem>
			{
				closetList.map((closet, idx) => {
					return <Closet closet={ closet } key={idx} />
				})
			}
			{
				modalOpen
				&&
				<ClosetCreateModal
					setModalOpen={setModalOpen}
					openScroll={openScroll}
					getClosetList={getClosetList}
				/>
			}

		</ClosetBodyContainer>
	)
}

export default ProfileCloset