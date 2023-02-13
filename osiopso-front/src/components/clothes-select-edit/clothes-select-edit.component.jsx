import { Xcontainer, TopContainer, BottomContainer, MarginDiv, OotdInput, OotdImgContainer, StyleTagButton, PrevUploadImg, ImgContainer } from "./clothes-select-edit.styles";
import { useNavigate } from "react-router-dom";
import { resetOotdCategory } from "../../store/ootd/ootd.reducer";
import Cropper from "react-cropper";
import CanvasDraw from "react-canvas-draw";
// import Grid from "@material-ui/core/Grid";

import { selectUser } from "../../store/user/user.selector";
import { selectorOotdCategory } from "../../store/ootd/ootd.selector";
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component";

import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "../../store/clothes/clothes.reducer";
import { selectClothes, localPhoto } from "../../store/clothes/clothes.selector";
import Modal from "../modal/modal.component";
import "cropperjs/dist/cropper.css";

const defaultOotdForm = {
    content: "",
    picture: "",
    tags: [],
};

const ClosetSelectEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const saveData = useSelector(selectClothes);

    const beforeData = saveData;
    const onNavigateHandler = () => {
        navigate("update/");
    };
    const [ootdFormData, setOotdFormData] = useState(defaultOotdForm);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isCrop, setIsCrop] = useState(false);
    const [isErase, setIsErase] = useState(false);
    const [drawWidth, setDrawWidth] = useState(400);
    const [drawHeight, setDrawHeight] = useState(400);
    const [modalOpen, setModalOpen] = useState(false);
    const { lockScroll, openScroll } = useBodyScrollLock();
    const [changeImg, setChangeImg] = useState("");
    const showModal = () => {
        window.scrollTo(0, 0);
        setModalOpen(true);
        lockScroll();
    };
    const reset = () => {
        // setIsCrop(false);
        // setIsErase(false);
        setChangeImg(beforeData);
        setCroppedImage(beforeData);
        dispatch(upload(beforeData));
    };
    const cropperRef = useRef(null);
    // 캡쳐이미지가 리사이즈 될때 실행
    useEffect(() => {
        if (croppedImage) {
            console.log(croppedImage);
            // onSaveAs(croppedImage, 'image-download/png')
            // const ctx = canvasRef.current.getContext("2d")
            // ctx.clearRect(0, 0, 500, 500)

            const image = new Image();
            image.src = croppedImage;
            console.log(image.width);

            setDrawWidth(image.width);
            setDrawHeight(image.Heigth);

            // image.onload = function() {
            //   ctx.drawImage(image, 0, 0);
            // };
        }
    }, [croppedImage]);
    const eraseCrop = () => {
        console.log(changeImg);
        setIsErase(true);
        // setIsCrop(false);
    };
    const makeCrop = () => {
        setIsCrop(true);
        // setIsErase(false);
    };
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
        // dispatch(upload(cropper.getCroppedCanvas().toDataURL()));
    };
    const completeCut = () => {
        setIsCrop(false);
        setIsErase(false);
        setChangeImg(croppedImage);
    };
    const completeErase = () => {
        setIsCrop(false);
        setIsErase(false);
        // dispatch(upload(croppedImage))
    };
    const canvasRef = useRef(null);
    // 캡쳐이미지가 리사이즈 될때 실행
    // const erase_image = ReactDOM.createRoot(
    //   document.getElementById('erase_image')
    // );
    const onSave = () => {
        console.log("테스트 : " + croppedImage);
        dispatch(upload(croppedImage));
        navigate(-1);
    };
    return (
        <>
            <div>안녕</div>
            <button onClick={reset}>초기화</button>
            {!isCrop && <button onClick={makeCrop}>자르기</button>}
            {isCrop && <button onClick={completeCut}>자르기 완료</button>}
            {/* <button onClick={eraseCrop}>지우기</button>
    {isErase && <button onClick={completeErase}>지우기 완료</button>} */}

            {/* <StyleTagButton onClick={showModal} >Add Tag</StyleTagButton> */}

            <ImgContainer>
                <PrevUploadImg>
                    {/* {saveData && (
            <img
              src={saveData}
              alt="https://pixlr.com/images/index/remove-bg.webp"
            />
          )} */}
                    <img src={croppedImage} alt="" />
                    {<button onClick={onSave}>저장</button>}

                    {/* <img src={saveData} alt="" /> */}
                    {/* <img src={changeImg} alt="" /> */}
                    {/* {croppedImage ? (<img src={croppedImage} />):(<img src={saveData} />)} */}
                    {/* <img src={croppedImage} /> */}
                    {isCrop && <Cropper src={changeImg} crop={onCrop} ref={cropperRef} />}
                </PrevUploadImg>
                {/* <ExampleBox onClick={callAxios}>
          <img src={require("../../assets/background.jpg")} alt="" />
          <span>이미지 자르기</span>
        </ExampleBox> */}
                {/* {canvasRef && <img src={canvasRef} alt="" />} */}

                {isErase && (
                    <CanvasDraw imgSrc={changeImg} brushColor={"white"} hideGridX={true} hideGridY={true} hideInterface={true} ref={canvasRef} canvasWidth={drawWidth} canvasHeight={drawHeight} />
                )}
            </ImgContainer>

            {/* {
        modalOpen && <Modal page={ false } setModalOpen={setModalOpen} openScroll={openScroll}ootdFormData={ ootdFormData } setOotdFormData = {setOotdFormData} />
			} */}
            {/* <CanvasDraw  
        imgSrc={croppedImage}
        brushColor={'white'}
        hideGridX={true}
        hideGridY={true}
        hideInterface={true}
        ref={canvasRef}
        canvasWidth={drawWidth}
        canvasHeight={drawHeight}
      /> */}
            {/* <button
        onClick={() => {
          canvasRef.current.undo();
        }}
        >
        UNDO
        </button>
        <button
        onClick={() => {
          canvasRef.current.clear();
        }}
        >
        CLEAR
      </button> */}
            {/* <ImgContainer>
  <img src={beforeData} alt="" />
      </ImgContainer> */}
        </>
    );
};

export default ClosetSelectEdit;
