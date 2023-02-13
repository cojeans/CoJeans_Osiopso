import styled from "styled-components";

export const CreatAdvicePage = styled.div`
	height: 82vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const ClothesContainer = styled.div`


	width: 90%;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin:auto;
	min-height: 150px;
`

export const ItemDropContainer = styled.div`
	width: 340px;
	height: 220px;
	border: solid 1px gray;
	display: flex;
	margin: auto;
	justify-content: center;
	align-items: center;
	min-height: 140px;
	
`



export const ImageContainer = styled.div`
	img{
		width:45px;
		height: 45px;
	}	
	margin:5px;
	padding:5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	border-radius: 10px;

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
`
