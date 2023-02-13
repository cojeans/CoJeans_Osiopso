import { useState } from "react"
import {
	ProfileBox,
	IntroBox,
	FollowBox,
	ProfileImageBox,
	Intro,
	ProfileBottom
} from "./profile.styles"

import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector";
import { selectUserInfo } from "../../store/user/user.selector"

import { AiFillEdit } from "react-icons/ai";
import Button from "../button/button.component";
import axios from "axios";
import { useEffect } from "react";


const Profile = () => {
	const [followingNum, setFollowingNum] = useState(0)
	const [followerNum, setFollowerNum] = useState(0)
  const Token = useSelector(selectUser);

	const userInfo = useSelector(selectUserInfo)

	const getMyData = () => {
		axios({
			method: "get",
      url: `${process.env.REACT_APP_AXIOS_URL}feed/advice`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getMyData()
	},[])

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
			<ProfileBottom>
					<AiFillEdit />
					<span>eidt</span>
				{/* <Button
					size={'sm'}
				>
					Follow
				</Button> */}
			</ProfileBottom>

		</ProfileBox>
	)
}

export default Profile