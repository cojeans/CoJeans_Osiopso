import { Outlet } from "react-router-dom"
import { Link } from 'react-router-dom'

import './navigation.styles'

const Navigation = () => {
	return (
		<div>
			<h1>Navigation</h1>
			<Link  to='/'>Home</Link> <br />
			<Link  to='/login'>Login</Link> <br />
			<Link  to='/join'>Join</Link><br />
			<Link  to='/mypage'>My page</Link>
			<Outlet/>
		</div>
	)
}

export default Navigation