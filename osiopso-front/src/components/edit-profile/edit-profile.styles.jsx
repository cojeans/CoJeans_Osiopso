import styled from "styled-components";
	
export const EditContainer = styled.div`
	border-radius: 10px;
	width:300px;
	height:400px;
	background-color:white;
	padding:10px;
	display:flex;
	flex-direction:column;
	align-items: center;
	justify-content: space-around	
`

export const UserImageBox = styled.div`
	border-radius: 70%;
	width: 4em;
	height: 4em;
	overflow: hidden;
	position: relative;
	input{
		display: none;
	}
	.edit{
		position: absolute;
    top: 43px;
    font-size: 14px;
    right: 15px;
    color: white;
}
	}
	img{
		width: 100%;
		height: 100%;
	}
`