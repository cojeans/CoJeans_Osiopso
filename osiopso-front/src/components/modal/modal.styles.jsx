import styled,  {css} from "styled-components";

export const modalStyle = css`
  padding-bottom:60px;
`

export const modalStyle2 = css`
  align-items: center;
`

export const ModalPage = styled.div`
 	display:flex;
  justify-content:center;
  align-items: flex-end;
  width:100%;
  height:100%;
	${({page})=> page===1 && modalStyle};
  /* 최상단 위치 */
  z-index: 999;
  ${({page})=> page===5 && modalStyle2};

  
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background: rgba(0, 0, 0, 0.4);
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);

  overflow:hidden;

`