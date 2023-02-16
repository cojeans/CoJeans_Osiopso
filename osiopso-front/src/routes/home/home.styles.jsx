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
align-items: center;
text-align: left;
font-size: 140%;
width: 95%;
margin: 27px auto 0 auto;
justify-content: space-around

`
export const HomeOotdImage = styled.div`
width: 95%;
/* display: flex;

justify-content: center;
justify-items: center; */
margin: auto;

.hotTitle{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top:27px;
}
.slick-list{
    .imgBox{
        display: flex;
        justify-content: center;
        img{
            height: 110px;
            width: 110px;
            border-radius: 6px;
        }
    }
}
.slick-arrow{
    display: none !important;
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
display: inline;

width: 100%;
height: 100%;
border: 4px solid black;


`

export const OotdTagDiv = styled.div`
    padding-top:40px;
`
export const TagBox = styled.div`
display: flex;
text-align: left;
font-size: 80%;
margin: 1% 2% 2% 0%;
/* font-family: 'Bodoni'; */
`