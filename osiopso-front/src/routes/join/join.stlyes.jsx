import styled from 'styled-components'

export const SignUpContainer = styled.div`
	 display: flex;
    flex-direction: column;
    width: 100%;
    max-width:350px;
		margin:auto;
`
export const Osiopso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Bodoni = styled.div`
  display: flex;
  font-family: 'Bodoni';
  font-size: 300%;
`;
export const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
Button{
  margin: 2% 0% 2%;
}

`
export const SocialSignup = styled.div`
display:grid;
grid-template-columns: 2fr 2fr 2fr;
justify-content: center;
justify-items: center;
margin-top: 30px;
img{
    width: 80px;
    height: 80px;
}


`

export const TextContainer = styled.div`
margin-top: 20px;
color: gray;
`