import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { upload, checkLocal } from "../../store/clothes/clothes.reducer";
import { useNavigate } from "react-router";
import Button from "../button/button.component";

import { CameraContainer, Video } from "./clothes-add-camera.styles";

import html2canvas from "html2canvas";
import axios from "axios";

const CameraPage = () => {
  const [imgData, setImgData] = useState("");

  let localstream;
  useEffect(() => {
    camON();
  }, []);

  useEffect(() => {
    let vid = document.getElementById("vid");
    if (navigator.mediaDevices.getUserMedia !== null) {
      var options = {
        video: true,
        // audio: true
      };
      navigator.mediaDevices.getUserMedia(
        options,
        function (stream) {
          vid.srcObject = stream;
          localstream = stream;
          vid.play();
          console.log(stream, "streaming");
        },
        function (e) {
          console.log("background error : " + e.name);
        }
      );
    }
  });

  const capOff = () => {
    let vid = document?.getElementById("vid");
    if (vid) {
      vid.pause();
      vid.src = "";
    }
    localstream?.getTracks()?.forEach((x) => x.stop());
    console.log("all capture devices off");
  };

  const camON = () => {
    let vid = document.getElementById("vid");
    if (navigator.mediaDevices.getUserMedia !== null) {
      var options = {
        video: true,
        // audio: true
      };
      navigator.getUserMedia(
        options,
        function (stream) {
          vid.srcObject = stream;
          localstream = stream;
          vid.play();
          console.log(stream, "streaming");
        },
        function (e) {
          console.log("background error : " + e.name);
        }
      );
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCapture = () => {
    console.log("onCapture");
    html2canvas(document.getElementById("vid")).then((canvas) => {
      const captureImg = canvas.toDataURL("image/png");

      const callAxios = () => {
        axios({
          // url: `${process.env.REACT_APP_BASE_URL}/v1.0/removebg`,
          url: "https://api.remove.bg/v1.0/removebg",
          method: "post",
          data: {
            // image_url: imgUrl,
            image_file_b64: captureImg,
            size: "auto",
            format: "auto",
            type: "auto",
          },
          headers: {
            // "X-Api-Key": process.env.REACT_APP_XAPIKEY,
            // "X-Api-Key":  'PnDSvC4k3ngFj8ToFfvgsEkw',
            // "X-Api-Key":  'pq1tqANSxrre5Ew6kLmHDy9z',
            // "X-Api-Key":  'PzbMyVS4F5y7n1kg9TP2eMau',
            // "X-Api-Key":  'YkXbSwfXA7wfypEVtJ1gu7fZ',
            // "X-Api-Key":  'N4HypXxuuvgLNFWQcgtbBK8s',
            // "X-Api-Key":  'RPeTWv3UMQeYg9ZSWfqdJPwC',
            // "X-Api-Key": "xCJE6CPZJE3bM8DeC8CpUcrb",
            // "X-Api-Key": "bQ9R6a8bhNRt4jSm5QG4HQmX",
          },
          responseType: "blob",
          encoding: null,
        })
          .then((response) => {
            setImgData(URL.createObjectURL(response.data));
          })
          .catch((e) => {
            setImgData(captureImg)
            console.log(e, "something missing")});
          
      };

      const blobBin = atob(captureImg.split(",")[1]);
      let array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }

      const file = new Blob([new Uint8Array(array)], { type: "img/png" });

      // console.log(file)
      let formData = new FormData();
      formData.append("file", file);

      callAxios();
      dispatch(upload(imgData));
      dispatch(checkLocal(false));
    });
    // capOff()
  };
  const onNavigateHandler = (e) => {
    // console.log(, 'final camera')
    dispatch(upload(imgData));
    navigate('/mypage/add-clothes', { state: imgData});
  };

  return (
    <CameraContainer>
      {/* {!imgData && <Video id="vid" autoPlay></Video>} */}
      {<Video id="vid" autoPlay></Video>}
      {/* <img src="imgData" alt="bgremoved" /> */}
      <img src={imgData} />
      {!imgData ? (
        <Button onClick={onCapture}>촬영</Button>
      ) : (
        <Button onClick={onCapture}>재촬영</Button>
      )}
      {imgData && (
        <Button id="my-btn" onClick={onNavigateHandler}>
          이동
        </Button>
      )}
      {/* <br /> */}
      {/* <button onClick={capOff}>Turn Capture Off</button> */}
      {/* <button onClick={camON}>Turn Capture ON</button> */}
    </CameraContainer>
  );
};

export default CameraPage;
