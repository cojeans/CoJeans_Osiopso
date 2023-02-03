import styled from "styled-components";

export const CameraContainer = styled.div`
	width:100%;
	height:80vh;
	display:flex;
	flex-direction:column;
	align-items: center;
	margin:auto;
	button{
		width:90%;
		background-color:black;
		color:white;
		height:50px;
		margin-top:10px;
	}
`

export const Video = styled.video`
	width:90%;
	height:700px;
	object-fit:cover ;
	
`