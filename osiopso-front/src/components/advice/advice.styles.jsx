import styled from "styled-components";

export const HunsuImages = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
justify-content: center;
justify-items: center;
margin: auto;
img{
    width: 110px;
    height: 167px;
    // margin: 10px 10px 10px;
}
`
export const TopTag = styled.div`
width: 30%;
display:flex;
justify-content: space-around;
`
export const Container = styled.div`
width: 150px;
margin-top: 30px;
display:flex;
// flex-direction: column;
justify-content: center;
align-items:center;
`
export const UpperupperCommentContainer = styled.div`
display: flex;
width:100%;
justify-content: space-between
`
export const UpperCommentContainer = styled.div`
display: flex;
justify-content: start;
align-items: center;
`
export const CommentContainer = styled.div`
display:flex;
justify-content: flex-start;
margin-bottom: 20px;
svg{
  width: 18px;
  height: 18px;
}
`
export const EachBox = styled.div`
display:flex;
flex-direction: column;
`
export const TrashcanContainer = styled.div`
display:flex;
jusyify-content: flex-end;
svg{
    width: 18px;
    height: 18px;
}
`
export const IconBigBox = styled.div`
display:flex;
`