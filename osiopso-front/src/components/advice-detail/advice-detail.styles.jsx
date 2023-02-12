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

  export const AdviceDetailImage = styled.div`
  width: 90%;
  height: auto;
  img{
    width: 100%;
    height: 100%;
  }
  
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
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  `

  export const EachIcon = styled.div`

  margin: 0px 5px 0px;
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
  // adviceDetail.content{
  //   white-space:normal;
  //   word-wrap:break-word;
  // }
  // word-wrap: break-word;
  white-space; normal;
  word-break: normal;
  width: 100%;
  height: 100%;
  padding-left: 30px;
  margin-bottom: 20px;
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
  export const IconBox = styled.div`
  display: flex;
  `
  export const TrashBox = styled.div`
  display: flex;
  `

