import Ootd from "../../components/ootd/ootd.component";
import OotdDetail from "../../components/ootd-detail/ootd-detail.component";
import OotdCreate from "../../components/ootd-create/ootd-create.component"
import OotdComment from "../../components/ootd-comment/ootd-comment.component"
import { Route, Routes } from "react-router-dom";

const OOTDPage = () => {
    return (
        <Routes>
            <Route index element={<Ootd/>} />
            <Route path="/detail" element={<OotdDetail/>} />
            <Route path="/create" element={<OotdCreate/>}/>
            <Route path="/comment" element={<OotdComment/>}/>

        </Routes>
  
    )
}

export default OOTDPage