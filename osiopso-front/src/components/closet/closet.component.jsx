import ClosetPreview from "../closet-preview/closet-preview.component"

import { useNavigate } from 'react-router-dom'

import {
	ClosetItem,
	ItemContainer,
	ItemInfo
} from "./closet.styles"


const Closet = ({ closet }) => {
	const { name } = closet
	const navigate = useNavigate()
	
	const onNavigateHandler = () => navigate(
		'closet/' + name, {
			state: {
		closet:closet
	}})
 	
	return (
		<ItemContainer onClick={onNavigateHandler}>
			<ClosetItem>
				{/* <ClosetPreview closetPev={ url } /> */}
			</ClosetItem>
			<ItemInfo>
				<p>
					{ name }<br/>
					{/* <span>{count}</span> */}
				</p>
			</ItemInfo>
		</ItemContainer>
	)
}

export default Closet