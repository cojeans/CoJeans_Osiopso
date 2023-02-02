import { useEffect } from "react"

import {
	CameraContainer,
	Video,
} from "./clothes-add-camera.styles";




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
	
	//   const capOff = () => {
  //   let vid = document?.getElementById("vid");
  //   if (vid) {
  //     vid.pause();
  //     vid.src = "";
  //   }
  //   localstream?.getTracks()?.forEach((x) => x.stop());
  //   console.log("all capture devices off");
  // };

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

	return (
		<CameraContainer>
			<Video id="vid" autoPlay></Video>
			<button>촬영</button>
			{/* <br /> */}
			{/* <button onClick={capOff}>Turn Capture Off</button> */}
			{/* <button onClick={camON}>Turn Capture ON</button> */}
		</CameraContainer>
	)
}

export default CameraPage