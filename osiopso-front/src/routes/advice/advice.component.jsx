import Advice from '../../components/advice/advice.component';
import AdviceCreate from '../../components/advice-create/advice-create.component'
import AdviceDetail from '../../components/advice-detail/advice-detail.component'
import { Route, Routes } from "react-router-dom"


const AdvicePage = ()=> {
  return (
    <Routes>
      <Route index element={<Advice/>}/>
      <Route path="/create" element={<AdviceCreate/>}/>
      <Route path="/detail" element={<AdviceDetail/>}/>

      
    </Routes>
  )
}

export default AdvicePage