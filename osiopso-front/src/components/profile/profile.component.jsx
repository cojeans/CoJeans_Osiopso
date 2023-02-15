import { useState } from "react"
import {
	ProfileBox,
	IntroBox,
	FollowBox,
	ProfileImageBox,
	Intro,
	Followcon
} from "./profile.styles"

import Button from "../button/button.component";

import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector";
import { selectUserInfo } from "../../store/user/user.selector"

import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";

import Swal from "sweetalert2";

const defaultState = {
	lst: [],
	cnt: 0
}

const Profile = ({ id, showModal }) => {

  const Token = useSelector(selectUser);
	const userInfo = useSelector(selectUserInfo)

	const [userProfile, setUserProfile] = useState('')
	const [following, setFollowing] = useState(defaultState)
	const [followed, setFollowed] = useState(defaultState)
	const [followState, setFollowState] = useState(false)

	
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
			setFollowState(res.data.followed)

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
			setFollowing({lst:res.data.responseData, cnt:res.data.responseData.length})
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
			setFollowed({lst:res.data.responseData, cnt:res.data.responseData.length})
		}).catch((err) => {
			console.log(err)
		})
	}

	// 팔로우 함수입니다.
	const clickFollow = () => {
		// 팔로우한 상태이면
		setFollowState(!followState)
		if (followState) {
			// 언팔로우 상태로 만듭니당..
			setFollowing({ ...following.lst, cnt: following.cnt - 1 })
		} else {
			setFollowing({...following.lst, cnt:following.cnt + 1})	
		}
		
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
				<Followcon>
					<p>팔로잉 {  followed.cnt}</p>
					<p>팔로워 { following.cnt}</p>
				</Followcon>
				{
					id > 0
						?
						followState
							?
							<Button
								size={'sm'}
								onClick={clickFollow}
							>
								Unfollow
							</Button>
							:
							<Button
								size={'sm'}
								onClick={clickFollow} 
							>
								Follow
							</Button>
						:
						<Followcon onClick={showModal}>
							<AiFillEdit color="BCF0E0"/>
							<span>edit</span>
						</Followcon>
				}
			</FollowBox>
		</ProfileBox>
	)
}

export default Profile