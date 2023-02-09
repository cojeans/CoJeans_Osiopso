import styled from 'styled-components'

// export const 변수명 = styled.div``
export const TopDiv = styled.div`
  h1{
    text-align: center;
  }
  min-height:50vh;
`

export const OotdTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    height:60px;
    width: 100%;
`
export const OotdCategory = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin-left: 10px;

`
export const FilterContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items: center;
  padding: 8px;
  text-decoration:none;
  svg{
    width: 30px;
    height: 46px;
    margin-right: 20px;
  }
  `
// 최상위 0
export const OotdList = styled.div` 
display: grid;

grid-template-columns: 1fr 1fr;
justify-content: center;
justify-items: center;
margin: auto;
img{
    width: 150px;   
    height: 150px;
}
`
// 상위 1`
export const Container = styled.div`
width: 150px;
margin-top: 30px;
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;

`

export const CommentContainer = styled.div`
display:flex;
svg{
  width: 20px;
  height: 20px;
}
`
export const UpperCommentContainer = styled.div`
display: flex;
justify-content: start;
align-items: center;
`
export const UpperupperCommentContainer = styled.div`
display: flex;
width:100%;
justify-content: space-between
`



