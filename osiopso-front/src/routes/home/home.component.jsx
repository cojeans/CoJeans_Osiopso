import './home.styles'
import { TextToCenter, TextToLeft, Category  } from './home.styles'

const Home = () =>{
	return (
		<div>
			<TextToCenter><h2>Home</h2></TextToCenter>
			<TextToCenter>#태그가 들어올 자리</TextToCenter>
			

			<TextToLeft><h4>와글와글 토론장</h4></TextToLeft>


			<hr/>
			<Category><h4>최신순</h4> <h4>인기순</h4> <h4>논란순</h4></Category>
			


		</div>
	)
}

export default Home