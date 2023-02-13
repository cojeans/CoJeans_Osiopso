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
import axios from "axios";
import { useEffect } from "react";

const defaultFollowData = {
	following: [],
	followed : [],
}
const Profile = () => {

  const Token = useSelector(selectUser);
	const userInfo = useSelector(selectUserInfo)

	const [userProfile, setUserProfile] = useState('')
	const [follow, setFollow] = useState(defaultFollowData)

	const getMyProfileData = () => {
		axios({
			method: "get",	
  		url: `${process.env.REACT_APP_AXIOS_URL}user`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log('userBio')
			console.log(res.data)
			setUserProfile(res.data)
			getFollowings(res.data.id)
			getFollower(res.data.id)
		}).catch((err) => {
			console.log(err)
		})
	}

	const getFollowings = (id) => {
		axios({
			method: "post",	
  		url: `${process.env.REACT_APP_AXIOS_URL}user/followers?followingId=${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log('following')
			console.log(res.data.responseData)
			setFollow({...follow, following:res.data.responseData})
		}).catch((err) => {
			console.log(err)
		})
	}

		const getFollower = (id) => {
		axios({
			method: "post",	
  		url: `${process.env.REACT_APP_AXIOS_URL}user/followings?followingId=${id}`,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log('follower')
			console.log(res.data.responseData)
			setFollow({...follow, followed:res.data.responseData})
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getMyProfileData()

	},[])

	return (
		<ProfileBox>
			<h2>{userInfo.name}</h2>
			<IntroBox>
				<ProfileImageBox>
					<img src={  ! userProfile.imageUrl? require('../../assets/defaultuser.png'):userProfile.imageUrl} alt="" />
				</ProfileImageBox>
				<Intro>
					{ !userProfile.bio?" 자기소개가 없습니다.😢":userProfile.bio}
				</Intro>
			</IntroBox>
			
			<FollowBox>
				<p>팔로잉 { follow.following.length }</p>
				<p>팔로워 { follow.followed.length }</p>
			</FollowBox>
			<ProfileBottom>
					<AiFillEdit color="BCF0E0"/>
					<span>edit</span>
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