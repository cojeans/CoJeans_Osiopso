import React from 'react';
import AiModel from '../../../src/model/model.json'
import * as tf from '@tensorflow/tfjs';
import { useState } from "react"
import { loadGraphModel } from "@tensorflow/tfjs-converter"
import { useSelector, useDispatch } from "react-redux"
import { selectorOotdCategory } from "../../store/ootd/ootd.selector"
import { selectOotdCategory } from "../../store/ootd/ootd.reducer"
import {
	CategoryModalContainer,
	CategoryBox,
	Title,
	Tag
} from "./clothes-tag-modal.styles"
import {
	selectClothes,

  } from "../../store/clothes/clothes.selector";
import { buffer } from '@tensorflow/tfjs';
import exampleImage from '../../../src/00000001.jpg'
const tags = {
	'Category' : ['원피스','바지','상의','신발','치마','아우터','모자',],
	'Color' : ['검정', '파랑', '빨강'],
	'Season': ['봄', '여름', '가을', '겨울'],
	'TPO': ['데일리','직장','데이트','경조사','여행','홈웨이','파티','운동','학교'],
}

const defaultSelect = {
	Season: [],
	TPO: ['데일리'],
	Category : ['바지'],
}


const ClothesTagModal = ({ closeModal }) => {
	const saveData = useSelector(selectClothes);

	// console.log('selector', useSelector(selectorOotdCategory))
	const [selectedTag, setSelectedTag] = useState(defaultSelect)

	const dispatch = useDispatch()
	// const FashionAi = async() => {
	// 	// const model = await loadGraphModel(AiModel)
	// 	const model = await loadGraphModel('./model/model.json')
	// 	const image = new Image(96, 96)
	// 	// const newimg = buffer.from(saveData, 'base64')
	// 	// const t = tf.node.decdeImage(newimg)
	// 	// console.log(t)
	// 	// const b = atob(saveData)
	// 	// console.log(b)
	// 	// image.src = saveData;
	// 	image.src = exampleImage;
	// 	tf.browser.fromPixels(image).print();
	// 	let tfTensor = tf.browser.fromPixels(image)
	// 	tfTensor = tfTensor.div(255.0);
	// 	tfTensor = tfTensor.expandDims(0);
	// 	tfTensor = tfTensor.cast("float32");
		
	// 	const pred = model.predict(tfTensor)[0];
	// 	const temp = Array.from(pred.argMax(1).dataSync())
		
	// 	const pred2 = model.predict(tfTensor)[1];
	// 	const temp2 = Array.from(pred2.argMax(1).dataSync())
	// 	console.log(temp, temp2)




	// } 
	// FashionAi()
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

export default ClothesTagModal