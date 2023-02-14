import styled,{css} from 'styled-components'

export const BaseButton = styled.button`
  min-width: 165px;
  width: 100%;
  height: 60px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 20px;
  background-color: #BCF0E0;
  color: #32144f;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
	border-radius:4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
	margin:auto;
  font-family: 'LINESeedKR-Bd';
`



export const StyleButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}

  font-family: 'LINESeedKR-Bd';
  border: none;
  cursor: pointer;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  background: var(--button-bg-color,  #BCF0E0);
  color: var(--button-color, #ffffff);

  &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #025ce2);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #025ce2);
  }
`


