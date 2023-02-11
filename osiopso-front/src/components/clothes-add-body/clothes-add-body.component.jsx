
import ClothesAddPicture from "../clothes-add-picture/clothes-add-picture.component"
import ClothesAddShop from "../clothes-add-shop/clothes-add-shop.component"

import { ClothesAddBodyContainer } from "./clothes-add-body.styles"

const ClothesAddBody = ({page}) => {
	return (
		<ClothesAddBodyContainer>
			{ page ==='album'
				? <ClothesAddPicture />
			 	: <ClothesAddShop/>
			}
		</ClothesAddBodyContainer>
	)
}

export default ClothesAddBody