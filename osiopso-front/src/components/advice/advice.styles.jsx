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
display:flex;
// flex-direction: column;
justify-content: space-between;
align-items:center;
margin-top: 20px;
`
export const UpperupperCommentContainer = styled.div`
display: flex;
`
export const EachIcon = styled.div`
display: flex;
margin-right: 3px;
// margin: 0px 2px 0px

`
export const CommentContainer = styled.div`
display:flex;
justify-content: space-between;
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
export const ThumbBox = styled.div`
display:flex;
`
export const TimeBox = styled.div`
display: flex;

`