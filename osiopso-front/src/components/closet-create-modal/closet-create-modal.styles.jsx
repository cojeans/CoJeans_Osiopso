import styled from "styled-components";

export const ModaContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  width:100%;
  height:100%;
  /* 최상단 위치 */
  z-index: 999;
  
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background: rgba(0, 0, 0, 0.8);

`

export const CreateClosetTitle = styled.div`
  text-align:center;
  font-size:18px
`

export const ClosetInput = styled.input`
  width:100%;
  height:40px;
  border:none;
  border-bottom:solid 1px gray;
  &:focus{
    outline:none;
  }
  `

export const ClosetContent = styled.div`
  width:90%;
  height:80%;
`

export const ButtonContainer = styled.div`
  display:flex;
    button{
    border:none;
    background-color:white;
    padding:10px;
    margin-left:auto;
  }
`

export const ModalBody = styled.div`
  height:500px;
  width:360px;
   display:flex;
  flex-direction:column;
  align-items:center;
  background-color:white;
`