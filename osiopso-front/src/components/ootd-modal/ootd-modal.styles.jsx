import styled, { css } from "styled-components";

export const selectStyle = css`
background-color:#e7e2ff;
color:black;
`

export const CategoryModalContainer = styled.div`
	width:430px;
	height:500px;
	background-color:white;
	border-radius:50px 50px 0 0;
	display:flex;
	flex-direction: column;
	align-items: center;

`

export const CategoryBox = styled.div`
	width:90%;
	padding:10px;
	border-bottom:solid 1px gray;


	
`

export const Title = styled.div`
	margin:9px;
	font-size:15px;
`

export const Tag = styled.div`
		height:30px;
		/* border-radius:4px; */
		padding:4px;
		margin:8px;
		display:inline-block;
		text-align:center;
		color:rgba(0,0,0,0.5);
		border:solid 1px gray;
		cursor:pointer;
		font-size:13px;
		${({select})=> select && selectStyle};		
`
export const SaveBox = styled.div`
margin-top: 30px;
`