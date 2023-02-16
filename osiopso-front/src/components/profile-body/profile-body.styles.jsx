import styled, { css} from "styled-components"

export const Three = css`
		grid-template-columns: 1fr 1fr 1fr;

`
export const Two = css`
		grid-template-columns: 1fr 1fr;

`



export const TabMenue = styled.div`
	display:grid;
	grid-template-columns: 1fr 1fr 1fr;
	${({isUser}) => isUser==='three' && Three}
	${({isUser}) => isUser==='two' && Two}

	width: 80%;
	p{
			text-align:center;
			margin:0;
			padding:10px;
			
		}
		.select{
			border-bottom: solid 2px black;
		}
	margin:0 auto;
	margin-bottom:15px;
	/* border-bottom:1px solid black; */

`

export const TabBody = styled.div`
	width: 100%;
	margin:0 auto
`











































