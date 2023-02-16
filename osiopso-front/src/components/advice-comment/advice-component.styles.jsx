import styled from "styled-components";

export const CreatAdvicePage = styled.div`
	height: 82vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

`

export const ClothesContainer = styled.div`
	padding:10px 0;
	width: 84%;
	margin:auto;
	height: 70px;

	.gray{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
	

	.slick-slide {
  margin: 0 10px; // space(여백)/2\
	height: 100%;
    display: flex;
    align-items: center;
		div{
			width:100%;
			height: 100%;
			display: flex;
			align-items: center;
		}
}
.slick-list {
  margin: 0 px; // space(여백)/-2
	padding:0;
	width: 100%;
	height: 100%;
}

`

export const ItemDropContainer = styled.div`
	width: 340px;
	/* height: 220px; */
	display: flex;
	margin: auto;
	justify-content: center;
	align-items: center;
	min-height: 220px;
	border:dotted;
	.imageExample{
		width: 100%;
		height: 100%;
		opacity: 0.2;
	}
`

export const ImageContainer = styled.div`
	width:100%;
	img{
		width:50px;
		height: 50px;
		margin: auto;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	border-radius: 10px;
	}	
	padding:5px;


`
export const InputContainer = styled.div`
	height:10%;
	display: flex;
	align-items: center;
	justify-content: center;
`




export const SliderContainer = styled.div`
	width:100%;
	margin:auto

`
export const CategoryBox = styled.div`
	width: 80%;
	margin: auto;
`

export const ClothesBox = styled.div`
	display	: flex;
	flex-direction: column;


`
export const AdcivceCommentInput = styled.input`
	border:none;
	width: 75%;
	&:focus{
		outline: none;
	}
	font-family: 'LINESeedKR-Bd';

`
