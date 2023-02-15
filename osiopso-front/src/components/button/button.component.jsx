import { css } from "styled-components";
import { StyleButton} from "./button.styles";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-font-size: 1.25rem;
    --button-padding: 16px 20px;
    --button-radius: 12px;
  `,
};

const VARIANTS = {
  success: css`
    --button-color: #ffffff;
    // --button-bg-color: #28a745;
    --button-bg-color: #000000;
    // --button-hover-bg-color: #218838;
    --button-hover-bg-color: #FFFFFF;
    // --button-hover-text-color: #000000;
    :hover{ 
      color:#000000;
      border: 2px solid gray;    
    }
    
  `,
  error: css`
    --button-color: #ffffff;
    --button-bg-color: #dc3545;
    --button-hover-bg-color: #c82333;
  `,
  warning: css`
    --button-color: #212529;
    --button-bg-color: #ffc107;
    --button-hover-bg-color: #e0a800;
  `,
};
const Button = ({ disabled, size, variant, children, write, ...otherProps }) => {
	const sizeStyle = SIZES[size];
	const variantStyle = VARIANTS[variant];

	return (
		<StyleButton
			{...otherProps}
			disabled={disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
    >{write &&<HiOutlinePencilSquare/>}
      {children}</StyleButton>
	)
}

export default Button