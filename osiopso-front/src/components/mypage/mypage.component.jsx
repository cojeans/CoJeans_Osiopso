import { Fragment } from "react"


import Profile from "../../components/profile/profile.component"
import ProfileBody from "../../components/profile-body/profile-body.component"

const MypageBody = () => {
	return (
		<Fragment>
			<Profile />
			<ProfileBody/>
		</Fragment>
	)
}

export default MypageBody