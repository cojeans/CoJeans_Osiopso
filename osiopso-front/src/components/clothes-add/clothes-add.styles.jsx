import styled from 'styled-components'

 

export const AddClothesTopContainer = styled.div`
	display: grid;
	grid-template-columns:1fr 1fr;
	justify-items: center;
`


export const PictureImg = styled.img.attrs({
  src: `https://pixlr.com/images/index/remove-bg.webp`,
})`
	width:300px;
	height:300px;
	margin:auto;
`;