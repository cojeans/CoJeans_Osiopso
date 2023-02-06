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
	const onNavigateHandler = () => {
		navigate(
			'mypage/add-clothes'
		)
		closeModal()
	}

	return (
		<PlusModalContainer>
			{/* <button onClick={closeModal}>닫기</button> */}
			<PlusContent onClick={onNavigateHandler}>
				<PlusLogoContainer>
					<Clothes/>
				</PlusLogoContainer>
				<span>
					옷 등록
				</span>
			</PlusContent>
			
			<PlusContent>
				<PlusLogoContainer>
					<OOTD/>
				</PlusLogoContainer>
				<span>
					OOTD 등록
				</span>
			</PlusContent>

			<PlusContent>
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