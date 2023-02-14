import styled from "styled-components";

export const UpperBox = styled.div`
display: flex;
justify-content: center;
margin-top: 30px;
`
export const Box = styled.div`
display: flex;
flex-direction: column;
// margin-top: 30px;
align-items: center;
width: 90%;
height: 200px;
// border: 0.1px solid lightgrey;
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
padding-top: 30px;
letter-spacing: 1px;
`
export const UpperInput = styled.div`
display:flex;
align-items: center;
`
export const TextBox = styled.div`
display: flex;
font-size: 12px;
padding-right: 28px;

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