import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import {
	ClothesContainer,
	ClothesItemContainer,
	ClosetDetailPage
} from './closet-detail.styles';
import { useEffect, useState } from 'react';

const ClosetDetail = () => {
	const location = useLocation();
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

	useEffect(() => {
		getClothes()
	},[])

	return (
		<ClosetDetailPage>
			<h3>{ name } 옷장</h3>
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