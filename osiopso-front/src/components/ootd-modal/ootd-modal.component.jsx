import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectorOotdCategory } from "../../store/ootd/ootd.selector"
import { selectOotdCategory } from "../../store/ootd/ootd.reducer"
import {
	CategoryModalContainer,
	CategoryBox,
	Title,
	Tag
} from "./ootd-modal.styles"

const tags = {
	'Season': ['봄', '여름', '가을', '겨울'],
	'TPO': ['데일리','직장','데이트','경조사','여행','홈웨이','파티','운동','학교'],
	'Category' : ['상의','하의','바지','치마','신발','아우터','모자',]
}

const defaultSelect = {
	Season: [],
	TPO: [],
	Category : [],
}


const OotdModal = ({ closeModal }) => {
	// console.log('selector', useSelector(selectorOotdCategory))
	const [selectedTag, setSelectedTag] = useState(defaultSelect)

	const dispatch = useDispatch()

	const submitHandler = () => {
		let newArr = []
		selectedTag['Season'].forEach((el) => {
			newArr = [...newArr, {
				keyword: "Season",
				type: el
			}]
		})
		selectedTag['TPO'].forEach((el) => {
			newArr = [...newArr, {
				keyword: "TPO",
				type: el
			}]
		})
		selectedTag['Category'].forEach((el) => {
			newArr = [...newArr, {
				keyword: "Category",
				type: el
			}]
		})

		console.log(newArr)

		dispatch(selectOotdCategory(newArr))
		closeModal()

}


	const selectHandler = (key, e) => {
		const selectCate = [...selectedTag[key]]
		const idxTag =selectCate.indexOf(e)
		
		if (idxTag === -1) {
			const addList = [...selectCate, e]
			setSelectedTag({...selectedTag, [key]:addList})
		} else {
			selectCate.splice(idxTag, 1)
			setSelectedTag({...selectedTag, [key]:selectCate})
		}
	}

	return (
		<CategoryModalContainer>
			<CategoryBox>
					<Title>계절</Title>
					{tags.Season.map((el, idx) => {
						return <Tag key={idx} onClick={() => selectHandler('Season', el)} select={ selectedTag['Season'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			<CategoryBox>
					<Title>TPO</Title>
					{tags.TPO.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectHandler('TPO', el) } select={ selectedTag['TPO'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			<CategoryBox>
						<Title>카테고리</Title>
					{tags.Category.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectHandler('Category', el) } select={ selectedTag['Category'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			<button onClick={submitHandler}>저장</button>
		</CategoryModalContainer>
	)
}

export default OotdModal