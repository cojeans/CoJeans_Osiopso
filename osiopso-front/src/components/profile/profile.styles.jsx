import styled from "styled-components";

export const ProfileBox = styled.div`
	display:flex;
	flex-direction:column;
	border-bottom:solid 1px black;
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
	justify-content:center;
	p{
		font-size:16px;
		padding:5px 10px;
	}
`

export const ProfileImageBox = styled.img.attrs({
  src: `https://pixlr.com/images/index/remove-bg.webp`,
})`
	border-radius:50%;
	width:5em;
	height:5em;
`;