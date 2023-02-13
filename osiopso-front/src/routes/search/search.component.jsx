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
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_AXIOS_URL}feed/advice/search/content/${inputValue}`,
			headers: {
					Authorization: `Bearer ${Token.token}`,
			}
		}).then((res) => {
			console.log(res)
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
				<BiArrowBack size="30" onClick={()=>navigate(-1)}/>
				<SearchLabel>
					<BiSearch size="25"/>
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

		</Fragment>
	)
}

export default Search