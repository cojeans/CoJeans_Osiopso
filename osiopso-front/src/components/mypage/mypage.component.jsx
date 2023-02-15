import { Fragment } from "react"


import Profile from "../../components/profile/profile.component"
import ProfileBody from "../../components/profile-body/profile-body.component"

const MypageBody = ({ id }) => {
	return (
		<Fragment>
			<Profile id={ id } />
			<ProfileBody id={ id }/>
		</Fragment>
	)
}

export default MypageBody