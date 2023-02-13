import { AddPictureBody, PrevUploadImg, ExampleContainer, EditBox, EditContainer, ImageInput, ImgContainer, CategoryContainer, StyleTagButton, LinkContainer } from "./clothes-select-box.styles";
import { useNavigate } from "react-router-dom";
import { resetOotdCategory } from "../../store/ootd/ootd.reducer";

import { selectUser } from "../../store/user/user.selector";
import { selectorOotdCategory } from "../../store/ootd/ootd.selector";
import { useBodyScrollLock } from "../../components/profile-closet/profile-closet.component";

import axios from "axios";
import Button from "../button/button.component";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "../../store/clothes/clothes.reducer";
import { selectClothes, localPhoto } from "../../store/clothes/clothes.selector";
import Modal from "../modal/modal.component";

import { ref as fref, getStorage, uploadString } from "firebase/storage";

const defaultOotdForm = {
    content: "",
    picture: "",
    tags: [],
};

const ClosetSelectBox = () => {
    const navigate = useNavigate();
    const Token = useSelector(selectUser);
    const saveData = useSelector(selectClothes);
    console.log(saveData);

    const dispatch = useDispatch();
    // const saveData = useSelector(selectClothes);
    const onNavigateHandler = () => {
        navigate("update/");
    };
    const [ootdFormData, setOotdFormData] = useState(defaultOotdForm);

    const [modalOpen, setModalOpen] = useState(false);
    const { lockScroll, openScroll } = useBodyScrollLock();

    const showModal = () => {
        window.scrollTo(0, 0);
        setModalOpen(true);
        lockScroll();
    };
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
                category: 1,
                imageUrl: saveData,
                closets: [{ id: 7 }],
                colors: [{ id: 1 }],
                seasons: [{ id: 1 }],
                tags: [{ id: 1 }],
            },
            headers: {
                Authorization: `Bearer ${Token.token}`,
            },
        })
            .then((res) => {
                console.log("clothes-select-box에서 post axios 요청");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        dispatch(upload("")); // redux 옷장 정보 초기화

        // AlertHandler() // alert창 띄우기

        // getClosetList() // 리스트 갱신
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
                <PrevUploadImg>{saveData && <img src={saveData} alt="https://pixlr.com/images/index/remove-bg.webp" />}</PrevUploadImg>
            </ImgContainer>
            <StyleTagButton onClick={showModal}>Add Tag</StyleTagButton>
            {modalOpen && <Modal page={4} setModalOpen={setModalOpen} openScroll={openScroll} ootdFormData={ootdFormData} setOotdFormData={setOotdFormData} />}
            <LinkContainer to="/mypage">
                <Button onClick={handleSubmit}>저장</Button>
            </LinkContainer>
        </>
    );
};

export default ClosetSelectBox;
