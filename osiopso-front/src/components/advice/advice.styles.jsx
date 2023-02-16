import styled, {css} from 'styled-components'

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
width: 80%;
display:flex;
justify-content: space-evenly;
font-size: 80%;
margin-bottom: 15px;
.curTab{
  border-bottom: solid 3px black;
}

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
justify-content: flex-end;
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

export const AdvicecContainer = styled.div`
  .hori{
    width: 88%;
    border:solid 1px #D3D3D3;
    opacity: 0.5;
  }
  margin-top:20px;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

export const AdviceItemBox = styled.div`
  width:80%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;

`

export const ContentBox = styled.div`
  width:60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  

  
  .content{
    font-size: 13px;
  }

  .comment{
    font-size: 13px;
    display: flex;
    align-items: center;
    svg{
      padding-right: 5px;
      font-size:23px;
    }
  }

`
export const ImageContainer = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }
`