import styled from 'styled-components'

export const UpperBox = styled.div`
display: flex;
justify-content: center;
margin-top: 50px;
`

export const Box = styled.div`
display: flex;
flex-direction: column;
// margin-top: 30px;
align-items: center;
width: 85%;
height: 100px;
border: 0.1px solid lightgrey;
p{
    font-size: 12px;
}
`
export const PasswordBoxMessage = styled.div`
width: 80%;
height: 100%;
display:flex;
justify-content: center;
font-size: 12px;
text-align: center;
word-break:keep-all;
margin: 10px;
letter-spacing: 1px;
`
export const UpperInput = styled.div`
display:flex;
align-items: center;
`
export const CloseInput = styled.input`
width: 70%;
height:20px;
border: none;

border-bottom: solid 1px gray;


&:focus{
    outline:none;
}
`

export const UpperCloseInputbox = styled.div`
display: flex;
flex-direction: column;
margin-left:10px;
span{
    font-size: 5px;
}
`
export const AlertMessage = styled.div`
color: red;
font-size: 5px;
`
export const ButtonBox = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;