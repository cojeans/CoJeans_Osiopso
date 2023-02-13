import { Fragment, useState } from "react"
import {
	ProfileBox,
	IntroBox,
	FollowBox,
	ProfileImageBox,
	Intro,
	ProfileBottom
} from "./profile.styles"

import Button from "../button/button.component";

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
const Profile = ({ id }) => {

  const Token = useSelector(selectUser);
	const userInfo = useSelector(selectUserInfo)

	const [userProfile, setUserProfile] = useState('')
	const [follow, setFollow] = useState(defaultFollowData)
	
	const getMyProfileData = (urlString) => {

		axios({
			method: "get",	
  		url: urlString,
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log('userBio')
			console.log(res.data)
			setUserProfile(res.data)

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
 			console.log(res.data.responseData,'😊팔로잉입니다.')
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
			console.log(res.data.responseData,'🤣팔로우입니다.')
			setFollow({...follow, followed:res.data.responseData})
		}).catch((err) => {
			console.log(err)
		})
	}

	// 팔로우 함수입니다.
	const clickFollow = () => {
		axios({
			method: "post",	
  		url: `${process.env.REACT_APP_AXIOS_URL}user/follow?followingId=${id}`,
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
		if (id > 0) {
			getMyProfileData(`${process.env.REACT_APP_AXIOS_URL}user/${id}`)
			console.log(true)
			getFollowings(id)
			getFollower(id)
		} else {
			getMyProfileData(`${process.env.REACT_APP_AXIOS_URL}user`)
			getFollowings(userInfo.id)
			getFollower(userInfo.id)
			console.log(false)
	}

	},[])

	return (
		<ProfileBox>
			<h2>{userProfile.name}</h2>
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
				{
					id > 0
						?
						userProfile.followed
							?
							<Button
							size={'sm'}
							onClick={ () => {clickFollow(id)}}
							>
								Unfollow
							</Button>
							:
							<Button
							size={'sm'}
							onClick={ () => {clickFollow(id)}}
							>
								Follow
							</Button>
						:
						<Fragment>
							<AiFillEdit color="BCF0E0"/>
							<span>edit</span>
						</Fragment>
				}
			</ProfileBottom>

		</ProfileBox>
	)
}

export default Profile