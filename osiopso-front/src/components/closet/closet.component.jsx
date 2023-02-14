import ClosetPreview from "../closet-preview/closet-preview.component"

import { useNavigate } from 'react-router-dom'

import {
	ClosetItem,
	ItemContainer,
	ItemInfo
} from "./closet.styles"

import { FaLock } from "react-icons/fa";

const Closet = ({ closet }) => {
	const { name, count, thumbnails, isSelected } = closet
	const navigate = useNavigate()
	
	const onNavigateHandler = () => navigate(
		'closet/' + name, {
			state: {
		closet:closet
	}})

	console.log('preview', thumbnails)
	return (
		<ItemContainer onClick={onNavigateHandler}>
			<ClosetItem page={ 'profile'}>
				<ClosetPreview thumbnails={ thumbnails } />
			</ClosetItem>
			<ItemInfo>
				<p>
					{ name }<br/>
					<span>{count}</span>
				</p>
				{!isSelected && <FaLock />}
			</ItemInfo>
		</ItemContainer>
	)
}

export default Closet