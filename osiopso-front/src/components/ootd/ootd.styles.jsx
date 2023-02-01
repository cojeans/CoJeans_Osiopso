import styled from 'styled-components'

// export const 변수명 = styled.div``
export const TopDiv = styled.div`
  h1{
    text-align: center;
  }
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
export const Container = styled.div`
width: 150px;
height: 150px;
margin-top: 30px;
display:flex;
justify-content: center;
align-items:center;
`




