import styled from 'styled-components'

 

export const AddClothesTopContainer = styled.div`
	display: grid;
	grid-template-columns:1fr 1fr;
	justify-items: center;
	width:80%;
	margin:auto;
	padding: 15px 0;
`


export const LogoContainer3 = styled.div`
  width: 40px;
	height: 40px;
	display:flex;
	flex-direction:column;
	text-align:center;
	text-decoration:none;
	svg{
		height:100%;
	}
`


export const LogoButtonBox = styled.div`
	display:flex;
	flex-direction:column;
	align-items: center;
	span{
		font-size:13px;
	}
	cursor:pointer;
`