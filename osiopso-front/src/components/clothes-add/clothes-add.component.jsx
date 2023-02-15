import { Fragment, useState } from "react"

import ClothesAddBody from "../clothes-add-body/clothes-add-body.component"

import {
	AddClothesTopContainer,
	LogoButtonBox
} from "./clothes-add.styles"
import { LogoContainer3 } from "./clothes-add.styles"

import { ReactComponent as BrowserLogo } from '../../assets/browser.svg'
import { ReactComponent as GallaryLogo } from '../../assets/gallary.svg'

const ClothesAdd = () => {
	const [page, setPage] = useState('album')

	return (
		<Fragment>
			{/* <AddClothesTopContainer>
				<LogoButtonBox id={'album'} onClick={() => setPage('album')}>
					<LogoContainer3>
						<GallaryLogo/>
					</LogoContainer3>
					<span>앨범에서 찾기</span>
				</LogoButtonBox>
				<LogoButtonBox id={'shop'} onClick={() => setPage('shop')}>
					<LogoContainer3>
						<BrowserLogo/>
					</LogoContainer3>
					<span>쇼핑몰에서 찾기</span>
				</LogoButtonBox>
			</AddClothesTopContainer> */}
			<ClothesAddBody page={page} />
		</Fragment>
	)
}

export default ClothesAdd