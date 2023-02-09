import {
  AddPictureBody,
  PrevUploadImg,
  ExampleContainer,
  EditBox,
  EditContainer,
  ImageInput,
  ImgContainer,
  CategoryContainer,
} from "./clothes-select-box.styles";

import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "../../store/clothes/clothes.reducer";
import { useNavigate } from "react-router";
import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import axios from "axios";

const ClosetSelectBox = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const saveData = useSelector(selectClothes);
  const onNavigateHandler = () => {
    navigate("update/");
  };
  return (
    <>
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
      <span></span>
    </>
  );
};

export default ClosetSelectBox;
