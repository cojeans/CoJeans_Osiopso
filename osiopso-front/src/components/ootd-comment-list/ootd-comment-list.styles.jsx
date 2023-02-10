import styled from "styled-components";

export const CommentContainer = styled.div`
	display:flex;
	flex-direction: column;
`

export const CommentLargeBox = styled.div`
	display: flex;
	flex-direction: column;
	width:100%;
	height:70px;
	align-items: center;
	justify-content: center;
	div{
		font-size: 12px;
	}
`

export const CommentBox = styled.div`
	display: flex;
	width:90%;
	height: 60px;
	margin:auto;
	align-items: center;
	justify-content: center;
	font-size: 14px;
`

export const UserPorfileBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width:15%;
	.imgBox{
		overflow: hidden;
		border-radius: 70%;
	}
		img{
		width:2.5em;
		height:2.5em;
	}
`

export const ContentBox = styled.div`
	display: flex;
	flex-direction: column;
	width:80%;
`

export const UpperContent = styled.div`
	display: flex;
	.time{
		padding-left: 10px;
		color:gray;
	}
`

export const HeartIconBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	.heartCount{
		font-size: 13px;
	}
`

