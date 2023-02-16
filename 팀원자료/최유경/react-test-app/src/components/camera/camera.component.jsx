import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import html2canvas from 'html2canvas'


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center"
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px"
  },
  img: {
    height: "inherit",
    maxWidth: "inherit"
  },
  input: {
    display: "none"
  }
}));


const onCapture = () =>{
	console.log('onCapture')
	html2canvas(document.getElementById('vid')).then(canvas=>{
		onSaveAs(canvas.toDataURL('image/png'), 'image-download/png')
	})
}

const onSaveAs = (uri, filename)=> {
	console.log('onSave')
	let link = document.createElement('a')
	document.body.appendChild(link)
	link.href = uri
	link.download = filename
	link.click()
	document.body.removeChild(link)
}


function App() {
  const classes = useStyles();

  let localstream;

  useEffect(() => {
    let vid = document.getElementById("vid");
    if (navigator.mediaDevices.getUserMedia !== null) {
      var options = {
        video: true,
        audio: true
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
        audio: true
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
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <video id="vid" height="120" width="160" autoPlay></video>
          <br />
          <button onClick={capOff}>Turn Capture Off</button>
          <button onClick={camON}>Turn Capture ON</button>
					<button onClick={onCapture}>사진찍기</button>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
