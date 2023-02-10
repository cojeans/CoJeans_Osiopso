import { Fragment, useState } from "react"

import {
	PrevBox,
	PrevContainer
} from "./closet-preview.styles"

const ClosetPreview = ({ thumbnails }) => {
	let tmpArray = [...thumbnails]
	if (thumbnails.length < 4) {
		for (let i = 0; i < 4 - thumbnails.length; i++) {
			tmpArray = [...tmpArray, i]
		}
	}
	console.log(tmpArray)
	return (
		<PrevContainer>
				{
					tmpArray.map((prev, i) => {
						return <PrevBox key={i}>
							<div>
							</div>
						</PrevBox>
					})
				}
		</PrevContainer>
	)
}

export default ClosetPreview