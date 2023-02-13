import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import {
	ClothesContainer,
	ClothesItemContainer,
	ClosetDetailPage
} from './closet-detail.styles';
import { useEffect, useState } from 'react';
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

const ClosetDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { name, thumbnails, count, id, isSelected } = location.state.closet
	const Token = useSelector(selectUser)

	const [allClothes, setAllClothes] = useState([])
	
	const getClothes = () => {
		axios({
			method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}closet/${id}/all`,
        data: [],
        headers: {
          Authorization: `Bearer ${Token.token}`,
              },
		}).then((res) => {
			console.log(res.data)
			setAllClothes(res.data)
		}).catch((err) => {
			console.log(err)
		})
	}

	const deleteCloset = () => {
		axios({
			method: 'delete',
			url: `${process.env.REACT_APP_AXIOS_URL}closet/${id}`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
						},
		}).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})

		Swal.fire({
		icon: 'success',
		confirmButtonColor: "#DD6B55", 
		html: `
		옷장이 삭제되었습니다.
		`,
		showCancelButton: false,
		confirmButtonText: "확인",
		width: '300px'

	})
		navigate('/profile')
	}

	useEffect(() => {
		getClothes()
	},[])

	return (
		<ClosetDetailPage>
			<h3>{name} 옷장</h3>
			<BiTrash onClick={deleteCloset}/>
			{
				count === 0 
					?
					<p>옷장에 옷을 추가해 주세요.</p>
					:
					<ClothesContainer>	
						{
							allClothes.map((el, idx)=>{
								return <ClothesItemContainer key={idx}><img src={el.imageUrl}/></ClothesItemContainer>
							})
						}
					</ClothesContainer>
			}
		</ClosetDetailPage>
	)
}

export default ClosetDetail