import { useNavigate } from "react-router-dom"

import {
	PlusModalContainer,
	PlusContent,
	PlusLogoContainer
} from "./plus-content.styles"

import { ReactComponent as Clothes } from '../../assets/clothes.svg'

import { GiLargeDress } from "react-icons/gi";
import { IoHandRightOutline } from "react-icons/io5";


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
					<GiLargeDress color="#BCF0E0 "/>
				</PlusLogoContainer>
				<span>
					OOTD 등록
				</span>
			</PlusContent>

			<PlusContent onClick={onNavigateHandler2}>
				<PlusLogoContainer>
					<IoHandRightOutline/>
				</PlusLogoContainer>
				<span>
					Advice 요청
				</span>
			</PlusContent>
		</PlusModalContainer>
	)
}

export default PlusModal