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
import { async, base64, base64Decode } from '@firebase/util';
import { atob } from 'buffer';


// import { convert, convertAsync } from "base64-to-tensor";
// import { setBackend } from "@tensorflow/tfjs-core";
// import "@tensorflow/tfjs-backend-wasm";
// tf = require("@tensorflow/tfjs-node")
const newimg = 'https://m.kindame.co.kr/web/product/medium/202212/eb6d80555e643b92df506dd64256a9bd.jpg'
// await setBackend("wasm");
const category = ['dress', 'jeans', 'shirt', 'shoes'] 
const color = ['black', 'blue', 'red']
const Test = ({isAutoTag}, {handleAutoTag}) => {
    
    const saveData = useSelector(selectClothes);

    const URItoTensor = () => {
        return new Promise((resolve, reject) => {
            const im = new Image()
                im.crossOrigin = 'anonymous'
                im.src = newimg
                im.onload = () => {
                  resolve(im)
                }
                // console.log(im)
           })
        }

        // use the load function inside an async function   
    //     var a = Buffer(saveData)
    //     console.log(a)
        // const imgB64 = await FileSystem.readAsStringAsync(URI, {
        //     encoding: FileSystem.EncodingType.Base64,
        // });
        // const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
        // const unit8 = new Uint8Array(imgBuffer)
        // const tensor = decodeJpeg(unit8);
        // return tensor;
    // }

    const getImage = () => {

        // tf.browser.fromPixels(newimg).print();
    //     // const tensor = convert(mybase64); // The base64 must be a valid jpeg image.
    //     // or use native sharp for increased performance 2x [Expiremental]
        // const tensor = convert(saveData);       
        // console.log(tensor)
    }

    //   const newimg = 'https://m.kindame.co.kr/web/product/medium/202212/eb6d80555e643b92df506dd64256a9bd.jpg'

	const FashionAi = async() => {

		// console.log(exampleImage)
		// const model = await loadGraphModel(AiModel)
		const model = await loadGraphModel('model/model.json')
		const image = new Image(96, 96)
		// const newimg = buffer.from(saveData, 'base64')
		// const t = tf.node.decdeImage(newimg)
		// console.log(t)
		// const b = atob(saveData)
		// console.log(b)
        image.crossOrigin = 'anonymous'
		image.src = saveData;
		tf.browser.fromPixels(image).print();
		let tfTensor = tf.browser.fromPixels(image)
        // let tfTensor = tf.browser.fromBase64(image)
		tfTensor = tfTensor.div(255.0);
		tfTensor = tfTensor.expandDims(0);
		tfTensor = tfTensor.cast("float32");
		
		const pred = model.predict(tfTensor)[0];
		const temp = Array.from(pred.argMax(1).dataSync())
		
		const pred2 = model.predict(tfTensor)[1];
		const temp2 = Array.from(pred2.argMax(1).dataSync())
		console.log(category[temp])
		console.log(color[temp2])
        // const new_category = category[temp]
        // const new_color = color[temp2]



	}
    FashionAi()
    return (
        <div>
          {isAutoTag && 
          (<button onClick={FashionAi}> button</button>)}
  <button onClick={FashionAi}> button</button>
  
  {/* <button onClick={URItoTensor}> tensor</button> */}
  {/* <button onClick={getImage}> getImage</button> */}
  <div>
    {/* <img id ="newimg" src={saveData} alt="" /> */}
  </div>
  <div></div>
  <div></div>
</div>
    )
}
export default Test