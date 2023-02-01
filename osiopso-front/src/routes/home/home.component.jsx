import './home.styles'
import { TextToCenter, TextToLeft, Category  } from './home.styles'

const Home = () =>{
	const mainList = [
		'https://i0.wp.com/i.pinimg.com/564x/bc/b3/1c/bcb31c88c19788a6aa407758caf7bd00.jpg?resize=500%2C625&ssl=1',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwg8K7tx_mGdIZoaNVV3_cqYX-ONqq33Mp6pn4MD_YLgAuDxSfm5jIUjPm1boPfXc2f1c&usqp=CAU',
		'https://i.pinimg.com/originals/74/4a/dc/744adc2d4e8aafbd57d050ce07809c40.jpg',
		'https://i.pinimg.com/originals/79/10/ff/7910ff2f204716a5f6f70de0e1c607be.jpg',

	]

	return (
		<div>
			<TextToCenter><h2>Home</h2></TextToCenter>
			<TextToCenter>#태그가 들어올 자리</TextToCenter>
			{mainList.map((el)=>{
				return(
					<img src={el}/>
				)
			})}
			

			<TextToLeft><h4>와글와글 토론장</h4></TextToLeft>


			<hr/>
			<Category><h4>최신순</h4> <h4>인기순</h4> <h4>논란순</h4></Category>
			


		</div>
	)
}

export default Home