import { useNavigate } from "react-router-dom"

import {
	PlusModalContainer,
	PlusContent,
	PlusLogoContainer,
	MagicLogoContainer
} from "./plus-content.styles"


import { GiLargeDress } from "react-icons/gi";
import { FaMagic } from "react-icons/fa";
import { MdCheckroom } from "react-icons/md";

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
					<MdCheckroom color="#7272ba "/>
				</PlusLogoContainer>
				<span>
					옷 등록
				</span>
			</PlusContent>
			
			<PlusContent  onClick={onNavigateHandler3}>
				<PlusLogoContainer>
					<GiLargeDress color="#7272ba "/>
				</PlusLogoContainer>
				<span>
					OOTD 등록
				</span>
			</PlusContent>

			<PlusContent onClick={onNavigateHandler2}>
				<MagicLogoContainer>
					<FaMagic color="#7272ba" />
				</MagicLogoContainer>
				<span>
					Advice 요청
				</span>
			</PlusContent>
		</PlusModalContainer>
	)
}

export default PlusModal