import { useState } from "react"
import { Fragment } from "react"

import { useSelector } from "react-redux"
import { selectUser, selectUserInfo } from "../../store/user/user.selector"


import ProfileCloset from "../profile-closet/profile-closet.component"
import MyProfileOotd from "../myprofile-ootd/myprofile-ootd.component"
import MyProfileAdvice from "../myprofile-advice/myprofile-advice.component"

import {
	TabMenue,
	TabBody
} from "./profile-body.styles"
import axios from "axios"
import { useEffect } from "react"

const ProfileBody = ({ id }) => {
	const Token = useSelector(selectUser);
	const userInfo = useSelector(selectUserInfo)

	const [profilePage, setProfilePage] = useState('closet')
	const [userOotd, setUserOotd] = useState([])
	const [userAdvice, setUserAdvice] = useState([])
	
	const getUserData = (urlstr) => {

		axios({
			method: 'get',
			url: urlstr,
			headers: {
        Authorization: `Bearer ${Token.token}`,
      },
		}).then((res) => {
			console.log(res.data)
			setUserOotd(res.data.ootdList)
			setUserAdvice(res.data.adviceList)
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		if (id > 0) {
			getUserData(`${process.env.REACT_APP_AXIOS_URL}user/${id}`)
		} else {
			getUserData(`${process.env.REACT_APP_AXIOS_URL}user/${userInfo.id}`)
		}
		
	},[])

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
							? <MyProfileOotd
								userOotd={ userOotd} />
							: <MyProfileAdvice
								userAdvice={ userAdvice}
							/>
						}
			</TabBody>
		</Fragment>
	)
}

export default ProfileBody