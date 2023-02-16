import { Xcontainer, TopContainer, BottomContainer, MarginDiv, OotdInput, OotdImgContainer, StyleTagButton, PrevUploadImg, ImgContainer, Div, ButtonsContainer, SaveButtonBox } from "./clothes-select-edit.styles";
import { useNavigate } from "react-router-dom";
import { resetOotdCategory } from "../../store/ootd/ootd.reducer";
import Cropper from "react-cropper";
import CanvasDraw from "react-canvas-draw";
import html2canvas from 'html2canvas';
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

const ClothesSelectEdit = () => {
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
    const [drawing, setDrawing] = useState();
    const { lockScroll, openScroll } = useBodyScrollLock();
    const [changeImg, setChangeImg] = useState("");
    const [afterCrop, setAfterCrop ] = useState(false) 
    const [afterErase, setAfterErase ] = useState(false) 
    const showModal = () => {
        window.scrollTo(0, 0);
        setModalOpen(true);
        lockScroll();
    };


    const onCapture = () => {
		console.log('onCapture');
		html2canvas(document.getElementById('div')).then(canvas=>{
            setChangeImg(canvas.toDataURL('image/png'))
            // console.log(canvas.toDataURL('image/png'))
			// onSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
		});

		const onSaveAs =(uri, filename)=> {
			console.log('onSaveAs');
			var link = document.createElement('a');
			document.body.appendChild(link);
			link.href = uri;
			link.download = filename;
			link.click();
			document.body.removeChild(link);
		};
	
	};


    const reset = () => {
        // setIsCrop(false);
        // setIsErase(false);
        setChangeImg(beforeData);
        setCroppedImage(beforeData);
        dispatch(upload(beforeData));
    };
    const cropperRef = useRef(null);
    const canvasRef = useRef(null);
    // 캡쳐이미지가 리사이즈 될때 실행
    useEffect(() => {
        setChangeImg(beforeData);
        setCroppedImage(beforeData);
        dispatch(upload(beforeData))
    }, [])
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

    // useEffect(() => {
    //     if(isCrop) {
    //         makeCrop()
    //     }
    // }, [isCrop])

    // useEffect(() => {
    //     if(isErase) {
    //         eraseCrop()
    //     }
    // }, [isErase])
    
    const eraseCrop = () => {
        // console.log(changeImg);
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
        // setIsErase(false);
        setChangeImg(croppedImage);
        setCroppedImage(beforeData);
        // setAfterCrop(true);
    };


    ////지우기 관련
    const completeErase = () => {
        // setIsCrop(false);
        setIsErase(false)
        html2canvas(document.getElementById('div')).then(canvas=>{
            setChangeImg(canvas.toDataURL('image/png'))
            // console.log(canvas.toDataURL('image/png'))
			// onSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
		});
        // const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        // setDrawing(base64);
        
        // dispatch(upload(croppedImage))
    };
    //////


    // const canvas = document.getElementById('canvas')
    // const canvasValue = canvas.toDataURL()
    
    
    // const printCanvas = () => {

    //     const examplecanvas = document.getElementById('canvas')
    //     console.log(examplecanvas)
    // }
    const handleExport = () => {

        // setCroppedImage(base64);
        // setIsCrop(false);
        // setIsErase(false);
        // setChangeImg(base64);
      };
    // 캡쳐이미지가 리사이즈 될때 실행
    // const erase_image = ReactDOM.createRoot(
    //   document.getElementById('erase_image')
    // );
    const onSave = () => {

        dispatch(upload(changeImg));
        navigate(-1);
    };
    return (
        <>
        {/* <button onClick={onCapture}>capture</button> */}
            <ButtonsContainer>
            <Button 
            type='submit'
            size={'md'}
            variant={'success'}
            onClick={reset}>초기화</Button>
            {!isCrop && <Button 
            type='submit'
            size={'md'}
            variant={'success'}
            onClick={makeCrop}>자르기</Button>}
            {isCrop && <Button 
            type='submit'
            size={'md'}
            variant={'success'}
            onClick={completeCut}>자르기 완료</Button>}
            {!isErase && <Button 
            type='submit'
            size={'md'}
            variant={'success'}
            onClick={eraseCrop}>지우기</Button>}
            {isErase && <Button 
            type='submit'
            size={'md'}
            variant={'success'}
            onClick={completeErase}>지우기 완료</Button>}
            </ButtonsContainer>

            <SaveButtonBox>
                {<Button
                type='submit'
                size={'md'}
                // variant={'warning'} 
                onClick={onSave}>저장</Button>}
            </SaveButtonBox>

            {/* <StyleTagButton onClick={showModal} >Add Tag</StyleTagButton> */}

            <ImgContainer>
                <PrevUploadImg>
                    {/* {saveData && (
            <img
              src={saveData}
              alt="https://pixlr.com/images/index/remove-bg.webp"
            />
          )} */}
                    {/* {canvasValue && <img src = {canvasValue} alt=''/>} */}
                    {/* {afterCrop && <img src={croppedImage} alt={saveData} />} */}
                   

                    {/* <img src={saveData} alt="" /> */}
                    <Div>
                        <img src={changeImg} alt="" />
                        
                        </Div>
                    {/* {croppedImage ? (<img src={croppedImage} />):(<img src={saveData} />)} */}
                    {/* <img src={croppedImage} /> */}
                    {isCrop && <Div>
                        <Cropper src={changeImg} crop={onCrop} ref={cropperRef} />
                        </Div>}
                        
                </PrevUploadImg>
                {/* <ExampleBox onClick={callAxios}>
          <img src={require("../../assets/background.jpg")} alt="" />
          <span>이미지 자르기</span>
        </ExampleBox> */}
                {/* {canvasRef && <img src={canvasRef} alt="" />} */}

                {/* {isErase && (
                    <CanvasDraw imgSrc={changeImg} brushColor={"white"} hideGridX={true} hideGridY={true} hideInterface={true} ref={canvasRef} canvasWidth={drawWidth} canvasHeight={drawHeight} />
                )} */}
            </ImgContainer>

            {/* {
        modalOpen && <Modal page={ false } setModalOpen={setModalOpen} openScroll={openScroll}ootdFormData={ ootdFormData } setOotdFormData = {setOotdFormData} />
			} */}
        {/* <button
        type="button"
        style={{ backgroundColor: "#0A71F1", color: "white" }}
        onClick={handleExport}
      >
        지우기 완료
      </button> */}
      {/* <img src={drawing} alt="exported drawing" /> */}
        {/* {isErase && 
                <CanvasDraw 
        id="div"
        imgSrc={changeImg}        
        brushColor={'white'}
        hideGridX={true}
        hideGridY={true}
        hideInterface={true}
        ref={canvasRef}
        canvasWidth={drawWidth}
        canvasHeight={drawHeight}
        
        />
        } */}
        {isErase && (<Div id="div">
                <CanvasDraw 
        
        imgSrc={changeImg}        
        brushColor={'white'}
        hideGridX={true}
        hideGridY={true}
        hideInterface={true}
        ref={canvasRef}
        canvasWidth={drawWidth}
        canvasHeight={drawHeight}
        
        />
        </Div>)}

            {isErase && (<button
        onClick={() => {
          canvasRef.current.undo();
        }}
        >
        UNDO
        </button>)}
        
        
        {isErase && (<button
        onClick={() => {
          canvasRef.current.clear();
        }}
        >
        CLEAR
      </button>)}

        </>
    );
};

export default ClothesSelectEdit;
