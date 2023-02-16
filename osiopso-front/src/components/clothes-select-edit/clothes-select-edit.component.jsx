import { Xcontainer, TopContainer, BottomContainer, MarginDiv, OotdInput, OotdImgContainer, StyleTagButton, PrevUploadImg, ImgContainer, Div, ButtonsContainer, SaveButtonBox } from "./clothes-select-edit.styles";
import { useNavigate } from "react-router-dom";
import { resetOotdCategory } from "../../store/ootd/ootd.reducer";
import Cropper from "react-cropper";
import CanvasDraw from "react-canvas-draw";
import html2canvas from 'html2canvas';
// import Grid from "@material-ui/core/Grid";

// import { selectUser } from "../../store/user/user.selector";
// import { selectorOotdCategory } from "../../store/ootd/ootd.selector";
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


            const image = new Image();
            image.src = croppedImage;
            console.log(image.width);


            setDrawWidth(250);
            setDrawHeight(250);


        }
    }, [croppedImage]);


    
    const eraseCrop = () => {

        setIsErase(true);

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

		});

    };




    const onSave = () => {

        dispatch(upload(changeImg));
        navigate(-1);
    };
    return (
        <>

            <ButtonsContainer>
            <Button 
            type='submit'
            size={'md'}
            variant={'success'}
            color='#7272ba'
            onClick={reset}>초기화</Button>
            {!isCrop &&  <Button 
            type='submit'
            size={'md'}
            color='#7272ba'
            variant={'success'}
            onClick={makeCrop}>자르기</Button>}
            {isCrop && <Button 
            type='submit'
            size={'md'}
            color='#7272ba'
            variant={'success'}
            onClick={completeCut}>자르기 완료</Button>}
            {!isErase &&  <Button 
            type='submit'
            size={'md'}
            color='#7272ba'
            variant={'success'}
            onClick={eraseCrop}>지우기</Button>}
            {isErase && <Button 
            type='submit'
            size={'md'}
            color='#7272ba'
            variant={'success'}
            onClick={completeErase}>지우기 완료</Button>}
            </ButtonsContainer>
            {isErase && (<Button
            type='submit'
            size={'md'}
            color='#7272ba'

            variant={'success'}
        onClick={() => {
          canvasRef.current.undo();
        }}
        >
        UNDO
        </Button>)}
        
        
        {isErase && (<Button           
            type='submit'
            size={'md'}
            color='#7272ba'

            variant={'success'}
        onClick={() => {
          canvasRef.current.clear();
        }}
        >
        CLEAR
      </Button>)}

            <SaveButtonBox>
                {<Button
                type='submit'
                size={'md'}

                onClick={onSave}>저장</Button>}
            </SaveButtonBox>


            <ImgContainer>
                <PrevUploadImg>
                        <Div>
                        <img src={changeImg} alt="" />
                        </Div>

                    {isCrop && <Div>
                        <Cropper src={changeImg} crop={onCrop} ref={cropperRef} />
                        </Div>}
                        
                </PrevUploadImg>

            </ImgContainer>


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


        </>
    );
};

export default ClothesSelectEdit;
