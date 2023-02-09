import styled from "styled-components";

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