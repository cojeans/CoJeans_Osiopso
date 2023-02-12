import styled, {css} from "styled-components";

export const CommentContainer = styled.div`
	display:flex;
	flex-direction: column;
	width: 100%;
`

export const selectComment = css`
	background-color: #e7e2ff;
`

export const CommentLargeBox = styled.div`
	display: flex;
	flex-direction: column;
	width:100%;
	align-items: center;
	justify-content: center;
	div{
		font-size: 12px;
	}
/* ${({select})=>select && selectComment} */
`

export const CommentBox = styled.div`
	display: flex;
	width:90%;
	height: 60px;
	margin:auto;
	align-items: center;
	justify-content: center;
	font-size: 13px;
`

export const UserPorfileBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width:15%;
	.imgBox{
		overflow: hidden;
		border-radius: 70%;
		width:2.5em;
		height:2.5em;
	}
		img{
		width:100%;
		height:100%;
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

export const Cocoment = styled.div`
	padding-left:10px;
	&:hover{
		color:skyblue;
		cursor: pointer;
	}
`

export const CommentList = styled.div`
	overflow: auto;
	display: flex;
	flex-direction: column;
	max-height: 70vh;
	width: 100%;
`

export const CocomentBox = styled.div`
	display: flex;
	width: 67%;
`

export const CocomentList = styled.div`
	display: flex;
	flex-direction: column;
	width:90%;
	margin-left: 8%;

	/* min-height: 70px; */

`
