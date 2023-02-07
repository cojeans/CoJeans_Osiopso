import { useEffect, useRef } from 'react';

import { ModalPage } from "./modal.styles"

import PlusModal from '../plus-content/plus-content.component';
import CategoryModal from '../category-modal/category-modal.component';

const Modal = ({ setModalOpen, openScroll, page, ootdFormData, setOotdFormData }) => {
	 console.log(page)
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
		<ModalPage page={ page }>
			<div ref={modalRef}>
				{
					page === 'plus'
						? <PlusModal closeModal={closeModal} />
						: <CategoryModal closeModal={closeModal} ootdFormData={ootdFormData} setOotdFormData={ setOotdFormData } />
				}
				
			</div>

		</ModalPage>
	)
}

export default Modal