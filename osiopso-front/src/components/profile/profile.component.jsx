import { useState } from "react"
import {
	ProfileBox,
	IntroBox,
	FollowBox,
	ProfileImageBox,
	Intro
} from "./profile.styles"


const Profile = () => {
	const [followingNum, setFollowingNum] = useState(0)
	const [followerNum, setFollowerNum] = useState(0)


	return (
		<ProfileBox>
			<h2>UserId</h2>
			<IntroBox>
				<ProfileImageBox/>
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