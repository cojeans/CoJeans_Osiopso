import { useSelector, useDispatch } from 'react-redux'

import { selectUser } from '../../store/user/user.selector'
import { userInfo } from '../../store/user/user.reducer'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import './home.styles'

// slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
//

import {
	TextToLeft,
	HomeOotdImage,
	OotdTagDiv,
	TagBox
} from './home.styles'
import { ReactComponent as Fire } from "../../assets/fire.svg"
import { ReactComponent as User2 } from "../../assets/userFashion.svg"
// import DoSwiper from '../../components/swiper/swiper.component'
import { ootd } from '../../store/ootd/ootd.reducer'

import { MdLocalFireDepartment } from "react-icons/md";
import Ootd from '../../components/ootd/ootd.component'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
		//slick
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,	
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true
	};
	//slick
	const [tagData, setTagData] = useState([])

	const [hotOotd, setHotOotd] = useState([])

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
			.catch((err) => {
				console.log(err)
			})
	}

	const getFamousTags = () => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}main/preview`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
		})
			.then((res) => {
				console.log(res,'❤')
				setTagData(res.data.responseData)


			})
			.catch((er) => {
				console.log(er)
			})
	}

	useEffect(() => {
		if (!Token.token) {
			alert('로그인이 안되어 있네요 😢 로그인 후 이용가능한 서비스입니다.')
			navigate('/login')
		} else {
			getCurrentUser()
			getFamousTags()
			hotBurning()
		}
	}, [])

	const goToTag = (e) => {
		console.log(e)
		
	}
	// 뜨거운감자
	const hotBurning = () => {
			axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}main/burning`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
			})
				.then((res) => {
					const result = res.data.responseData
					// console.log(result,'⭐') 
					setHotOotd(result)

				}).catch((err) => {
				console.log(err)
			})
	}

  const goToAdviceDetail = (id) => {
    console.log(id);
    navigate("advice/detail/" + id, {
      state: {
        id: id,
      },
    });
  };

	return (
		<div>

			<TextToLeft>
				
				{
				tagData.map((tag, idx)=>{
					return (
						<TagBox key={idx} onClick={() => goToTag(tag.keyword)}>
							{tag.keyword.charAt(0) === '#'
								? tag.keyword 
								: '#' + tag.keyword 
						}
						</TagBox>
					)	
				})
				}
			</TextToLeft>

			<HomeOotdImage>
				<div className='hotTitle'>
					<MdLocalFireDepartment color='red' size='30' />
					<div>Hot Potato</div>
				</div>
				<Slider	 {...settings}>
				{
					hotOotd.map((hot)=>{
						return (
							<div className='imgBox'>
								<img src={hot.photo.imageUrl} alt="" onClick={()=>goToAdviceDetail(hot.id)}/>
							</div>
						)
					})
				}
				</Slider>
			</HomeOotdImage>
			{/* <DoSwiper></DoSwiper> */}
			
			{/* <SelectedTagContainer>
				<SelectedTag><span>#블루종 전체보기</span></SelectedTag>
			</SelectedTagContainer> */}

			{/* <TextToLeft><Fire/>훈수 토론장</TextToLeft>
			<HomeOotdImage>
				
			</HomeOotdImage> */}


			{/* <Category ><h4>최신순</h4> <h4>인기순</h4> <h4>논란순</h4></Category> */}
			<OotdTagDiv  id="OOTD">
				<Ootd />

			</OotdTagDiv>

		</div>
	)
}

export default Home