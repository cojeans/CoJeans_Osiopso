import styled from "styled-components";

export const ClothesContainer = styled.div`
	display:grid;
	grid-template-columns:1fr 1fr 1fr;
	width:90%;
	margin:auto;
`

export const ClothesItemContainer = styled.div`
	display:flex;
	flex-direction:column;
	align-items: center;
	justify-content: center;
	height:130px;
	box-shadow: 
		1px 0 0 0 #D3D3D3, 
		0 1px 0 0 #D3D3D3, 
		1px 1px 0 0 #D3D3D3,   /* Just to fix the corner */
		1px 0 0 0 #D3D3D3 inset, 
		0 1px 0 0 #D3D3D3 inset;
	img{
		width:90%;
		height:100px;
	}
`