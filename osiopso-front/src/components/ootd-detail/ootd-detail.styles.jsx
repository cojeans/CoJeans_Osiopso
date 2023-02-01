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