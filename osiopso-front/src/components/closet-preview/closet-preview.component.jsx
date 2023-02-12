import { Fragment, useState } from "react"

import {
	PrevBox,
	PrevContainer,
	ImgPrevBox
} from "./closet-preview.styles"

const ClosetPreview = ({ thumbnails }) => {
	let tmpArray = [...thumbnails]
	if (thumbnails.length < 4) {
		for (let i = 0; i < 4 - thumbnails.length; i++) {
			tmpArray = [...tmpArray, i]
		}
	}
	return (
		<PrevContainer>
			{
				tmpArray.map((prev, i) => {
					if (prev < 10) {
						return <PrevBox key={ i }><div></div></PrevBox>
					} else {
					return (<PrevBox PrevBox key={i} >
						<ImgPrevBox>
							<img src={prev} alt="" />
						</ImgPrevBox>
					</PrevBox>)}
				})
				}
		</PrevContainer>
	)
}

export default ClosetPreview