import { Fragment } from "react"

import ClothesAddBody from "../clothes-add-body/clothes-add-body.component"

import {
	AddClothesTopContainer,
	LogoButtonBox
} from "./clothes-add.styles"
import { LogoContainer3 } from "./clothes-add.styles"

import { ReactComponent as BrowserLogo } from '../../assets/browser.svg'
import { ReactComponent as GallaryLogo } from '../../assets/gallary.svg'

const ClothesAdd = () => {
	return (
		<Fragment>
			<AddClothesTopContainer>
				<LogoButtonBox>
					<LogoContainer3>
						<GallaryLogo/>
					</LogoContainer3>
					<span>사진선택</span>
				</LogoButtonBox>
				<LogoButtonBox>
					<LogoContainer3>
						<BrowserLogo/>
					</LogoContainer3>
					<span>쇼핑몰에서 찾기</span>
				</LogoButtonBox>
			</AddClothesTopContainer>
			<ClothesAddBody/>
		</Fragment>
	)
}

export default ClothesAdd