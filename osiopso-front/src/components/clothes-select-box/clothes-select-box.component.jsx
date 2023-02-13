import {
  AddPictureBody,
  PrevUploadImg,
  ExampleContainer,
  EditBox,
  EditContainer,
  ImageInput,
  ImgContainer,
  CategoryContainer,
  StyleTagButton,
  LinkContainer,
} from "./clothes-select-box.styles";
import { useNavigate } from "react-router-dom";
import { resetOotdCategory } from "../../store/ootd/ootd.reducer";
import exampleImage from '../../../src/00000001.jpg'
import { selectUser } from "../../store/user/user.selector";
import { selectorOotdCategory } from "../../store/ootd/ootd.selector";
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component";
import { loadGraphModel } from "@tensorflow/tfjs-converter"
import * as tf from '@tensorflow/tfjs';
import React from 'react';
import { createTag, createAutoTag, upload, checkLocal } from "../../store/clothes/clothes.reducer";
import { selectTag, selectAutoTag } from "../../store/clothes/clothes.selector"
import axios from "axios";
import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import Modal from "../modal/modal.component";
import { selectCloset } from '../../store/closet/closet.selector';

import Test from "../test/test.component";
const category = ['원피스','바지','상의','신발','치마','아우터','모자',] 
const color = ['검정', '파랑', '빨강']


const defaultClothesForm = {
  picture: "",
  tags: [],
};

const ClothesSelectBox = () => {
  const closetData  = useSelector(selectCloset)
	// console.log(closetData, 'closet_list')
  const saveData = useSelector(selectClothes);
  const navigate = useNavigate();
  // console.log(saveData)
  // const [isAutoTag, setIsAutoTag] = useState(false); 
  const Token = useSelector(selectUser);
  const isAutoTag = useSelector(localPhoto);
  useEffect(() => {
    FashionAi();
  }, [isAutoTag]);
  const dispatch = useDispatch();
  // const saveData = useSelector(selectClothes);
  const onNavigateHandler = () => {
    navigate("update/");
  };
  const [ootdFormData, setOotdFormData] = useState(defaultClothesForm);
  const [clothesFormData, setClothesFormData] = useState(defaultClothesForm);
  const { picture, tags } = clothesFormData
  const [modalOpen, setModalOpen] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();
  // const [authCategory, setAutoCategory] = useState('');
  // const [authColor, setAutoColor] = useState('');
  const showModal = () => {
    window.scrollTo(0, 0);
    setModalOpen(true);
    lockScroll();
  };
  const saveTag = useSelector(selectAutoTag)
  const finalTag = useSelector(selectTag)
  // const handleAutoTag = () => {
  //   setIsAutoTag(!isAutoTag)
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    // const saveTag2 = useSelector(selectTag)

    console.log('this is tag', finalTag)
    console.log(finalTag[0])
    // const closetData  = useSelector(selectCloset)
    console.log(closetData, 'closetlist')
    // console.log('저장?')
    // console.log(closetField)
    // const payload = { ...closetData.closet }
    // payload.name = closetName
    // console.log(payload)

    // dispatch(createCloset(payload))

    // console.log(Token)
    axios({
      method: "post",
      url: "http://localhost:8080/api/closet/clothes",
      data: {
        // clothesTag: {
        //   category: '',
        //   url: '',
        //   closets:[],
        //   colors:[],
        //   seasons:[],
        //   }
        url : saveData,
        tags: saveTag,
        // closets:
        // saveTag
        // url: saveData,
        // closets: [{id:1}],
        // colors: [{tag.tags.colors}],
        // seasons: [tag.tags.seasons],
        // tags: [tag.tags.seasons],
        // category: '1',
        // closets: [{ id: 1 }],
        // colors: [{ id: 1 }],
        // seasons: [{ id: 1 }],
        // tags: [{ id: 1 }],
      },
      headers: {
        Authorization: `Bearer ${Token.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // dispatch(resetCloset()) // redux 옷장 정보 초기화

    // AlertHandler() // alert창 띄우기

    // getClosetList() // 리스트 갱신
  };
  const FashionAi = async () => {
    console.log(exampleImage)
    // const model = await loadGraphModel(AiModel)
    const model = await loadGraphModel("model/model.json");
    // const modelpath = require('../../../src/model/model.json')
    // const model = await loadGraphModel(modelpath);
    const image = new Image(96, 96);
    // const newimg = buffer.from(saveData, 'base64')
    // const t = tf.node.decdeImage(newimg)
    // console.log(t)
    // const b = atob(saveData)
    // console.log(b)
    // image.src = saveData;
    image.crossOrigin = 'anonymous'
    image.src = saveData;
    tf.browser.fromPixels(image).print();
    let tfTensor = tf.browser.fromPixels(image);
    tfTensor = tfTensor.div(255.0);
    tfTensor = tfTensor.expandDims(0);
    tfTensor = tfTensor.cast("float32");

    const pred = model.predict(tfTensor)[0];
    const temp = Array.from(pred.argMax(1).dataSync());

    const pred2 = model.predict(tfTensor)[1];
    const temp2 = Array.from(pred2.argMax(1).dataSync());
		console.log(category[temp])
		console.log(color[temp2])
    // setAutoCategory(category[temp])
    // setAutoColor(color[temp2])
    const payload = {
      // category: category[temp],
      // colors: color[temp2]
      category: temp,
      colors: temp2
    }
    // console.log(saveData)
    // setClothesFormData(payload)
    console.log(payload, 'payload')
    dispatch(createAutoTag(payload))
    dispatch(checkLocal(true));
  };
  
  // FashionAi()
  return (
    <>
      {/* <div>
    {saveTag}
    <button onClick={FashionAi}> button</button>
  </div> */}

      <EditContainer>
        <EditBox onClick={onNavigateHandler}>
          <span>편집</span>
          <img src={require("../../assets/update.png")} alt="" />
        </EditBox>
      </EditContainer>
      <ImgContainer>
        <PrevUploadImg>
          {saveData && (
            <img
              src={saveData}
              alt="https://pixlr.com/images/index/remove-bg.webp"
            />
          )}
        </PrevUploadImg>
      </ImgContainer>
      <StyleTagButton
        onClick={() => {
          showModal();
          // handleAutoTag();
          FashionAi();
        }}
      >
        Add Tag
      </StyleTagButton>
      {modalOpen && (
        <Modal
          page={4}
          isAutoTag={isAutoTag}
          // handleAutoTag={handleAutoTag}
          // authCategory={authCategory}
          // authColor={authColor}
          setModalOpen={setModalOpen}
          openScroll={openScroll}
          clothesFormData={clothesFormData}
          setClothesFormData={setClothesFormData}
        />
      )}
      {/* <Test isAutoTag={isAutoTag} handleAutoTag={handleAutoTag}/> */}
      <LinkContainer to="/mypage">
        <Button onClick={handleSubmit}>저장</Button>
      </LinkContainer>
    </>
  );
};

export default ClothesSelectBox;
