import { useEffect, useRef, useState } from 'react';

import Button from '../button/button.component';

import {
	ModaContainer,
	ModalBody,
	CreateClosetTitle,
	ClosetInput,
	ClosetContent,
	ButtonContainer
} from "./closet-create-modal.styles";





const ClosetCreateModal = ({ setModalOpen, openScroll }) => {
	
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
							maxLength={ 25 }
						/>
						<p>공개 설정</p>

					</ClosetContent>
						<Button>저장</Button>
				</ModalBody>
			</ModaContainer>
    );
}

export default ClosetCreateModal