import React from 'react';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from "@tensorflow/tfjs-converter"
import { buffer } from '@tensorflow/tfjs';
import exampleImage from '../../../src/00000001.jpg'
import { useDispatch, useSelector } from "react-redux";
import {
    selectClothes,
    localPhoto,
  } from "../../store/clothes/clothes.selector";
import { base64StringToArrayBuffer } from '@tensorflow/tfjs-core/dist/io/io_utils';
import { base64 } from '@firebase/util';


// import { convert, convertAsync } from "base64-to-tensor";
// import { setBackend } from "@tensorflow/tfjs-core";
// import "@tensorflow/tfjs-backend-wasm";

const newimg = 'https://m.kindame.co.kr/web/product/medium/202212/eb6d80555e643b92df506dd64256a9bd.jpg'
// await setBackend("wasm");

const Test=  () => {
    const saveData = useSelector(selectClothes);
    
    const getImage = () => {
        tf.browser.fromPixels(newimg).print();
    //     // const tensor = convert(mybase64); // The base64 must be a valid jpeg image.
    //     // or use native sharp for increased performance 2x [Expiremental]
        // const tensor = convert(saveData);       
        // console.log(tensor)
    }

    //   const newimg = 'https://m.kindame.co.kr/web/product/medium/202212/eb6d80555e643b92df506dd64256a9bd.jpg'

	const FashionAi = async() => {
		console.log(exampleImage)
		// const model = await loadGraphModel(AiModel)
		const model = await loadGraphModel('./model/model.json')
		const image = new Image(96, 96)
		// const newimg = buffer.from(saveData, 'base64')
		// const t = tf.node.decdeImage(newimg)
		// console.log(t)
		// const b = atob(saveData)
		// console.log(b)
		// image.src = saveData;
        // const newimg = 'https://w.namu.la/s/39841b85ec9b4f24ba21804371c3a9bc0ddfd43136c381848d7996b6d502b28cc4c20bc3908cee1a0356daf86ff6fe301535f1d08a6ee0dfb9f9b037261149a535c67f4ede00c49fcf2b12e562fa7568685ffd603445da2bebd9a5b0071e4de6'
		// const newimg = document.getElementById('newimg')
        // console.log(newimg)
        
        image.src = newimg;
        console.log(image.src)
		tf.browser.fromPixels(image).print();
		let tfTensor = tf.browser.fromPixels(image)
		tfTensor = tfTensor.div(255.0);
		tfTensor = tfTensor.expandDims(0);
		tfTensor = tfTensor.cast("float32");
		
		const pred = model.predict(tfTensor)[0];
		const temp = Array.from(pred.argMax(1).dataSync())
		
		const pred2 = model.predict(tfTensor)[1];
		const temp2 = Array.from(pred2.argMax(1).dataSync())
		console.log(temp, temp2)




	} 
    return (
        <div>
  <button onClick={FashionAi}> button</button>
  {/* <button onClick={getImage}> getImage</button> */}
  <div>
    <img id ="newimg" src={newimg} alt="" />
  </div>
</div>
    )
}
export default Test