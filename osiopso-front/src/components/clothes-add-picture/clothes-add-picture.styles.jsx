import styled from "styled-components";
import { NavLink } from 'react-router-dom'

export const AddPictureBody = styled.div`
	display:flex;
	width:80%;
	flex-direction:column;
	align-items: center;
	p{
		font-size:14px;
	}
`


export const ExampleContainer = styled.div`
	display:flex;
	justify-content: space-around;
	width:80%;
	padding:20px;
`

export const ExampleBox = styled.div`

	display:flex;
	flex-direction:column;
	justify-content: center;	
	align-items: center;
	width:100px;
	height:120px;
	margin-inline:25px;
	img{
		width:70px;
		height:70px;
		border-radius:4px;
	}
	span{
		padding-top:10px;
		font-size:15px;
		color:gray;
	}
	label{
		display:flex;
		flex-direction:column;
		justify-content: center;	
		align-items: center;
		width:100px;
		height:120px;
		span{
			padding-top:10px;
			font-size:15px;
			color:gray;
		}
	}
	&:hover{

		background-color:#e7e2ff
	}
  
`;


export const PrevUploadImg = styled.div`
	width:80%;
	height:270px;
	padding:10px;
	img{
		width:100%;
		height:100%;
	}
`;

export const ImageInput = styled.input`
	display:none;
`

export const LinkContainer = styled(NavLink)`
margin: 0;
padding: 0;
box-sizing: border-box;
display:block;
font-size: 1.05rem;
text-transform: capitalize;
padding: 1rem 1.5rem;
color: hsl(210, 22%, 49%);
transition: all 0.3s linear;
text-decoration:none;

cursor: pointer;
    &:hover {
    background: hsl(205, 86%, 81%);
    }
`