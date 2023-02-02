import styled from 'styled-components'

export const TopBarContainer = styled.div`
	height: 60px;
  width: 100%;
	max-width:430px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
	  justify-content: center;
	background-color: #F0E6EE;
	margin:auto;
	position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

export const ButtonContainer = styled.div`
	height: 100%;
  width: 50%;
	display:flex;
	align-items:center;
	justify-content:center;
	text-decoration:none;
		svg{
		width:30px;
		height:80%;
	}
	cursor:pointer;
`

export const TopBarContent = styled.div`
	font-size:20px;
	width:100%;
	height: 100%;
	display:flex;
	text-decoration:none;
	align-items:center;
	justify-content:center
`
export const CategoryContainer = styled.div`
	height: 100%;
	margin-left:auto;
  width: 50%;
	display:flex;
	align-items:center;
	justify-content:center;
	text-decoration:none;
		svg{
		width:30px;
		height:80%;
	}
	cursor:pointer;
	
`
