import { useState } from "react"
import {
	ProfileBox,
	IntroBox,
	FollowBox,
	ProfileImageBox,
	Intro
} from "./profile.styles"

import { useSelector } from "react-redux"
import { selectUserInfo } from "../../store/user/user.selector"

const Profile = () => {
	const [followingNum, setFollowingNum] = useState(0)
	const [followerNum, setFollowerNum] = useState(0)

	const userInfo = useSelector(selectUserInfo)

	return (
		<ProfileBox>
			<h2>{userInfo.name}</h2>
			<IntroBox>
				<ProfileImageBox>
					<img src={  userInfo.imageUrl ==='UNKNOWN'? require('../../assets/defaultuser.png'):userInfo.imageUrl} alt="" />
				</ProfileImageBox>
				<Intro>
					자기소개 페이지입니다.
					자기소개 페이지입니다.
					자기소개 페이지입니다.
				</Intro>
			</IntroBox>
			
			<FollowBox>
				<p>팔로잉 { followingNum }</p>
				<p>팔로워 { followerNum }</p>
			</FollowBox>
		</ProfileBox>
	)
}

export default Profile