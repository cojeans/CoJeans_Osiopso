import { useEffect, useState } from "react"

import { useDispatch, } from 'react-redux';
import { upload } from '../../store/clothes/clothes.reducer';
import { useNavigate } from 'react-router';

import {
	CameraContainer,
	Video,
} from "./clothes-add-camera.styles";

import html2canvas from 'html2canvas'


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
	let localstream;
	useEffect(() => {
		camON()
	},[])
	
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
      
      const blobBin = atob(captureImg.split(',')[1])
      let array = []
      for (let i = 0; i < blobBin.length; i++){
        array.push(blobBin.charCodeAt(i))
      }

      const file = new Blob([new Uint8Array(array)], {type:'img/png'})
      
      console.log(file)
      let formData = new FormData()
      formData.append("file", file);
      
      console.log(captureImg)  
      console.log(formData)  
      dispatch(upload(captureImg))
    })
    capOff()
    navigate(-1)
  }

	return (
		<CameraContainer>
			<Video id="vid" autoPlay></Video>
			<button onClick={onCapture}>촬영</button>
			{/* <br /> */}
			{/* <button onClick={capOff}>Turn Capture Off</button> */}
			{/* <button onClick={camON}>Turn Capture ON</button> */}
		</CameraContainer>
	)
}

export default CameraPage