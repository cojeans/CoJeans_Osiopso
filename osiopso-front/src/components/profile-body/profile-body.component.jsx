import { Fragment } from "react"
import ProfileCloset from "../profile-closet/profile-closet.component"
import {
	TabMenue,
	TabBody
} from "./profile-body.styles"

const ProfileBody = () => {
	return (
		<Fragment>
			<TabMenue>
				<p>옷장</p>
				<p>OOTD</p>
				<p>훈수</p>
			</TabMenue>
			<TabBody>
					<ProfileCloset/>
			</TabBody>
		</Fragment>
	)
}

export default ProfileBody