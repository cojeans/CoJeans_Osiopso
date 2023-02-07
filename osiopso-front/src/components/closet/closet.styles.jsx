import styled from "styled-components";

export const ItemContainer = styled.div`
	cursor:pointer;
	p{
		font-size:14px;
	}
`

export const ClosetItem = styled.div`
	width:8em;
	height:8em;
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
	flex-direction:column;
	margin:auto;
	p{
		margin-bottom:0;
		width:120px;
		font-size:13px;
		span{
			font-size:13px;
			color:gray;
		}
	}
`