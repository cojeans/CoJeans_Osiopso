import styled from "styled-components";

export const SearchTop = styled.div`
	height:80px;
	width:100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`
export const SearchLabel = styled.label`
	width:83%;
	display: flex;
	align-items: center;
	background-color: #DBDBDB;
	border-radius: 20px;
	justify-content: center;
`
export const SearchInput = styled.input`
	border:none;
	width:80%;
	height: 55px;
	background-color: #DBDBDB;
	font-size:20px;
	padding-left:10px;
	&:focus { outline: none; }
`

export const HashContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height:50vh;
	
`

export const HashBox = styled.div`
	width: 80%;
	font-size: 23px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.hash{
		width:70%;
	}
`

export const Circle = styled.div`
	border-radius: 100%;
	width: 50px;
	height:50px;
	border:solid 1px black;
	display: flex;
	align-items: center;
	justify-content: center;
`