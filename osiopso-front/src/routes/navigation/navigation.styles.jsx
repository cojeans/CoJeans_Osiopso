import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
	max-width:430px;
	height:100%;
	margin:auto;
	position:relative;

`

export const NavigationContainer = styled.div`
	height: 50px;
  width: 100%;
	max-width:430px;
  display: flex;
  justify-content: space-between;
	color: #e7e2ff;
	background-color: white;
	margin:auto;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
`

export const LogoContainer = styled(NavLink)`
  height: 100%;
  width: 25%;
	display:flex;
	flex-direction:column;
	text-align:center;
	text-decoration:none;
	border-radius:5px;

	
	svg{
		width:45%;
		height:45%;
		margin:auto;
	}
	span{
		font-size:0.7em;
		// font-weight:bold;
		color:black;
	}

	svg{
		stroke:black;
		fill:black;
	}
	path{
		stroke:black;
		
	}
	
  &.active {
		background-color:#e7e2ff
  }
	
`

export const BodyContainer = styled.div`
	padding:65px 0;
	width: 100%;
	max-width:430px;
	margin:auto;
	min-height:100%
`