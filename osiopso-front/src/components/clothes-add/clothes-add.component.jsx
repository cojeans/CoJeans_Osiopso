import { Fragment } from "react"

import ClothesAddBody from "../clothes-add-body/clothes-add-body.component"

import {
	AddClothesTopContainer
} from "./clothes-add.styles"
import { LogoContainer2 } from "../profile-closet/profile-closet.styles"

import { ReactComponent as BrowserLogo } from '../../assets/browser.svg'
import { ReactComponent as GallaryLogo } from '../../assets/gallary.svg'

const ClothesAdd = () => {
	return (
		<Fragment>
			<AddClothesTopContainer>
				<div>
					<LogoContainer2>
						<GallaryLogo/>
					</LogoContainer2>
					<p>사진선택</p>
				</div>
				<div>
					<LogoContainer2>
						<BrowserLogo/>
					</LogoContainer2>
					<p>쇼핑몰에서 찾기</p>
				</div>
			</AddClothesTopContainer>
			<ClothesAddBody/>
		</Fragment>
	)
}

export default ClothesAdd