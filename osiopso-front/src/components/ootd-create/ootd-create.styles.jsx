import styled from "styled-components";

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
justify-content: center;
align-items: center;
textarea{
    border:none;
    outline:none;
    resize:none;
    width:320px;
    height:100px;
    padding:10px;
    border-bottom:solid 1px gray;
    font-family: LINESeedKR-Bd;
}
`
export const BottomContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
padding-top:10px;
.saveDv{
    justify-content: flex-end;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    .saveItem{
        display: flex;
        align-items: center;
        width: 20%;
    }
}
`

export const OotdInput = styled.input`
	display:none;

`

export const OotdImgContainer = styled.div`
    width:320px;
    height:320px;
    background-color:white;
    display:flex;
    justify-content: center;
    align-items: center;
    border:1px solid gray;
    .imgBox{
        img{
            width: 60px;
            height: 60px;
        }
    }
    img{
        width:100%;
        height:100%;
    }
    
`

export const StyleTagButton = styled.div`
    padding:10px 0;
    border:none;
    height:40px;
    width:320px;
    border-radius:4px;
    cursor:pointer;
    background-color: white;
    font-family: 'LINESeedKR-Bd';
    display: flex;
    align-items: center;
    justify-content: flex-start
`

export const TagBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    div{
        margin:3px;
    }
`
export const Note = styled.div`
display: flex;
width: 320px;
height: 100%;
text-align: start;
font-size: 80%;
padding:10px 0;
`

export const ExclamationMark = styled.div`
display: flex;
margin-right: 1%;
`
