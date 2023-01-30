import ClosetPreview from "../closet-preview/closet-preview.component"

import {
	ClosetItem,
	ItemContainer,
	ItemInfo
} from "./closet.styles"


const Closet = ({ closet }) => {
	return (
		<ItemContainer>
			<ClosetItem>
				<ClosetPreview />
			</ClosetItem>
			<ItemInfo>
				<p>
					{ closet.name }<br/>
					<span>{closet.count}</span>
				</p>
			</ItemInfo>
		</ItemContainer>
	)
}

export default Closet