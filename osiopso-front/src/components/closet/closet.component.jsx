import ClosetPreview from "../closet-preview/closet-preview.component"

import { useNavigate } from 'react-router-dom'

import {
	ClosetItem,
	ItemContainer,
	ItemInfo
} from "./closet.styles"


const Closet = ({ closet }) => {
	const { closetName, url, count } = closet
	const navigate = useNavigate()
	
	const onNavigateHandler = () => navigate(
		'closet/' + closetName, {
			state: {
		closet:closet
	}})
 	
	return (
		<ItemContainer onClick={onNavigateHandler}>
			<ClosetItem>
				<ClosetPreview closetPev={ url } />
			</ClosetItem>
			<ItemInfo>
				<p>
					{ closetName }<br/>
					<span>{count}</span>
				</p>
			</ItemInfo>
		</ItemContainer>
	)
}

export default Closet