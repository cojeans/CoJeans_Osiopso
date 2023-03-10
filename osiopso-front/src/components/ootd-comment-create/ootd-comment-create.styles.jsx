import styled from "styled-components";

export const RoundProfileImage = styled.div`

width: 150px;
height: 150px;
border-radius: 70%;
overflow: hidden;
`

export const ProfileImageBox = styled.img.attrs({
    src: `https://pixlr.com/images/index/remove-bg.webp`,
  })`
      border-radius:70%;
      width:3em;
      height:3em;
      margin:10px;
  `;

  export const UpperProfile = styled.div`
  display: flex;
  align-items: center;
  `

  export const OotdDetailImage = styled.img.attrs({
    src:'https://www.kdfnews.com/news/photo/202202/87406_87382_2149.jpg'
  })`
  width: 300px;
  height: 450px;  
  `

  export const UpperImage = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  `
  export const UpperLikeContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 70px;
  padding-right: 70px;
  justify-content: space-between;
  `
  export const LikeContainer = styled.div`
  display: flex;
    width:40px;
    height:40px;
    svg{
      width:100%;
      height:100%;

    }
  `
  export const AlertContainer = styled.div`
  display:flex;
  width: 40px;
  height:40px;
  align-items: center;
  `

  export const CommentProfileImage = styled.img.attrs({
    src:'https://w.namu.la/s/979d4fc0b373fb59818cbbd6c40ed111f1196b2f6078428e88a46b6671a34294e5f9a81fdb90b7ca9635a975c93625636f54f2d532eb13c2189890d462e3062baa3e0ab0de7d515a0f0c35c871d599cd882b954dfc71844b9ede1b2fe177550793ac79f50bc75e2d0e05572182fd98c1'
  })`
  width: 40px;
  height: 40px;
  border-radius: 70%;
  `
export const UpperComment = styled.div`
  margin: auto;
  display: flex; 
  justify-content: center;
  width:95%;
  align-items:center;
  justify-content: space-between;
  .userBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    .username{
      font-size: 81%;
    }

  }
  `

  export const ClosetInput = styled.input`
  width:78%;
  height:40px;
  border:none;
  border-bottom:solid 1px gray;
  padding: 0  10px 0 10px;
  font-family: 'LINESeedKR-Bd';
  &:focus{
    outline:none;
  }
  `
  
  export const InputBox = styled.div`
    width:80%;
    display: flex;
    justify-content: space-around;
    button{
    background-color:white;
    color:#4D184C;
    border:none;
    height:40px;
      button{
        font-size: 100%;
      }
  }
  `