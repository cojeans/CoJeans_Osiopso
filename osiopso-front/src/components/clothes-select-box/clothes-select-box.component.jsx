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
} from "./clothes-select-box.styles";
import { useNavigate } from 'react-router-dom';
import { resetOotdCategory } from '../../store/ootd/ootd.reducer';

import { selectUser } from '../../store/user/user.selector';
import { selectorOotdCategory } from '../../store/ootd/ootd.selector';
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component"

import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "../../store/clothes/clothes.reducer";
import {
  selectClothes,
  localPhoto,
} from "../../store/clothes/clothes.selector";
import Modal from '../modal/modal.component';

const defaultOotdForm = {
  content: '',
  picture: '',
  tags :[]
}

const ClosetSelectBox = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const saveData = useSelector(selectClothes);
  const onNavigateHandler = () => {
    navigate("update/");
  };
  const [ootdFormData, setOotdFormData] = useState(defaultOotdForm)

  const [modalOpen, setModalOpen] = useState(false);
	const { lockScroll, openScroll } = useBodyScrollLock()

	const showModal = () => {
	window.scrollTo(0, 0);
	setModalOpen(true);
	lockScroll();
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
      <StyleTagButton onClick={showModal} >Add Tag</StyleTagButton>
      {
        modalOpen && <Modal page={ false} setModalOpen={setModalOpen} openScroll={openScroll}ootdFormData={ ootdFormData } setOotdFormData = {setOotdFormData} />
			}
    </>
  );
};

export default ClosetSelectBox;
