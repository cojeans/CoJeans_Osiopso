import styled from 'styled-components'

export const TopBarContainer = styled.div`
	height: 60px;
  width: 100%;
	max-width:450px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
	  justify-content: center;
	background-color: white;
	margin:auto;
`

export const ButtonContainer = styled.div`
	height: 100%;
  width: 50%;
	display:flex;
	align-items:center;
	justify-content:center;
	text-decoration:none;
		svg{
		width:45px;
		height:100%;
	}
`

export const TopBarContent = styled.div`
	font-size:25px;
	width:100%;
	height: 100%;
	display:flex;
	text-decoration:none;
	align-items:center;
	justify-content:center
`