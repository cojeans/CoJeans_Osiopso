import {
	SearchTop,
	SearchInput,
	SearchLabel,
	HashContainer,
	HashBox,
	Circle
} from "./search.styles"

import { BiSearch } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Fragment } from "react";

const Search = () => {
	const Token = useSelector(selectUser);
	const [importantHahs, setImportantHash] = useState([])
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState('')
	const [searchUserData, setSearchUserData] = useState([])
	const [searchAdvice, setSearchAdvice] = useState([])
	const [searchOotd, setSearchOotd] = useState([])

	const getHash = () => {
		setSearchInput()
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}main/preview`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
		}).then((res) => {
			setImportantHash(res.data.responseData)
			console.log(res.data.responseData)
		}).catch((err) => {
			console.log(err)
		})
	}

	const searchContent = (e) => {
		const inputValue = e.target.value
		console.log(inputValue)

		if (!inputValue) {
			setSearchUserData([])
			setSearchAdvice([])
			setSearchOotd([])
		}

		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}feed/ootd/search/data/${inputValue}`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
		}).then((res) => {
			setSearchUserData(res.data.responseData)
			console.log('ootd/data',res.data.responseData)
		}).catch((err) => {
			console.log(err)
		})


		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}feed/advice/search/content/${inputValue}`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
		}).then((res) => {
			setSearchAdvice(res.data.responseData)
			console.log('advice/content',res.data.responseData)
		}).catch((err) => {
			console.log(err)
		})
	

		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}feed/advice/search/subject/${inputValue}`,
			headers: {
				Authorization: `Bearer ${Token.token}`,
			}
		}).then((res) => {
			setSearchOotd(res.data.responseData)
			console.log('ootd/content',res.data.responseData)
		}).catch((err) => {
			console.log(err)
		})
	}
			useEffect(() => {
				getHash()
			}, [])
	


			return (
				<Fragment>
					<SearchTop>
						<BiArrowBack size="30" onClick={() => navigate(-1)} />
						<SearchLabel>
							<BiSearch size="25" />
							<SearchInput type="text" value={searchInput} onChange={searchContent} />
						</SearchLabel>
					</SearchTop>

					<HashContainer>
						{
							importantHahs.map((hash, id) => {
								return <HashBox key={id}>
									<Circle><FaHashtag /></Circle><div className="hash">{hash.keyword}</div></HashBox>
							})
						}
					</HashContainer>
{/* 			
					<div>
						{
							searchUserData.map((data, idx) => {
								return <div key={idx}>{data.userName}</div>
							})
						}
					</div>
					<div>
						{
							searchAdvice.map((data, idx) => {
								// return <img key={ idx} src={data.photo.imageUrl } alt="" />
								return <div>{ data.photo.imageUrl}</div>
							})
						}
					</div>
					<div>
						{
							searchOotd.map((data, idx) => {
								// return <img key={ idx} src={data.photo.imageUrl } alt="" />
								return <div>{ data.photo.imageUrl}</div>
							})
						}
					</div> */}

				</Fragment>
			)
		}
	
	

export default Search