import { Fragment, useState } from "react"

import {
	PrevBox,
	PrevContainer
} from "./closet-preview.styles"

const ClosetPreview = ({ closetPev }) => {
	return (
		<PrevContainer>
				{
					closetPev.map((prev, i) => {
						return <PrevBox key={i}>
						<img src={prev} onError={({ currentTarget }) => {
						currentTarget.onerror = null; 
						currentTarget.src="https://mblogthumb-phinf.pstatic.net/20161008_248/sasa9508_1475929220263OMzsO_JPEG/2.jpg?type=w2";
						}}/></PrevBox>
					})
				}
		</PrevContainer>
	)
}

export default ClosetPreview