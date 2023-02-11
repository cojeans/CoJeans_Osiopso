import Ootd from "../../components/ootd/ootd.component";
import OotdDetail from "../../components/ootd-detail/ootd-detail.component";
import OotdCreate from "../../components/ootd-create/ootd-create.component"
import { Route, Routes } from "react-router-dom";

const OOTDPage = () => {
    return (
        <Routes>
            <Route index element={<Ootd/>} />
            <Route path="/detail/*" element={<OotdDetail/>} />
            <Route path="/create" element={<OotdCreate/>}/>

        </Routes>
  
    )
}

export default OOTDPage