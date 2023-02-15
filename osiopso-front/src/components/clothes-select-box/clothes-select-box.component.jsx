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
import { userInfo } from "../../store/user/user.reducer";
import { createCloset } from "../../store/closet/closet.reducer"
import { uploadClosetList } from "../../store/closet/closet.reducer";
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
import { selectClosetList } from '../../store/closet/closet.selector';

import Modal from "../modal/modal.component";
import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import { selectCloset } from '../../store/closet/closet.selector';

import Test from "../test/test.component";
import { ref as fref, getStorage, uploadString } from "firebase/storage";
const category = ['원피스','바지','상의','신발','치마','아우터','모자',] 
const color = ['검정', '파랑', '빨강']


const defaultClothesForm = {
  picture: "",
  tags: [],
};


const ClothesSelectBox = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [closetList, setClosetList] = useState([])
    
    const Token = useSelector(selectUser);
    const isAutoTag = useSelector(localPhoto);
    useEffect(() => {
      FashionAi();
    }, [isAutoTag]);

    useEffect(() => {
      getClosetList();
    }, []);
    
    // useEffect(() => {
    //   if(closetList) {
    //     console.log(closetList, 'this is closetList')
    //     dispatch(uploadClosetList(closetList))
    //   }

    // }, [closetList]);



    const saveData = useSelector(selectClothes);
    // console.log(saveData);


    // const saveData = useSelector(selectClothes);
    const onNavigateHandler = () => {
      navigate("update/");
    };
    
    const [ootdFormData, setOotdFormData] = useState(defaultClothesForm);
    // const [closetList, setClosetList] = useState([])
    const [clothesFormData, setClothesFormData] = useState(defaultClothesForm);
    const { picture, tags } = clothesFormData
    const [modalOpen, setModalOpen] = useState(false);
    const { lockScroll, openScroll } = useBodyScrollLock();
    // const curClosetList = useSelector(selectClosetList)
    const saveTag = useSelector(selectAutoTag)
    const finalTag = useSelector(selectTag)
    console.log(finalTag, 'this is finalTag')
    const showModal = () => {
        window.scrollTo(0, 0);
        setModalOpen(true);
        lockScroll();
    };

    const getClosetList = () => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}closet/mylist`,
        headers: {
          Authorization: `Bearer ${Token.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.reverse(), 'axios output')
        // setClosetList(res.data.reverse())
        dispatch(uploadClosetList(res.data.reverse()))
      })
      .catch((err) => {
        console.log(err);
      });
      
    }
    // getClosetList()

    const handleSubmit = () => {
        // https://firebase.google.com/docs/storage/web/upload-files?hl=ko#web-version-9_3
        // fref.putString(saveData, "base64").then(function (snapshot) {
        //     console.log("base64 문자열을 업로드했습니다!");

        const storage = getStorage();
        const storageRef = fref(storage, "some-child");
        // // Base64 formatted string
        // uploadString(storageRef, saveData, "base64").then((snapshot) => {
        //     console.log("Uploaded a base64 string!");
        // });

        // // Base64url formatted string
        // uploadString(storageRef, saveData, "base64url").then((snapshot) => {
        //     console.log("Uploaded a base64url string!");
        // });

        // Data URL string
        console.log(finalTag.category)
        console.log(finalTag.colors)
        console.log(finalTag.seasons)

        uploadString(storageRef, saveData, "data_url").then((snapshot) => {
            console.log("Uploaded a data_url string!");
        });

        // storage.ref.putString(saveData, "base64").then(function (snapshot) {
        //     console.log("Uploaded a data_url string!");
        // });

        // const response = storage.ref().putString(saveData, "base64")

        // storage
        //     .ref()
        //     .putString(saveData, "base64")
        //     .then(function (snapshot) {
        //         console.log("육사업로드");
        //     });

        axios({
            method: "post",
            url: `${process.env.REACT_APP_AXIOS_URL}closet/clothes`,
            data: {
              finalTag
                // category: finalTag.category,
                // imageUrl: saveData,
                // closets: [{id:2}],
                // colors: finalTag.colors,
                // seasons: finalTag.seasons,
        
            },
            headers: {
                Authorization: `Bearer ${Token.token}`,
            },
        })
            .then((res) => {
              console.log(res)
                console.log("clothes-select-box에서 post axios 요청");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

          };
            const FashionAi = async () => {
              // console.log(exampleImage)
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
        // dispatch(upload("")); // redux 옷장 정보 초기화

        // AlertHandler() // alert창 띄우기

        // getClosetList() // 리스트 갱신
  
    return (
      <>
      {/* <div>
    {saveTag}
    <button onClick={FashionAi}> button</button>
  </div> */}
      <div>123</div>

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
