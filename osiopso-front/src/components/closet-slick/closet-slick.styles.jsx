import styled from "styled-components";

export const SlickItem = styled.div`
/* padding:10px; */
margin:10px;
display: flex;
width:30%;

`

export const SliderContainer = styled.div`
		display: flex;
	justify-content: center;
width: 100%;
	.slick-slider{
	width: 85%;
	.slick-list{
		 margin: 0 -18px; 
	}
	.slick-next:before{
		display: none;
	}
}
`