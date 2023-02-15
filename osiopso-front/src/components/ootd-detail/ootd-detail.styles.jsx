import styled from "styled-components";

export const RoundProfileImage = styled.div`

width: 150px;
height: 150px;
border-radius: 70%;
overflow: hidden;
`

export const ProfileImageBox = styled.div`
      border-radius:70%;
      width:3em;
      height:3em;
      margin:10px;
      overflow: hidden;

       img{
          width:100%;
          height:100%
        }
  `;

  export const UpperProfile = styled.div`
  display: flex;
  align-items: center;
  `

  export const OotdDetailImage = styled.div`
  width: 90%;
  height: 50vh;  
  img{
    width:100%;
    height:100%
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
  display: flex; 
  justify-content: center;
  width:100%;
  align-items:center;
  justify-content: space-between;
  button{
    background-color:white;
    color:#4D184C;
    border:none;
    height:40px;
  }
  `

  export const ClosetInput = styled.input`
  width: 80%;
  height:40px;
  border:none;
  border-bottom:solid 1px gray;
  padding: 0  10px 0 10px;
  &:focus{
    outline:none;
  }

  `

export const DetailContainer = styled.div`
  display:flex;
  width:90%;
  justify-content: space-between;
  height:30px;
  align-items:center;
  span{
    font-size:15px;
  }

  `

export const IconBox = styled.div`
  width:20%;
  display:flex;
  justify-content: space-around;
  height:30px;
  align-items:center;
`

export const IconMessageBox = styled.div`
  width:28%;
  display:flex;
  justify-content: space-around;
  align-items:center;
  span{
    font-weight:bold;
  }
  `

  export const IconContainer = styled.div`
    display :flex;
    align-items: center;
    width:50%;
    justify-content: space-evenly;
    div{
      font-size:13px;
    }
  `

export const CommentIcon = styled(HashLink)`
    display :flex;
    align-items: center;
    width:50%;
    justify-content: space-evenly;
    div{
      font-size:13px;
    }
`

export const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;;
  align-items: center;
`
export const ContentBox = styled.div`
display: flex;
width: 90%;
height: 100%;
margin: 10px 20px 10px;
white-space: normal;
word-break: break-all;
`
