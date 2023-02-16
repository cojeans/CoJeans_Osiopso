import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectorOotdCategory } from "../../store/ootd/ootd.selector"
import { selectOotdCategory } from "../../store/ootd/ootd.reducer"
import {
	CategoryModalContainer,
	CategoryBox,
	Title,
	Tag,
	SaveBox,
} from "./ootd-modal.styles"

import Button from "../button/button.component"

//  (`id`, `keyword`, `type`)
const styleTag =
[['1', '캐주얼', 'S',],
 ['2', '모던/클래식', 'S'],
 ['3', '스포티', 'S'],
 ['4', '페미닌', 'S'],
 ['5', '스트릿', 'S'],
 ['6', '빈티지/레트로', 'S'],
 ['7', '럭셔리', 'S'],
 ['8', '보헤미안', 'S'],
 ['9', '댄디', 'S'],
 ['10', '러블리', 'S'],
 ['11', '미니멀', 'S'],
 ['12', '비즈니스', 'S'],
 ['13', '하이틴', 'S'],
['14', '기타', 'S'],]
const tpoTag =[
 ['15', '데일리', 'T'],
 ['16', '직장', 'T'],
 ['17', '데이트', 'T'],
 ['18', '경조사', 'T'],
 ['19', '여행', 'T'],
 ['20', '홈웨어', 'T'],
 ['21', '파티', 'T'],
 ['22', '운동', 'T'],
 ['23', '특별한날', 'T'],
 ['24', '학교', 'T'],
 ['25', '기타', 'T']
]

const defaultSelect =[]

const OotdModal = ({ closeModal }) => {
	// console.log('selector', useSelector(selectorOotdCategory))
	const [selectedTag, setSelectedTag] = useState(defaultSelect)

	const dispatch = useDispatch()

	const submitHandler = () => {
		let newArr = []

		dispatch(selectOotdCategory(newArr))
		closeModal()

}


	const selectHandler = (arr) => {
		const selectCate = [...selectedTag]
		console.log(selectCate)
		if (selectCate) {
			const idxTag = selectCate.indexOf(arr)

			if (idxTag === -1) {
				const addList = [...selectCate,arr]
				setSelectedTag({...selectedTag, addList})
			} else {
				selectCate.splice(idxTag, 1)
				setSelectedTag({...selectedTag, selectCate})
			}
		} else {
			const addList = [...selectCate,arr]
			setSelectedTag({...selectedTag, addList})
		}
		
	}

	return (
		<CategoryModalContainer>

			<CategoryBox>
					<Title>TPO</Title>
				{tpoTag.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectHandler(el) } select={ selectedTag.indexOf(el) !== -1 ? true :false}>{ el[1] }</Tag>
					}) }
			</CategoryBox>
			<CategoryBox>
						<Title>STYLE</Title>
					{styleTag.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectHandler( el) } select={ selectedTag.indexOf(el) !== -1 ? true :false}>{ el[1] }</Tag>
					}) }
			</CategoryBox>
			
			<SaveBox>
				<Button onClick={submitHandler}>저장</Button>
			</SaveBox>
		</CategoryModalContainer>
	)
}

export default OotdModal



