import html2canvas from 'html2canvas'
import styled from 'styled-components';

const Div = styled.div`
	margin:auto;
	padding:30px;
	font-size:900;
	background-color: #4B89DC;
	color:white;
`


const OnHtmlToPng  = () => {
	const onCapture = () =>{
		console.log('onCapture')
		html2canvas(document.getElementById('div')).then(canvas=>{
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

	return (
		<>
			<Div id="div">
				Hello #sdfas0df0
				<div>hello html2canvas</div>
			</Div>
			<button onClick={onCapture}>click</button>
		</>
	)
}

export default OnHtmlToPng
