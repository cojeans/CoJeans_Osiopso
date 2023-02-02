import styled from "styled-components";

export const AddPictureBody = styled.div`
	margin:auto;
	display:flex;
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