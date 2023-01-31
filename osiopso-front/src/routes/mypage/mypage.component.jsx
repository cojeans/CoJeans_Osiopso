import {Routes, Route} from 'react-router-dom'

import MypageBody from '../../components/mypage/mypage.component'
import ClosetCreate from '../../components/closet-create/closet-create.component'

const Mypage = () => {
	return (
		<Routes>
			<Route index element={<MypageBody/>} />
			<Route path=":closet-create" element={<ClosetCreate/>} />
		</Routes>
		
	)
}

export default Mypage