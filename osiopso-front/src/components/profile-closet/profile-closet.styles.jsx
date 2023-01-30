import styled from "styled-components";

export const ClosetBodyContainer = styled.div`
	display:grid;
	grid-template-columns:1fr 1fr;
	justify-items: center;
	grid-gap:20px;

`
export const LogoContainer2 = styled.div`
  height: 50%;
  width: 70px;
	display:flex;
	flex-direction:column;
	text-align:center;
	text-decoration:none;
	img{
		height:100%;
	}
`
export const PlusCloset = styled.img.attrs({
  src: require('../../assets/closet-plus.png'),
})`
	
`;