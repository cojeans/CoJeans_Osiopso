import { useState } from "react"
import { Fragment } from "react"
import ProfileCloset from "../profile-closet/profile-closet.component"
import {
	TabMenue,
	TabBody
} from "./profile-body.styles"

const ProfileBody = ({ id }) => {
	const [profilePage, setProfilePage] = useState('closet')

	return (
		<Fragment>
			<TabMenue>
				<p onClick={() => setProfilePage('closet')} page={profilePage === 'closet'}
					className={ profilePage==='closet' ? 'select' : ''}
				>옷장</p>
				<p onClick={() => setProfilePage('ootd')} page={profilePage === 'ootd'}
				className={ profilePage==='ootd' ? 'select' : ''}>OOTD</p>
				<p onClick={() => setProfilePage('advice')} page={profilePage === 'advice'}
				className={ profilePage==='advice' ? 'select' : ''}
				>훈수</p>
			</TabMenue>
			<TabBody>
				{
					profilePage === 'closet'
						?	<ProfileCloset id={id} />
						: profilePage === 'ootd'
							?<div>ootd</div> 
							:<div>advice</div>
						}
			</TabBody>
		</Fragment>
	)
}

export default ProfileBody