import Advice from '../../components/advice/advice.component';
import AdviceCreate from '../../components/advice-create/advice-create.component'
import AdviceCommentList from '../../components/advice-comment-list/advice-comment-list.component';
import AdviceDetail from '../../components/advice-detail/advice-detail.component'
import AdviectComment from '../../components/advice-comment/advice-comment.component';
import { Route, Routes } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../store/user/user.selector'
import { useEffect } from 'react';

const AdvicePage = () => {
  const Token = useSelector(selectUser)
  const navigate = useNavigate()

  
	useEffect(() => {
		if (!Token.token) {
			alert('로그인이 안되어 있네요 😢 로그인 후 이용가능한 서비스입니다.')
			navigate('/login')
		} 
	},[])

  return (
    <Routes>
      <Route index element={<Advice/>}/>
      <Route path="/create" element={<AdviceCreate/>}/>
      <Route path="/detail/*" element={<AdviceDetail/>}/>
      <Route path="/commentlist" element={<AdviceCommentList />} />
      <Route path="/ootdCommentCreate" element={<AdviectComment />} />
      

      
    </Routes>
  )
}

export default AdvicePage