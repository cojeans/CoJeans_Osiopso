import styled from 'styled-components'

export const TextToCenter = styled.div`
text-align: center;
`
export const Category = styled.div`
text-align: center;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin: 0px 20px 0px 
`
export const TextToLeft = styled.div`
display: flex;
align-items: center
text-align: left;
`
export const HomeOotdImage = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
justify-content: center;
justify-items: center;
margin: auto;
img{
    width: 110px;
    height: 167px
}
`
export const UserUploadList = styled.div`
display: grid;
grid-gap: 10px;
grid-template-columns: 1fr 1fr;
margin: auto;
padding: 10px;
justify-items: center;
width:100%;
img{
    width: 90%;
    height: 200px;
}

`

export const SelectedTagContainer = styled.div`
display:flex;
margin-top: 10px;
width: 100%;
height: 100%;

justify-content: center;
`
export const SelectedTag = styled.div`
display: inline

width: 100%;
height: 100%;
border: 4px solid black;


`

export const OotdTagDiv = styled.div`
    padding-top:60px;
`