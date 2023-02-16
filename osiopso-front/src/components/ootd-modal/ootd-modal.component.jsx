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
const defaultSelect = {
	style: [],
	tpo: [],
}
const tags = {
	'style' : ["캐주얼","모던/클래식","스포티","페미닌","스트릿","빈티지/레트로","럭셔리","보헤미안",
"댄디","러블리","미니멀","비즈니스","하이틴","기타"],
	'tpo' : ['데일리', '직장', '데이트','경조사', '여행', '홈웨어','파티','운동','특별한날','학교','기타'],
}

const OotdModal = ({ closeModal }) => {
	const [selectedTag, setSelectedTag] = useState(defaultSelect)

	const dispatch = useDispatch()

	const submitHandler = () => {
		let newArr = []
		selectedTag['style'].forEach((el) => {
			newArr = [...newArr, {
				keyword: "style",
				type: el
			}]
		})
		selectedTag['tpo'].forEach((el) => {
			newArr = [...newArr, {
				keyword: "tpo",
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
					<Title>TPO</Title>
					{tags.tpo.map((el, idx) => {
						return <Tag key={idx} onClick={() => selectHandler('tpo', el)} select={ selectedTag['tpo'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }

			</CategoryBox>
			<CategoryBox>
						<Title>STYLE</Title>
						{tags.style.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectHandler('style', el) } select={ selectedTag['style'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			
			<SaveBox>
				<Button onClick={submitHandler}>저장</Button>
			</SaveBox>
		</CategoryModalContainer>
	)
}

export default OotdModal

