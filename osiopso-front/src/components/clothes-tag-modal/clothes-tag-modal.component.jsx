import React from 'react';
import AiModel from '../../../src/model/model.json'
import * as tf from '@tensorflow/tfjs';
import { useState } from "react"

import { selectCloset } from '../../store/closet/closet.selector';
import { selectUser,selectUserInfo } from '../../store/user/user.selector';
import { selectClosetList } from '../../store/closet/closet.selector';
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import { useSelector, useDispatch } from "react-redux"
import { selectorOotdCategory } from "../../store/ootd/ootd.selector"
import { selectOotdCategory } from "../../store/ootd/ootd.reducer"
import { createTag, createAutoTag, upload, checkLocal } from "../../store/clothes/clothes.reducer"
import ProfileCloset from "../profile-closet/profile-closet.component"
import Button from "../button/button.component"

import {
	CategoryModalContainer,
	CategoryBox,
	Title,
	Tag
} from "./clothes-tag-modal.styles"
import {
	selectClothes,
	selectTag,
	localPhoto,
	selectAutoTag
  } from "../../store/clothes/clothes.selector";
import { buffer } from '@tensorflow/tfjs';
import exampleImage from '../../../src/00000001.jpg'

const tags = {
	'Closet' : [],
	'Category' : ["원피스","바지","상의","신발","치마","아우터","모자",],
	'Color' : ["검정", "파랑", "빨강","흰색","베이지","주황","카키"],	// 'Color' : ["검정", "파랑", "빨강","흰색","베이지","주황","카키"],
	'Season': ["봄", "여름", "가을", "겨울"],

	// 'Category' : ["원피스","바지","상의","신발","치마","아우터","모자",],
	// 'Color' : ['검정', '파랑', '빨강'],
	// 'Season': ['봄', '여름', '가을', '겨울'],
}

// const defaultSelect = {
// 	Season: [],
// 	TPO: [tags.TPO[0]],
// 	Category : [],
// }


const ClothesTagModal = ({ closeModal }) => {
	// const closetData  = useSelector(selectCloset)
	// console.log(closetData, 'closet_list')
	const curUser = useSelector(selectUserInfo)// 현재 유저 정보를 가져옵니다. 
	const curClosetList = useSelector(selectClosetList)

	
	const saveAutoTag = useSelector(selectAutoTag)
	// console.log(curClosetList, 'curclosetList')
	console.log(saveAutoTag, 'saveAutoTag')
	// console.log(saveTag, 'saveTag')
	const defaultSelect = {
		// Category : [tags.Category[saveTag.category]],
		// Color: [tags.Color[saveTag.colors]],
		Closet: [],
		Category : [tags.Category[saveAutoTag.category]],
		Color: [tags.Color[saveAutoTag.colors]],
		Season: [],
	}
	let ClosetListName = []
	let ClosetListIdx = []
	for(let i =0; i < curClosetList.length; i ++){
		ClosetListName.push(curClosetList[i].name)
		ClosetListIdx.push(curClosetList[i].id)
	}
	console.log(ClosetListIdx, ClosetListName, 'split')
	tags.Closet = ClosetListName
	console.log("new tag", tags)
	const isAutoTag = useSelector(localPhoto);

	const saveData = useSelector(selectClothes);
	// console.log(autoCategory, autoColor)
	// console.log(saveTag)
	// console.log('this is tag modal')
	// console.log('selector', useSelector(selectorOotdCategory))
	const [selectedTag, setSelectedTag] = useState(defaultSelect)
	const dispatch = useDispatch()

	const submitHandler = () => {
		let newArr = {category:'', closets: [], colors:[], seasons:[]} 

		console.log(curClosetList, 'this is current closetlist')
		selectedTag['Closet'].forEach((el) => {
			const index = tags.Closet.indexOf(el)
			newArr.closets.push(ClosetListIdx[index]) 
			// newArr.closets = ClosetListIdx[index] 
			
		})
		
		
		selectedTag['Category'].forEach((el) => {
			newArr.category = el
		})

		// selectedTag['Category'].forEach((el) => {
		// 	newArr = [...newArr, {
		// 		keyword: "Category",
		// 		type: el
		// 	}]
		// })
		
		selectedTag['Color'].forEach((el) => {
			
			newArr.colors.push(el)
				// colors: el,
				// type: el
			
		})
		
		// selectedTag['Color'].forEach((el) => {
		// 	newArr = [...newArr, {
		// 		keyword: "Color",
		// 		type: el
		// 	}]
		// })

		selectedTag['Season'].forEach((el) => {
			newArr.seasons.push(el)
		})

		// console.log(curClosetList, 'curclosetList')
		console.log(newArr, 'newArr')
		console.log(newArr.colors, 'category')
		dispatch(createTag(newArr))

		// console.log(newArr)
		// dispatch(selectOotdCategory(newArr))
		dispatch(checkLocal(false));

		closeModal()

}
	const testButton = () => {
		console.log(curClosetList, 'test button')
		console.log(curUser, 'this is curUser')
	}

	const selectOneHandler = (key, e) => {
		const selectCate = [...selectedTag[key]]
		const idxTag =selectCate.indexOf(e)
		
		if (idxTag === -1) {
			const addList = [e]
			setSelectedTag({...selectedTag, [key]:addList})
		} else {
			selectCate.splice(idxTag, 1)
			setSelectedTag({...selectedTag, [key]:selectCate})
		}
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

	return (<>

		{<CategoryModalContainer>

			<CategoryBox>
						<Title>옷장</Title>
					{tags.Closet.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectOneHandler('Closet', el) } select={ selectedTag['Closet'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			<CategoryBox>
						<Title>카테고리</Title>
					{tags.Category.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectOneHandler('Category', el) } select={ selectedTag['Category'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			<CategoryBox>
						<Title>색상</Title>
					{tags.Color.map((el, idx) => {
						return <Tag key={idx} onClick={()=> selectHandler('Color', el) } select={ selectedTag['Color'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>
			<CategoryBox>
					<Title>계절</Title>
					{tags.Season.map((el, idx) => {
						return <Tag key={idx} onClick={() => selectHandler('Season', el)} select={ selectedTag['Season'].indexOf(el) !== -1 ? true :false}>{ el }</Tag>
					}) }
			</CategoryBox>

			<Button onClick={submitHandler}>저장</Button>
		</CategoryModalContainer>}</>
	)
}

export default ClothesTagModal