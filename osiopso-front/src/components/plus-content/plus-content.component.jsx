import { useNavigate } from "react-router-dom"

import {
	PlusModalContainer,
	PlusContent,
	PlusLogoContainer
} from "./plus-content.styles"

import { ReactComponent as Hand } from '../../assets/hand.svg'
import { ReactComponent as OOTD } from '../../assets/ootd.svg'
import { ReactComponent as Clothes } from '../../assets/clothes.svg'

const PlusModal = ({ closeModal }) => {
	const navigate = useNavigate()
	const onNavigateHandler1 = () => {
		navigate(
			'mypage/add-clothes'
		)
		closeModal()
	}
	const onNavigateHandler2 = () => {
		navigate(
			'advice/create'
		)
		closeModal()
	}
	const onNavigateHandler3 = ()=> {
		navigate(
			'ootd/create'
		)
		closeModal()
	}

	return (
		<PlusModalContainer>
			{/* <button onClick={closeModal}>닫기</button> */}
			<PlusContent onClick={onNavigateHandler1}>
				<PlusLogoContainer>
					<Clothes/>
				</PlusLogoContainer>
				<span>
					옷 등록
				</span>
			</PlusContent>
			
			<PlusContent  onClick={onNavigateHandler3}>
				<PlusLogoContainer>
					<OOTD/>
				</PlusLogoContainer>
				<span>
					OOTD 등록
				</span>
			</PlusContent>

			<PlusContent onClick={onNavigateHandler2}>
				<PlusLogoContainer>
					<Hand/>
				</PlusLogoContainer>
				<span>
					훈수 등록
				</span>
			</PlusContent>
		</PlusModalContainer>
	)
}

export default PlusModal