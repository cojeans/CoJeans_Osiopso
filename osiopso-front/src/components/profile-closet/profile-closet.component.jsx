import Closet from "../closet/closet.component"

import { useState, useCallback } from "react"
import { useNavigate } from 'react-router-dom'

import ClosetCreateModal from "../closet-create-modal/closet-create-modal.component"
import {
	ClosetBodyContainer,
	LogoContainer2,
	PlusCloset
} from "./profile-closet.styles"
import { ClosetItem } from "../closet/closet.styles"


export function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
		document.body.style.overflow = 'hidden';
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
  }, []);

  return { lockScroll, openScroll };
}

const initialList = [
	{
		closetName: '봄',
		url:
			['https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg',
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3F0T-vHn_FrpqKg6DH2Hst2cMN0ptOBMYYcI988bJ0CdwwVzbNbSRFH5ERWevleor69M&usqp=CAU',
				'https://image.msscdn.net/images/goods_img/20210202/1773705/1773705_1_500.jpg',
				'https://m.snipershop.co.kr/web/product/tiny/202111/55bb8ef3031d3e502c576af1d19c1d09.jpg',
			],
		
		count: 1,
	},
	{
		closetName: '여름',
		url: ['https://static.discovery-expedition.com/images/goods/ec/X22FDXHD17024BGL/thnail/C760DBC2144C4F99A0FA7476C4B07851.png/dims/resize/828x1104','','',''],
		count: 5
	},
	{
		closetName: '가을',
		url: ['https://m.ilsanghabo.com/web/upload/NNEditor/20200206/9c4ecbc1d0514f4c6ce4b1052480b5ba.jpg','https://m.snipershop.co.kr/web/product/tiny/202111/55bb8ef3031d3e502c576af1d19c1d09.jpg','https://m.snipershop.co.kr/web/product/tiny/202111/55bb8ef3031d3e502c576af1d19c1d09.jpg',''],
		count: 192
	},
	{
		closetName: '겨울',
		url: ['https://m.snipershop.co.kr/web/product/tiny/202111/55bb8ef3031d3e502c576af1d19c1d09.jpg','https://m.snipershop.co.kr/web/product/tiny/202111/55bb8ef3031d3e502c576af1d19c1d09.jpg','https://m.snipershop.co.kr/web/product/tiny/202111/55bb8ef3031d3e502c576af1d19c1d09.jpg',''],
		count: 19
	},
]

const ProfileCloset = () => {
	const [closetList, setClosetList] = useState(initialList)
	const [modalOpen, setModalOpen] = useState(false);
	const { lockScroll, openScroll } = useBodyScrollLock();

	const showModal = () => {
		window.scrollTo(0, 0);
		setModalOpen(true);
		lockScroll();

	};
	// const navigate = useNavigate()

	// const goToCheckoutHandler = () => {
	// 	navigate('closet-create')
  // }
	
	return (
		<ClosetBodyContainer>
			<ClosetItem onClick={showModal}>
				<LogoContainer2>
					<PlusCloset/>
				</LogoContainer2>
				<p> 옷장 만들기 </p>
			</ClosetItem>
			{
				closetList.map((closet, idx) => {
					return <Closet closet={ closet } key={idx} />
				})
			}
			{
				modalOpen && <ClosetCreateModal setModalOpen={setModalOpen} openScroll={ openScroll} />
			}

		</ClosetBodyContainer>
	)
}

export default ProfileCloset