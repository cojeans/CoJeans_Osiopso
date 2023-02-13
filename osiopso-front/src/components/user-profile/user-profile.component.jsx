import MypageBody from "../mypage/mypage.component"
import { useLocation } from "react-router-dom"

const UserProfile = () => {
	const location = useLocation();
	
	const id = location.state.id
	return (
		<div>
			<MypageBody
				id={ id } />
		</div>
	)
}

export default UserProfile