import axios from 'axios'

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	createCloset,
	resetCloset,
} from '../../store/closet/closet.reducer';
import { selectCloset } from '../../store/closet/closet.selector';
import { selectUser } from '../../store/user/user.selector';

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

import Swal from "sweetalert2";


const defaultClosetFields = {
	closetName: '',
}


const ClosetCreateModal = ({ setModalOpen, openScroll, setClosetList }) => {
	const [closetField, setClosetField] = useState(defaultClosetFields)
	const { closetName } = closetField

	const Token = useSelector(selectUser)
	const closetData  = useSelector(selectCloset)
	const dispatch = useDispatch()

	 // 모달 끄기 
	const closeModal = () => {
		setModalOpen(false);
		openScroll()
	
	};
	const modalRef = useRef(null); 
	
	const AlertHandler = (closetName) => {
		
	Swal.fire({
		confirmButtonColor: "black", 
		html: `
		${closetName} 옷장이 생성되었습니다.
		`,
			width: '300px',
		showCancelButton: false,
		confirmButtonText: "확인",
	}).then(()=>{
					axios({
					method: "post",
					url: `${process.env.REACT_APP_AXIOS_URL}closet/mylist`,
					headers: {
					Authorization: `Bearer ${Token.token}`,
					},
				})
					.then((res) => {
						setClosetList(res.data.reverse())
				})
				.catch((err) => {
					console.log(err);
				});
		
	})

}

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


	const handleSubmit = () => {
		console.log('저장?')
		console.log(closetField)
		const payload = { ...closetData.closet }
		console.log('this', closetData)
		payload.name = closetName
		console.log(payload)

		dispatch(createCloset(payload))

		console.log(Token)

		axios({
			method: "post",
			url: `${process.env.REACT_APP_AXIOS_URL}closet`,
			data: {
				name: payload.name,
				isSelected:payload.isSelected,
			},
			headers: {
     	 Authorization: `Bearer ${Token.token}`,
			}
		})
		 .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });


		AlertHandler(closetName) // alert창 띄우기
		dispatch(resetCloset()) // redux 옷장 정보 초기화
		

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
							maxLength={10}
							name='closetName'
							value={closetName}
							onChange={handleChange}
							placeholder='ex 봄 옷장'
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

