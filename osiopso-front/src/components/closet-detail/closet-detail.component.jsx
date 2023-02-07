import { useLocation } from 'react-router-dom';

import {
	ClothesContainer,
	ClothesItemContainer,
	ClosetDetailPage
} from './closet-detail.styles';

const ClosetDetail = () => {
	const location = useLocation();
	const { name, thumbnails, count, id, isSelected } = location.state.closet

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