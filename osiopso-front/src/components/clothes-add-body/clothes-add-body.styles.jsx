import styled from "styled-components";

export const ClothesAddBodyContainer = styled.div`
	display:flex;
	flex-direction:column;
	align-items: center;
`

export const PictureImg = styled.img.attrs({
  src: `https://pixlr.com/images/index/remove-bg.webp`,
})`
	width:250px;
	height:250px;
	margin:auto;
`;