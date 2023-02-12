import { useSelector, useDispatch } from 'react-redux'

import { selectUser } from '../../store/user/user.selector'
import { userInfo } from '../../store/user/user.reducer'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import './home.styles'

import {
	TextToCenter,
	TextToLeft,
	Category,
	HomeOotdImage,
	SelectedTagContainer,
	SelectedTag,
	UserUploadList,
	OotdTagDiv
} from './home.styles'
import { ReactComponent as Fire } from "../../assets/fire.svg"
import { ReactComponent as User2 } from "../../assets/userFashion.svg"
// import DoSwiper from '../../components/swiper/swiper.component'
import { ootd } from '../../store/ootd/ootd.reducer'
import Ootd from '../../components/ootd/ootd.component'
import { useEffect } from 'react'

const Home = () =>{
	const mainList = [
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwg8K7tx_mGdIZoaNVV3_cqYX-ONqq33Mp6pn4MD_YLgAuDxSfm5jIUjPm1boPfXc2f1c&usqp=CAU',
		'https://i.pinimg.com/originals/74/4a/dc/744adc2d4e8aafbd57d050ce07809c40.jpg',
		'https://i.pinimg.com/originals/79/10/ff/7910ff2f204716a5f6f70de0e1c607be.jpg',
	]

	const hunsuImages = [
		'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201412/16/htm_20141216111205082.jpg',
		'https://file.mk.co.kr/meet/neds/2012/06/image_readtop_2012_395541_1340876346672847.jpg',
		'https://image.ytn.co.kr/osen/2016/04/20160404_1459757815_16787500_1.jpg',
	]

	const tags = [
		'고프코어',
		'미니멀',
		'놈코어',
		'스트릿',
	]
	
	const userUpLoadImg = [
		'https://images.unsplash.com/photo-1613869810108-70f9fe0cdef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
		'http://sf2.be.com/wp-content/uploads/sites/2/2017/10/21985324_1952089911726051_8860300227777658880_n-328x410.jpg',
		'https://images.soco.id/877-157520981_886592098801448_5005490940673514409_n.jpg.jpeg',

	]

	const Token = useSelector(selectUser)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	// 로그인 하고 홈에 들어오면 현재 유저 정보를 전역 상태로 저장합니다.
	const getCurrentUser = () => {
    axios({
      method: "get", 
      url: `${process.env.REACT_APP_AXIOS_URL}user`,
      headers: {
          Authorization: `Bearer ${Token.token}`,
      }
    })
      .then((res) => {
				console.log(res.data)
				const payload = {
					id: res.data.id,
					name: res.data.name,
					age: res.data.age,
					gender: res.data.gender,
					imageUrl: res.data.imageUrl,
				}
				dispatch(userInfo(payload))
      })
    .catch((err)=>{
      console.log(err)
    })
	}

	useEffect(() => {
		if (!Token.token) {
			alert('로그인이 안되어 있네요 😢 로그인 후 이용가능한 서비스입니다.')
			navigate('/login')
		} else {
			getCurrentUser()
		}
	},[])

	return (
		<div>
			<TextToLeft>
				{tags.map((el)=>{
					return (
						'#'+el+' '
					)
					 
				})}
			</TextToLeft>

			<HomeOotdImage>
				{mainList.map((el)=>{
					return(
						<img src={el}/>
					)
				})}
			</HomeOotdImage>
			{/* <DoSwiper></DoSwiper> */}
			
			{/* <SelectedTagContainer>
				<SelectedTag><span>#블루종 전체보기</span></SelectedTag>
			</SelectedTagContainer> */}

			<TextToLeft><Fire/><h4>훈수 토론장</h4></TextToLeft>
			<HomeOotdImage>
				{hunsuImages.map((el)=>{
					return (
						<img src={el}/>
					)
				})}
			</HomeOotdImage>


			{/* <Category ><h4>최신순</h4> <h4>인기순</h4> <h4>논란순</h4></Category> */}
			<OotdTagDiv  id="OOTD">
				<Ootd />

			</OotdTagDiv>

		</div>
	)
}

export default Home