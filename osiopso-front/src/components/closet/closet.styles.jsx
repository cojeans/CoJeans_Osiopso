import styled, { css } from "styled-components";

export const ItemContainer = styled.div`
	cursor:pointer;
	p{
		font-size:14px;
	}
`

export const adviceStyles = css`
	width:100px;
	height:100px;
` 

export const profileStyles = css`
	width:8em;
	height:8em;;
` 

export const ClosetItem = styled.div`
	${({page}) => page==='advice' && adviceStyles}
	${({page}) => page==='profile' && profileStyles}

	border-radius:10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	p{
		font-size:15px;
		text-align:center;
		color:#D3D3D3;
		margin:0 ;
		font-weight:bold;
	}
	display:flex;
	flex-direction:column;
	align-items: center;
	justify-content: center;
	cursor:pointer;
	`

export const ItemInfo = styled.div`
	width:93%;
	display:flex;
	/* flex-direction:column; */
	justify-content: cneter;
	align-items: center;
	margin:auto;
	p{
		margin-bottom:0;
		width:93%;
		font-size:13px;
		span{
			font-size:13px;
			color:gray;
		}
	}
`