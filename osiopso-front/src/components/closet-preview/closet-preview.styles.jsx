import styled from "styled-components";

export const PrevContainer = styled.div`
	display:grid;
	width:100%;
	height:100%;
	grid-template-columns: 1fr 1fr;
	`
	
export const PrevBox = styled.div`

	display:flex;
	justify-content: center;
	align-items: center;
	&:nth-child(1){
		border-bottom:solid 0.5px gray;
		border-right:solid 0.5px gray;
		}
	&:nth-child(2){
		border-bottom:solid 0.5px gray;
		border-left:solid	 0.5px gray;
		}
	&:nth-child(3){
		border-top:solid 0.5px gray;
		border-right:solid 0.5px gray;
	}

	&:nth-child(4){
		border-top:solid 0.5px gray;
		border-left:solid 0.5px gray;
	}
	img{
		width:3em;
		height:3em;
	}
`