import Closet from "../closet/closet.component"

import { Fragment, useState } from "react"


import {
	ClosetBodyContainer,
	LogoContainer2,
	PlusCloset
} from "./profile-closet.styles"
import { ClosetItem } from "../closet/closet.styles"

const initialList = [
	{
		name: '봄',
		url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hellodd.com%2Fnews%2FarticleView.html%3Fidxno%3D69577&psig=AOvVaw1bInR3VtiEDozUdeuiHIRN&ust=1675153282424000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNik7rTu7vwCFQAAAAAdAAAAABAJ',
		count: 1,
	},
	{
		name: '여름',
		url: '',
		count: 5
	},
	{
		name: '가을',
		url: '',
		count: 192
	},
	{
		name: '겨울',
		url: '',
		count: 19
	},
]

const ProfileCloset = () => {
	const [closetList, setClosetList ] = useState(initialList)
	
	return (
		<ClosetBodyContainer>
			<ClosetItem>
				<LogoContainer2>
					<PlusCloset/>
				</LogoContainer2>
				<p> 옷장 추가 </p>
			</ClosetItem>
			{
				closetList.map((closet) => {
					return <Closet closet={ closet } />
				})
			}
		</ClosetBodyContainer>
	)
}

export default ProfileCloset