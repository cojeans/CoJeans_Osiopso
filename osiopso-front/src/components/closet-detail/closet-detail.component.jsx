import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import {
	ClothesContainer,
	ClothesItemContainer,
	ClosetDetailPage
} from './closet-detail.styles';
import { useEffect } from 'react';

const ClosetDetail = () => {
	const location = useLocation();
	const { name, thumbnails, count, id, isSelected } = location.state.closet
	const Token = useSelector(selectUser)
	const getClothes = () => {
		axios({
			method: "post",
        url: `http://localhost:8080/api/closet/${id}/1`,
        data: {
					"id": id,
					"keyword": null,
					"type": null
        },
        headers: {
          Authorization: `Bearer ${Token.token}`,
              },
		}).then((res) => {
			console.log(res)
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
							thumbnails.map((el, idx)=>{
								return <ClothesItemContainer key={idx}><img src={el}/></ClothesItemContainer>
							})
						}
					</ClothesContainer>
			}
		</ClosetDetailPage>
	)
}

export default ClosetDetail