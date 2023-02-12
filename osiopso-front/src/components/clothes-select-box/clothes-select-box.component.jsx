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

import axios from "axios";
import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "../../store/clothes/clothes.reducer";
import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import Modal from "../modal/modal.component";
import Test from "../test/test.component";
const category = ['dress', 'jeans', 'shirt', 'shoes'] 
const color = ['black', 'blue', 'red']
const defaultOotdForm = {
  content: "",
  picture: "",
  tags: [],
};

const ClothesSelectBox = () => {
  const navigate = useNavigate();
  const Token = useSelector(selectUser);
  const saveData = useSelector(selectClothes);
  // console.log(saveData)

  const dispatch = useDispatch();
  // const saveData = useSelector(selectClothes);
  const onNavigateHandler = () => {
    navigate("update/");
  };
  const [ootdFormData, setOotdFormData] = useState(defaultOotdForm);
  const [isAutoTag, setIsAutoTag] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const showModal = () => {
    window.scrollTo(0, 0);
    setModalOpen(true);
    lockScroll();
  };
  const handleAutoTag = () => {
    setIsAutoTag(!isAutoTag)
  }
  const handleSubmit = () => {
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
        category: 1,
        url: saveData,
        closets: [{ id: 1 }],
        colors: [{ id: 1 }],
        seasons: [{ id: 1 }],
        tags: [{ id: 1 }],
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
    // const model = await loadGraphModel("model/model.json");
    const modelpath = require('../../../src/model/model.json')
    const model = await loadGraphModel(modelpath);
    const image = new Image(96, 96);
    // const newimg = buffer.from(saveData, 'base64')
    // const t = tf.node.decdeImage(newimg)
    // console.log(t)
    // const b = atob(saveData)
    // console.log(b)
    // image.src = saveData;
    image.crossOrigin = 'anonymous'
    image.src = exampleImage;
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
  };
  // FashionAi()
  return (
    <>
    <div>
    <button onClick={FashionAi}> button</button>
  </div>

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
          handleAutoTag();
        }}
      >
        Add Tag
      </StyleTagButton>
      {modalOpen && (
        <Modal
          page={4}
          setModalOpen={setModalOpen}
          openScroll={openScroll}
          ootdFormData={ootdFormData}
          setOotdFormData={setOotdFormData}
        />
      )}
      <Test isAutoTag={isAutoTag} handleAutoTag={handleAutoTag}/>
      <LinkContainer to="/mypage">
        <Button onClick={handleSubmit}>저장</Button>
      </LinkContainer>
    </>
  );
};

export default ClothesSelectBox;
