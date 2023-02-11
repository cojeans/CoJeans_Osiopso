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
export const ImgContainer = styled.div`
display:flex;
justify-content: center;
width: 100%
`

export const EditContainer = styled.div`
display:flex;
justify-content: flex-end;
width: 80%
`
export const ExampleContainer = styled.div`
	display:flex;
	justify-content: space-around;
	width:80%;
	padding:20px;
`

export const EditBox = styled.div`
	display:flex;
	flex-direction:row;
	justify-content: flex-end;	
	align-items: center;
	width:20%;
	height:50px;
	img{
		width:20px;
		margin-left: 10px;
		height:20px;
		border-radius:4px;
	}
	span{
		// padding-top:10px;
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

export const PrevUploadImg = styled.div`
	flex-direction:row;

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


export const Xcontainer = styled.div`
display: flex;
align-items: center;
margin: 0px 10px 0px;
img{
    width: 20px;
    height: 20px;
}
`
export const TopContainer = styled.div`
display: flex;
`
export const MarginDiv = styled.div`
margin: 10px;
display:flex;
width:350px;
textarea{
    border:none;
    outline:none;
    resize:none;
    width:350px;
    height:100px;
    padding:10px;
    border-bottom:solid 1px gray;
}
`
export const BottomContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
`

export const OotdInput = styled.input`
	display:none;

`

export const OotdImgContainer = styled.div`
    width:350px;
    height:350px;
    background-color:white;
    display:flex;
    justify-content: center;
    align-items: center;
    border:1px solid gray;

    img{
        width:100%;
        height:100%;
    }
    span{
        font-size:100px;        
    }
`

export const StyleTagButton = styled.button`
    border:none;
    height:40px;
    width:80px;
    border-radius:4px;
    background-color:#e7e2ff;
    cursor:pointer;
`