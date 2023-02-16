import styled from "styled-components";

export const ProfileBox = styled.div`
	display:flex;
	flex-direction:column;
	width: 80%;
	margin:0 auto;
`
export const IntroBox = styled.div`
	display:flex;
	justify-content: space-between;
`

export const Intro = styled.div`
	font-size:12px;
	width:60%
`

export const FollowBox = styled.div`
	display:flex;
justify-content: space-between;
padding:5px;
	p{
		font-size:14px;
		padding:5px 5px;
		margin:10px;
	}
`

export const ProfileImageBox = styled.div`
	border-radius:50%;
	width:4em;
	height:4em;
	overflow:hidden;
	img{
		width:100%;
		height:100%;
	}
`;

export const Followcon = styled.div`
	display: flex;
	align-items: center;
`