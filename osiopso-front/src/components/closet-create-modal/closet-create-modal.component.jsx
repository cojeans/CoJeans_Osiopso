import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import {
// 	createClosetAxios,
// 	postClothesAxios
// } from '../../utils/axios.utils';

import { createCloset } from '../../store/closet/closet.reducer';
import { selectCloset } from '../../store/closet/closet.selector';

import Button from '../button/button.component';
// import ToggleButton from '../toggle/toggle.component';
import ToggleButton2 from '../toggle/toggle2.component';

import {
	ModaContainer,
	ModalBody,
	CreateClosetTitle,
	ClosetInput,
	ClosetContent,
	ButtonContainer,
	ToggleContainer
} from "./closet-create-modal.styles";


const defaultClosetFields = {
	closetName: '',
}


const ClosetCreateModal = ({ setModalOpen, openScroll }) => {
	const [closetField, setClosetField] = useState(defaultClosetFields)
	const { closetName } = closetField

	const closetData  = useSelector(selectCloset)

	const dispatch = useDispatch()

	 // 모달 끄기 
	const closeModal = () => {
		setModalOpen(false);
		openScroll()
	};
	const modalRef = useRef(null);

	useEffect(() => {
		// 이벤트 핸들러 함수
		const handler = (event) => {
				// mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
				if (modalRef.current && !modalRef.current.contains(event.target)) {
					setModalOpen(false);
					openScroll()
				}
		};
		
		// 이벤트 핸들러 등록
		document.addEventListener('mousedown', handler);
		// document.addEventListener('touchstart', handler); // 모바일 대응
		
		return () => {
				// 이벤트 핸들러 해제
				document.removeEventListener('mousedown', handler);
				// document.removeEventListener('touchstart', handler); // 모바일 대응
		};
	});
	
	const handleChange = (event) => {
		const { name, value } = event.target
		setClosetField({ ...closetField, [name]: value })
	}


	const handleSubmit = async () => {
		console.log('저장?')
		console.log(closetField)
		const payload = { ...closetData.closet }
		payload.name = closetName
		console.log(payload)

		dispatch(createCloset(payload))

	}
	
    return (
			<ModaContainer>
				<ModalBody ref={modalRef}>
					<ButtonContainer>
						<button onClick={closeModal}>
								X
						</button>
					</ButtonContainer>
					<ClosetContent>
						<CreateClosetTitle>옷장 만들기</CreateClosetTitle>
						<p>옷장 이름</p>
						<ClosetInput
							type="text"
							autoFocus
							maxLength={25}
							name='closetName'
							value={closetName}
							onChange={handleChange}
						/>
						<ToggleContainer>
							<p>공개 설정</p>
							<ToggleButton2
							/>
						</ToggleContainer>
					</ClosetContent>
						<Button onClick={handleSubmit}>저장</Button>
				</ModalBody>
			</ModaContainer>
    );
}

export default ClosetCreateModal

