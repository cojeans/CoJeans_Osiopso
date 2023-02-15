import { useEffect, useRef } from 'react';

import { ModalPage } from "./modal.styles"
import { useSelector, useDispatch } from "react-redux"

import PlusModal from '../plus-content/plus-content.component';
import OotdModal from '../ootd-modal/ootd-modal.component';
import AdviceModal from '../advice-modal/advice-modal.component';
import ClothesTagModal from '../clothes-tag-modal/clothes-tag-modal.component';
import {
	selectClothes,
	selectTag,
  } from "../../store/clothes/clothes.selector";
const Modal = ({ setModalOpen, openScroll, page, autoCategory, autoColor }) => {
	const saveTag = useSelector(selectTag)
 
	console.log(page)
	// 모달 끄기
	const closeModal = () => {
		setModalOpen(false);
		openScroll()
	};
	const modalRef = useRef(null);
	// const authCategory1 = autoCategory
	// const autoColor1 = autoColor
	// console.log('result', authCategory1, autoColor1)
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
				{(page === 1) && (<PlusModal closeModal={closeModal} />)}
				{(page === 2) && (<OotdModal closeModal={closeModal} />)}
				{(page === 3) && (<AdviceModal closeModal={closeModal} />)}
				{(page === 4) && (<ClothesTagModal closeModal={closeModal} />)}
				{/* {
					page
						? <PlusModal closeModal={closeModal} />
						: <CategoryModal closeModal={closeModal}/>
				} */}
				
			</div>

		</ModalPage>
	)
}

export default Modal