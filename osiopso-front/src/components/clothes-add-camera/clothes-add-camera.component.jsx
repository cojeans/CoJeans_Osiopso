import { useEffect, useState } from "react"

import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../store/clothes/clothes.reducer';
import { useNavigate } from 'react-router';
import { selectClothes } from '../../store/clothes/clothes.selector';

import {
	CameraContainer,
	Video,
} from "./clothes-add-camera.styles";

import html2canvas from 'html2canvas'
import axios from "axios";

// const onSaveAs = (uri, filename) => {
// 	console.log('onSave')
// 	let link = document.createElement('a')
// 	document.body.appendChild(link)
// 	link.href = uri
// 	link.download = filename
// 	link.click()
// 	document.body.removeChild(link)
// }

const CameraPage = () => {
  const [imgData, setImgData] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// const [newImg, setNewImg] = useState("");
	// const saveData = useSelector(selectClothes)

	let localstream;
	useEffect(() => {
		camON()
	},[])
	// useEffect(()=> {
  //   dispatch(upload(imgData))
  //   navigate(-1)
  //   console.log('------------------------')
  //   console.log(imgData.length)
  // }, [imgData.length !== 0])

  // useEffect(() => {
  //   console.log(saveData)
  // }, [saveData])
	
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCapture = () => {
    console.log('onCapture')
    html2canvas(document.getElementById('vid')).then(canvas => {
      const captureImg = canvas.toDataURL('image/png')




      setIsLoading(true);
      const callAxios = () => {

        const res = axios({
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
          "X-Api-Key":  'pq1tqANSxrre5Ew6kLmHDy9z',
        },
        responseType: "blob",
        encoding: null,
      })
      .then((response) => {
        setImgData(URL.createObjectURL(response.data));
        dispatch(upload(imgData))
        console.log('imgData', imgData)
        setTimeout(5000)
        navigate(-1)
        
      })
      .catch((e) => console.log(e, "something missing"));
      // setImgData(URL.createObjectURL(res))
      console.log(imgData)
      // navigate(-1)
    }
    
    // console.log('captureImg', captureImg)

      // console.log('imgData', imgData)
      
      // console.log('imgData', imgData)

      const blobBin = atob(captureImg.split(',')[1])
      let array = []
      for (let i = 0; i < blobBin.length; i++){
        array.push(blobBin.charCodeAt(i))
      }
      
      const file = new Blob([new Uint8Array(array)], {type:'img/png'})
      
      // console.log(file)
      let formData = new FormData()
      formData.append("file", file);
      
      
      // console.log('target', captureImg)  
      // console.log(formData)
      //////////////////////////////////////////////
      // dispatch(upload(imgData))
      //////////////////////////////////////////////
      callAxios()
      // (async () => {
      //   let aa = await callAxios();
      //   let bb = await navigate(-1);
      // })
    })
    capOff()

    // console.log(imgData)

    // const saveData = useSelector(selectClothes)
    // console.log(saveData)
    // if (isLoading === true) {
      //   console.log('--------------------------------------------')
      //   dispatch(upload(imgData))
    // }
    // navigate(-1)
    // setTimeout(function() {
      //   navigate(-1)
      // }, 3000)
    }
    
    return (
      <CameraContainer>
			<Video id="vid" autoPlay></Video>
      {/* <img src="imgData" alt="bgremoved" /> */}
			<button onClick={onCapture}>촬영</button>
      <img alt="bgremoved" src={imgData} />

			{/* <br /> */}
			{/* <button onClick={capOff}>Turn Capture Off</button> */}
			{/* <button onClick={camON}>Turn Capture ON</button> */}
		</CameraContainer>
	)
}

export default CameraPage