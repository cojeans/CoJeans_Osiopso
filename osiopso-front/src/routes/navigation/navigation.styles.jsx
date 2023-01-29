import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavigationContainer = styled.div`
	height: 60px;
  width: 100%;
	max-width:450px;
  display: flex;
  justify-content: space-between;
	color: #e7e2ff;
	background-color: white;
	margin:auto;
`

export const LogoContainer = styled(NavLink)`
  height: 100%;
  width: 70px;
	display:flex;
	flex-direction:column;
	text-align:center;
	text-decoration:none;

	
	svg{
		width:50%;
		height:50%;
		margin:auto;
	}
	span{
		font-size:0.7em;
		font-weight:bold;
		color:#e7e2ff;
	}

	svg{
		stroke:#e7e2ff;
		fill:#e7e2ff;
	}
	path{
		stroke:#e7e2ff
		
	}
	
  &.active {
		span{
			color:#32144f
		}
		svg{
			stroke:#32144f;
			fill:#32144f;
		}
		path{
			stroke:#32144f
			
		}
  }
	
`