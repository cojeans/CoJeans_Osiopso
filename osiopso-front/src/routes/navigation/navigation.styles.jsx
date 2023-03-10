import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const main = "black"

export const isPadding = css`
		padding:55px 0;

`

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
		color:black;
		}
	span{
		font-size:0.7em;
		// font-weight:bold;
		color:black;
	}
	
  &.active {
		svg{
			fill:${main};
		}
  }
	
`

export const BodyContainer = styled.div`
  ${({page}) => page && isPadding}

	width: 100%;
	max-width:430px;
	margin:auto;
	min-height:100vh;
	display:flex;
	flex-direction:column;
`

export const PlusContainer = styled.div`
  height: 100%;
  width: 25%;
	display:flex;
	flex-direction:column;
	text-align:center;
	text-decoration:none;
	border-radius:5px;

	
	svg{
		width:90%;
		height:90%;
		margin:auto;
	}
	span{
		font-size:0.7em;
		// font-weight:bold;
		color:black;
	}


`

export const HashContainer = styled.div`
  height: 100%;
  width: 25%;
	display:flex;
	flex-direction:column;
	text-align:center;
	text-decoration:none;
	border-radius:5px;

	.hash{
		background-color:red;
	}

	
	svg{
		width:45%;
		height:45%;
		margin:auto;
		color:black;
		fill:white;
		}
	span{
		font-size:0.7em;
		// font-weight:bold;
		color:black;
	}
	
  &.active {
		svg{
			fill:black;
		}
  }
`

export const HashLinkContainer = styled(HashLink)`
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
		color:black;
	}
		
	span{
		font-size:0.7em;
		// font-weight:bold;
		color:black;
	}
	
  &.active {
		svg{
			fill:${main};;
		}
  }
	
`