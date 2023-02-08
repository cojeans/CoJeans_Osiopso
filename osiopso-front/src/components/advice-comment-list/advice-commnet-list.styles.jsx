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
  `
  export const ProfileAndName = styled.div`
  display: flex;
  width: 20%;
  `
  export const ProfileName = styled.div`
  display:flex;
  margin-top: 20px;
  `
  export const LikeDislikeBox = styled.div`
  display:flex;
  margin: 0px 5px 0px;
  `
  export const AdviceBox = styled.div`
  display:flex;
  margin-top: 12%; 
  flex-direction: column;
  align-items: flex-start;
  `
  export const AdviceContent = styled.div`
  display: flex;
  `

  export const OotdDetailImage = styled.img.attrs({
    src:'data:image/jpeg;base64,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'
  })`
  width: 50%;
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
    width: 70px;
    height:70px;
    margin-top: 7%;
    align-items: flex-start;
    svg{
      width:70%;
      height:100%;
    }
  `
  export const Box = styled.div`
  display: flex;
  width: 130px;

  `

  export const AlertContainer = styled.div`
  display:flex;
  width: 20px;
  height:20px;
  align-items: center;
  margin-top: 5%;
  `

  export const CommentProfileImage = styled.img.attrs({
    src:'https://w.namu.la/s/979d4fc0b373fb59818cbbd6c40ed111f1196b2f6078428e88a46b6671a34294e5f9a81fdb90b7ca9635a975c93625636f54f2d532eb13c2189890d462e3062baa3e0ab0de7d515a0f0c35c871d599cd882b954dfc71844b9ede1b2fe177550793ac79f50bc75e2d0e05572182fd98c1'
  })`
  width: 30px;
  height: 30px;
  border-radius: 70%;
  `
  export const UpperComment = styled.div`
  display: flex; 
  padding-left: 30px;
  `

  export const ClosetInput = styled.input`
  width: 70%;
  height:40px;
  border:none;
  border-bottom:solid 1px gray;
  &:focus{
    outline:none;
  }

  `
  export const HunsuButton = styled.div`
  display: flex;
  justify-content: center;
  `
  export const BottomBox = styled.div`
  height: 100px;
  border: 1px solid black;
  background-color: #FFE3EE;
  `