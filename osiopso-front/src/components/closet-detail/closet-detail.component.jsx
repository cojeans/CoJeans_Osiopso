import { useLocation } from 'react-router-dom';

import {
	ClothesContainer,
	ClothesItemContainer
} from './closet-detail.styles';

const ClosetDetail = () => {
	const location = useLocation();
	const { closetName, url, count } = location.state.closet

	return (
		<div>
			<ClothesContainer>	
				{
					url.map((el, idx)=>{
						return <ClothesItemContainer key={idx}><img src={el}/></ClothesItemContainer>
					})
				}
			</ClothesContainer>
		</div>
	)
}

export default ClosetDetail