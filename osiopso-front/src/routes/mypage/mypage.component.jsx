import {Routes, Route} from 'react-router-dom'

import MypageBody from '../../components/mypage/mypage.component'
import ClothesAdd from '../../components/clothes-add/clothes-add.component'

const Mypage = () => {
	return (
		<Routes>
			<Route index element={<MypageBody/>} />
			<Route path=":add-clothes" element={<ClothesAdd/>} />
		</Routes>
		
	)
}

export default Mypage