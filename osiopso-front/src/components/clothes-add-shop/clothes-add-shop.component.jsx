import Iframe from "../iframe/Iframe.component";

const demos = {
  soundcloud:
    '<iframe width="500" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://www.musinsa.com/app/main/"></iframe>',

};


const ClothesAddShop = () => {


	return (
		<div>
			<h1>I frame Demo</h1>
			 <Iframe iframe={demos["soundcloud"]} allow="autoplay" />,
		</div>
	);
}

export default ClothesAddShop