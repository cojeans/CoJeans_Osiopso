import axios from 'axios'

import Closet from "../closet/closet.component"

import { useState, useCallback, useEffect } from "react"
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/user.selector';
// import { selectCloset } from '../../store/closet/closet.selector';

import ClosetCreateModal from "../closet-create-modal/closet-create-modal.component"
import {
	ClosetBodyContainer,
	LogoContainer2,
	PlusCloset
} from "./profile-closet.styles"
import { ClosetItem } from "../closet/closet.styles"
// import { selectClothes } from '../../store/clothes/clothes.selector';


export function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
		document.body.style.overflow = 'hidden';
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
  }, []);

  return { lockScroll, openScroll };
}


const ProfileCloset = ({ id }) => {
	const Token = useSelector(selectUser)
	const [closetList, setClosetList] = useState([])
	const getClosetList = (urlString) => {
		console.log('옷장리스트가져오기')
		axios({
					method: "post",
					url: urlString,
					headers: {
					Authorization: `Bearer ${Token.token}`,
					},
				})
			.then((res) => {
				console.log(res.data)
				const result = res.data.reverse()
				if (id > 0) {
					const newClosetList = result.filter((res) => {
						if (res.isSelected === true) {
								return res
							}
					})
						setClosetList(newClosetList)

				} else {
					
					setClosetList(res.data.reverse())
					}
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
		if (id > 0) {
		getClosetList( `${process.env.REACT_APP_AXIOS_URL}closet/list?userId=${id}`)

		} else {
			getClosetList( `${process.env.REACT_APP_AXIOS_URL}closet/mylist`)
		}
	},[])

	
	return (
		<ClosetBodyContainer>
			{
				! id>0 &&
				<ClosetItem page={ 'profile'} onClick={showModal}>
					<LogoContainer2>
						<PlusCloset/>
					</LogoContainer2>
					<p> 옷장 만들기</p>
				</ClosetItem>
			}
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
					setClosetList={ setClosetList }
				/>
			}

		</ClosetBodyContainer>
	)
}

export default ProfileCloset