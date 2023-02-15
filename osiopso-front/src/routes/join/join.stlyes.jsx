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
export const Loading = styled.div`
.basic:before {
  content: '';
  display: block;
  height: 50px;
  width: 50px;
  -webkit-animation: spin .5s infinite linear;
          animation: spin .5s infinite linear;
  border: 6px var(--primary) solid;
  border-left-color: var(--secondary);
  border-radius: 100%; }

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

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