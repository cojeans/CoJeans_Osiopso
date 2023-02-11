import styled from "styled-components";

export const AdviceImageCreate = styled.div`
display:flex;
justify-content: center;
img{
    width: 300px;
    height: 450px;
}
`
export const SaveButton = styled.div`
display:flex;
justify-content: center;
margin-top: 20px;
`



export const Xcontainer = styled.div`
display: flex;
align-items: center;
margin: 0px 10px 0px;
img{
    width: 20px;
    height: 20px;
}
`
export const TopContainer = styled.div`
display: flex;
`
export const MarginDiv = styled.div`
margin: 10px;
display:flex;
width:350px;
textarea{
    border:none;
    outline:none;
    resize:none;
    width:350px;
    height:100px;
    padding:10px;
    border-bottom:solid 1px gray;
}
`
export const BottomContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
`

export const OotdInput = styled.input`
	display:none;

`

export const OotdImgContainer = styled.div`
    width:350px;
    height:350px;
    background-color:white;
    display:flex;
    justify-content: center;
    align-items: center;
    border:1px solid gray;

    img{
        width:100%;
        height:100%;
    }
    span{
        font-size:100px;        
    }
`

export const StyleTagButton = styled.button`
    border:none;
    height:40px;
    width:80px;
    border-radius:4px;
    background-color:#e7e2ff;
    cursor:pointer;
`